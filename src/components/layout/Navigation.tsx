import React from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";

const navigationItems = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Pricing", href: ROUTES.PRICING },
  { name: "Library", href: ROUTES.LIBRARY },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-foreground border-b-2 border-primary"
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
