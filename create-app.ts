/* eslint-disable import/no-extraneous-dependencies */
import { green, cyan } from "picocolors";
import fs from "fs";
import path from "path";
import type { RepoInfo } from "./helpers/examples";
import { tryGitInit } from "./helpers/git";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { getOnline } from "./helpers/is-online";
import { isWriteable } from "./helpers/is-writeable";

import type { TemplateMode, TemplateType } from "./templates";
import { installTemplate } from "./templates";

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  srcDir,
  importAlias,
}: {
  appPath: string;
  srcDir: boolean;
  importAlias: string;
}): Promise<void> {
  let repoInfo: RepoInfo | undefined;
  const mode: TemplateMode = "ts";
  const template: TemplateType = "default";

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  fs.mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const isOnline = await getOnline();
  const originalDirectory = process.cwd();

  console.log(`Creating a new Next.js app in ${green(root)}.`);
  console.log();

  process.chdir(root);

  const packageJsonPath = path.join(root, "package.json");
  let hasPackageJson = false;

  /**
   * If an example repository is not provided for cloning, proceed
   * by installing from a template.
   */
  await installTemplate({
    appName,
    root,
    mode,
    isOnline,
    srcDir,
    importAlias,
  });

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${green("Success!")} Created ${appName} at ${appPath}`);

  if (hasPackageJson) {
    console.log("Inside that directory, you can run several commands:");
    console.log();
    console.log(cyan(`  npm run dev`));
    console.log("    Starts the development server.");
    console.log();
    console.log(cyan(`  npm run build`));
    console.log("    Builds the app for production.");
    console.log();
    console.log(cyan(`  npm start`));
    console.log("    Runs the built app in production mode.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log();
    console.log(cyan("  cd"), cdpath);
  }
  console.log();
}
