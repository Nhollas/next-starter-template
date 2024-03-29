import { install } from "../helpers/install";
import { copy } from "../helpers/copy";

import { async as glob } from "fast-glob";
import os from "os";
import fs from "fs/promises";
import path from "path";
import { cyan, bold } from "picocolors";
import { Sema } from "async-sema";
import pkg from "../package.json";

import { GetTemplateFileArgs, InstallTemplateArgs } from "./types";

/**
 * Get the file path for a given file in a template, e.g. "next.config.js".
 */
export const getTemplateFile = ({
  template,
  mode,
  file,
}: GetTemplateFileArgs): string => {
  return path.join(__dirname, template, mode, file);
};

export const SRC_DIR_NAMES = [
  "app",
  "pages",
  "styles",
  "components",
  "lib",
  "features",
  "playwright",
  "providers",
  "public",
  "test",
  "types",
];

/**
 * Install a Next.js internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  srcDir,
  importAlias,
}: InstallTemplateArgs) => {
  console.log(bold(`Using ${packageManager}.`));

  const template = "default";

  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");

  // TODO: Could this be, original has mode a third argument?
  const templatePath = path.join(__dirname, template);

  console.log("Copying files from:", templatePath);
  const copySource = ["**"];

  await copy(copySource, root, {
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "gitattributes":
        case "eslintignore":
        case "eslintrc.js":
        case "prettierrc":
        case "prettierignore":
        case "env.example":
        case "vscode":
        case "eslintrc.json": {
          return `.${name}`;
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  const tsconfigFile = path.join(root, "tsconfig.json");
  await fs.writeFile(
    tsconfigFile,
    (await fs.readFile(tsconfigFile, "utf8"))
      .replace(
        `"@/*": ["./*"]`,
        srcDir ? `"@/*": ["./src/*"]` : `"@/*": ["./*"]`,
      )
      .replace(`"@/*":`, `"${importAlias}":`),
  );

  // update import alias in any files if not using the default
  if (importAlias !== "@/*") {
    const files = await glob("**/*", {
      cwd: root,
      dot: true,
      stats: false,
      // We don't want to modify compiler options in [ts/js]config.json
      // and none of the files in the .git folder
      ignore: ["tsconfig.json", "jsconfig.json", ".git/**/*"],
    });

    const writeSema = new Sema(8, { capacity: files.length });
    await Promise.all(
      files.map(async (file) => {
        await writeSema.acquire();
        const filePath = path.join(root, file);
        if ((await fs.stat(filePath)).isFile()) {
          await fs.writeFile(
            filePath,
            (await fs.readFile(filePath, "utf8")).replace(
              new RegExp(`@/`, "g"),
              `${importAlias.replace(/\*/g, "")}`,
            ),
          );
        }
        await writeSema.release();
      }),
    );
  }

  if (srcDir) {
    await fs.mkdir(path.join(root, "src"), { recursive: true });
    await Promise.all(
      SRC_DIR_NAMES.map(async (file) => {
        await fs
          .rename(path.join(root, file), path.join(root, "src", file))
          .catch((err) => {
            if (err.code !== "ENOENT") {
              throw err;
            }
          });
      }),
    );

    // Change the `Get started by editing pages/index` / `app/page` to include `src`
    const indexPageFile = path.join("src", "app", `page.tsx`);

    await fs.writeFile(
      indexPageFile,
      (await fs.readFile(indexPageFile, "utf8")).replace(
        "app/page",
        "src/app/page",
      ),
    );

    const tailwindConfigFile = path.join(root, "tailwind.config.ts");
    await fs.writeFile(
      tailwindConfigFile,
      (await fs.readFile(tailwindConfigFile, "utf8")).replace(
        /\.\/(\w+)\/\*\*\/\*\.\{js,ts,jsx,tsx,mdx\}/g,
        "./src/$1/**/*.{js,ts,jsx,tsx,mdx}",
      ),
    );

    const jestConfigPath = path.join(root, "jest.config.mjs");
    let jestConfigContent = await fs.readFile(jestConfigPath, "utf-8");

    // Replace the moduleNameMapper property
    jestConfigContent = jestConfigContent.replace(
      `"^@/(.*)$": "<rootDir>/$1"`,
      `"^@/(.*)$": "<rootDir>/src/$1"`,
    );

    jestConfigContent = jestConfigContent.replace(
      /"<rootDir>\/\*\*\/\*\.(test|spec)\.(ts|tsx)"/g,
      `"<rootDir>/src/**/*.$1.$2"`,
    );

    // Write the updated content back to the jest.config.mjs file
    await fs.writeFile(jestConfigPath, jestConfigContent);

    const playwrightConfigPath = path.join(root, "playwright.config.ts");
    let playwrightConfigContent = await fs.readFile(
      playwrightConfigPath,
      "utf-8",
    );

    // Replace the testDir property
    playwrightConfigContent = playwrightConfigContent.replace(
      `testDir: "./playwright"`,
      `testDir: "./src/playwright"`,
    );

    // Write the updated content back to the playwright config file
    await fs.writeFile(playwrightConfigPath, playwrightConfigContent);

    // Read the .eslintignore file
    const eslintignorePath = path.join(root, ".eslintignore");
    let eslintignoreContent = await fs.readFile(eslintignorePath, "utf-8");

    // Add the src/ prefix to the 'components/ui' line
    eslintignoreContent = eslintignoreContent.replace(
      /^components\/ui/gm,
      "src/components/ui",
    );

    // Write the updated content back to the .eslintignore file
    await fs.writeFile(eslintignorePath, eslintignoreContent);
  }

  const elint = srcDir
    ? "eslint --fix --ext .js,.ts,.tsx ./src --ignore-path .eslintignore"
    : "eslint --fix --ext .js,.ts,.tsx ./ --ignore-path .eslintignore";

  /** Create a package.json for the new project and write it to disk. */
  const packageJson: any = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      playwright: "playwright test",
      "test:e2e": "run-s build playwright",
      "test:jest": "jest --detectOpenHandles",
      "test:coverage": "CI=1 yarn test:jest -- --coverage",
      prettier:
        'prettier --ignore-path .gitignore --write "**/*.+(js|json|ts|tsx)"',
      format: "npm run prettier -- --write",
      "check:lint": elint,
      "check:types": "tsc --project tsconfig.json --pretty --noEmit",
      "check:format": "npm run prettier -- --list-different",
      validate: "run-s check:lint check:types check:format test:jest test:e2e",
    },
    /**
     * Default dependencies.
     */
    dependencies: {
      "@hookform/resolvers": "^3.3.2",
      "@radix-ui/react-accordion": "^1.1.2",
      "@radix-ui/react-alert-dialog": "^1.0.5",
      "@radix-ui/react-aspect-ratio": "^1.0.3",
      "@radix-ui/react-avatar": "^1.0.4",
      "@radix-ui/react-checkbox": "^1.0.4",
      "@radix-ui/react-collapsible": "^1.0.3",
      "@radix-ui/react-context-menu": "^2.1.5",
      "@radix-ui/react-dialog": "^1.0.5",
      "@radix-ui/react-dropdown-menu": "^2.0.6",
      "@radix-ui/react-hover-card": "^1.0.7",
      "@radix-ui/react-label": "^2.0.2",
      "@radix-ui/react-popover": "^1.0.7",
      "@radix-ui/react-progress": "^1.0.3",
      "@radix-ui/react-radio-group": "^1.1.3",
      "@radix-ui/react-scroll-area": "^1.0.5",
      "@radix-ui/react-select": "^2.0.0",
      "@radix-ui/react-slider": "^1.1.2",
      "@radix-ui/react-slot": "^1.0.2",
      "@radix-ui/react-switch": "^1.0.3",
      "@radix-ui/react-tabs": "^1.0.4",
      "@radix-ui/react-toast": "^1.1.5",
      "@radix-ui/react-toggle": "^1.0.3",
      "@radix-ui/react-toggle-group": "^1.0.4",
      "@radix-ui/react-tooltip": "^1.0.7",
      "@tanstack/react-query": "^5.14.1",
      axios: "^1.6.2",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      cmdk: "^0.2.0",
      "date-fns": "^2.30.0",
      dotenv: "^16.3.1",
      "framer-motion": "^10.16.16",
      "launchdarkly-node-server-sdk": "^7.0.3",
      "launchdarkly-react-client-sdk": "^3.0.10",
      "lucide-react": "^0.294.0",
      next: "^14.0.5-canary.24",
      "playwright-msw": "^3.0.1",
      react: "^18",
      "react-day-picker": "^8.9.1",
      "react-dom": "^18",
      "react-hook-form": "^7.48.2",
      "server-only": "^0.0.1",
      "tailwind-merge": "^2.0.0",
      "tailwindcss-animate": "^1.0.7",
      zod: "^3.22.4",
    },
    devDependencies: {
      "@faker-js/faker": "^8.3.1",
      "@next/eslint-plugin-next": "^14.0.4",
      "@playwright/test": "^1.40.1",
      "@tailwindcss/container-queries": "^0.1.1",
      "@testing-library/jest-dom": "^6.1.4",
      "@testing-library/react": "^14.1.2",
      "@types/jest": "^29.5.10",
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "@typescript-eslint/eslint-plugin": "^6.13.1",
      "@typescript-eslint/parser": "^6.13.1",
      autoprefixer: "^10.0.1",
      eslint: "^8",
      "eslint-config-next": "14.0.3",
      "eslint-config-prettier": "^9.0.0",
      "eslint-import-resolver-typescript": "^3.6.1",
      "eslint-plugin-cypress": "^2.15.1",
      "eslint-plugin-import": "^2.29.0",
      "eslint-plugin-jest-dom": "^5.1.0",
      "eslint-plugin-jsx-a11y": "^6.8.0",
      "eslint-plugin-playwright": "^0.19.0",
      "eslint-plugin-prettier": "^5.0.1",
      "eslint-plugin-react": "^7.33.2",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-testing-library": "^6.2.0",
      jest: "^29.7.0",
      "jest-environment-jsdom": "^29.7.0",
      "lint-staged": "^15.1.0",
      msw: "^2.0.9",
      "npm-run-all": "^4.1.5",
      postcss: "^8",
      prettier: "^3.1.0",
      "prettier-plugin-tailwindcss": "^0.5.7",
      specmatic: "^0.81.0",
      tailwindcss: "^3.4.0",
      "ts-jest": "^29.1.1",
      typescript: "^5",
      undici: "^5.28.2",
    },
  };

  const devDeps = Object.keys(packageJson.devDependencies).length;
  if (!devDeps) delete packageJson.devDependencies;

  await fs.writeFile(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  console.log("\nInstalling dependencies:");
  for (const dependency in packageJson.dependencies)
    console.log(`- ${cyan(dependency)}`);

  if (devDeps) {
    console.log("\nInstalling devDependencies:");
    for (const dependency in packageJson.devDependencies)
      console.log(`- ${cyan(dependency)}`);
  }

  console.log();

  await install(packageManager, isOnline);
};

export * from "./types";
