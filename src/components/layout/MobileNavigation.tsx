import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";

const navigationItems = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Create", href: ROUTES.CREATE },
  { name: "Library", href: ROUTES.LIBRARY },
  { name: "Pricing", href: ROUTES.PRICING },
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-foreground hover:text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5 text-foreground" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px]">
          <SheetHeader></SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary py-3 px-4 rounded-lg",
                  location.pathname === item.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
