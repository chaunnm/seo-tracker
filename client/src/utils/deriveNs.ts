import { isNamespace, type Namespace } from "../interfaces";

export const deriveNsFromModuleUrl = (moduleUrl: string): Namespace => {
  // Example moduleUrl: ".../src/pages/Dashboard.tsx"
  const filename = moduleUrl.split("/").pop() || "";
  const basename = filename.replace(/\.[^/.]+$/, ""); // "Dashboard"
  const lower = basename.toLowerCase(); // "dashboard"
  return isNamespace(lower) ? lower : "common";
};

export const deriveNsFromString = (name: string): Namespace => {
  const lower = name.toLowerCase();
  return isNamespace(lower) ? lower : "common";
};
