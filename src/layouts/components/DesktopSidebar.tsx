import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreditInfo } from "@/components/credits/CreditInfo";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";
import { NAVIGATION_ITEMS } from "@/utils/navigation";

interface DesktopSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const location = useLocation();

  if (!isOpen) return null;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header with logo and collapse button */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link
              to={ROUTES.HOME}
              className="text-lg font-bold text-foreground flex items-center"
            >
              MeloReels.AI
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleCollapse}
            className={cn("ml-auto", isCollapsed && "mx-auto")}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1", isCollapsed ? "p-2" : "p-4")}>
        <div className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  isCollapsed 
                    ? "justify-center p-3" 
                    : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Credit Info - Only show when expanded */}
      {!isCollapsed && (
        <div className="border-t border-border p-4">
          <CreditInfo />
        </div>
      )}

      {/* User section at bottom */}
      <div className="border-t border-border">
        {isCollapsed ? (
          // Collapsed state: just avatar with UserMenu
          <div className="p-3 flex justify-center">
            <UserMenu />
          </div>
        ) : (
          // Expanded state: full user info with UserMenu
          <UserMenu 
            className="p-4 hover:bg-accent/50 transition-colors cursor-pointer w-full"
            showFullInfo 
          />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "hidden md:block fixed left-0 top-0 h-full z-30 transform transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      {sidebarContent}
    </div>
  );
};