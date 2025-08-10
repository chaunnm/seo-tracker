import { useTranslation } from "react-i18next";
import type { Namespace } from "../interfaces";
import { deriveNsFromModuleUrl, deriveNsFromString } from "../utils";

// 1) Automatically from current file (no need to pass anything other than import.meta.url from vite)
export const useAutoNs = (moduleUrl: string) => {
  const ns: Namespace = deriveNsFromModuleUrl(moduleUrl);
  return useTranslation(ns);
};

// 2) Any string in the component name
export const useNs = (name: string) => {
  const ns: Namespace = deriveNsFromString(name);
  return useTranslation(ns);
};

// 3) Bind literal (safest)
export const useNsStrict = <T extends Namespace>(name: T) => {
  return useTranslation(name);
};
