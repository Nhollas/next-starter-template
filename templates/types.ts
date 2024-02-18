export type TemplateType = "default" | "app" | "default-tw" | "app-tw";
export type TemplateMode = "js" | "ts";

export interface GetTemplateFileArgs {
  template: TemplateType;
  mode: TemplateMode;
  file: string;
}

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  isOnline: boolean;
  srcDir: boolean;
  importAlias: string;
}
