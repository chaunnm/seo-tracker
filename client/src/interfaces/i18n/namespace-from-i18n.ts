// import "i18next";

// type Custom = import("i18next").CustomTypeOptions;
// export type Namespace = keyof Custom["resources"];
export const namespaces = ["common", "dashboard", "settings"] as const;
export type Namespace = (typeof namespaces)[number];

export const isNamespace = (s: string): s is Namespace =>
  (namespaces as readonly string[]).includes(s);
