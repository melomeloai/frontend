import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreditInfo } from "@/components/credits/CreditInfo";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";
import { NAVIGATION_ITEMS } from "@/utils/navigation";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Mobile header with logo and close button */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Link
            to={ROUTES.HOME}
            className="text-lg font-bold text-foreground flex items-center"
          >
            MeloReels.AI
          </Link>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Credit Info at bottom */}
      <div className="p-4 border-t border-border">
        <CreditInfo />
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
};