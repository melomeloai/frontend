import { FileMusic, Library, Code2 } from "lucide-react";
import { ROUTES } from "./constants";

export interface NavigationItem {
  name: string;
  href: string;
  icon: typeof FileMusic;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Create", href: ROUTES.HOME, icon: FileMusic },
  { name: "Library", href: ROUTES.WORKSPACE_LIBRARY, icon: Library },
  { name: "API Access", href: ROUTES.WORKSPACE_API_ACCESS, icon: Code2 },
];