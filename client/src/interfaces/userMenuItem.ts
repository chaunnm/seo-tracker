import type { Iconish } from "./iconish";

export type UserMenuItem =
  | {
      key: "account" | "teamClients" | "giveFeedback" | "needHelp" | "signOut";
      type: "link";
      path: string;
      icon?: Iconish;
    }
  | {
      key: "privacyBlur" | "layout";
      type: "toggle";
      icon?: Iconish;
    };
