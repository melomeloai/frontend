import { FileMusic, Library } from "lucide-react";
import { ROUTES } from "./constants";

export interface NavigationItem {
  name: string;
  href: string;
  icon: typeof FileMusic;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Create", href: ROUTES.WORKSPACE_CREATE, icon: FileMusic },
  { name: "Library", href: ROUTES.WORKSPACE_LIBRARY, icon: Library },
];