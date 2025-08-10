import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      dashboard: typeof dashboard;
      settings: typeof settings;
    };
  }
}
