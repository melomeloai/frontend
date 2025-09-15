import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, Youtube, Music, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Header with logo and collapse button */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link
              to={ROUTES.HOME}
              className="flex items-center"
            >
              <img 
                src="/melofm_logo_cropped.jpg" 
                alt="melofm"
                className="h-8 object-contain"
              />
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
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
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


      {/* Social Links section at bottom */}
      <div className="border-t border-sidebar-border p-4 space-y-4">
        {!isCollapsed && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 text-sidebar-foreground/60">
              {/* Discord-like icon */}
              <button className="w-6 h-6 rounded bg-sidebar-foreground/10 hover:bg-sidebar-foreground/20 flex items-center justify-center transition-colors">
                <div className="w-4 h-4 bg-sidebar-foreground/60 rounded-sm"></div>
              </button>
              {/* X/Twitter */}
              <button className="w-6 h-6 rounded hover:bg-sidebar-foreground/10 flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              {/* YouTube */}
              <button className="w-6 h-6 rounded hover:bg-sidebar-foreground/10 flex items-center justify-center transition-colors">
                <Youtube className="w-3 h-3" />
              </button>
              {/* TikTok */}
              <button className="w-6 h-6 rounded hover:bg-sidebar-foreground/10 flex items-center justify-center transition-colors">
                <Music className="w-3 h-3" />
              </button>
              {/* Instagram */}
              <button className="w-6 h-6 rounded hover:bg-sidebar-foreground/10 flex items-center justify-center transition-colors">
                <Instagram className="w-3 h-3" />
              </button>
              {/* LinkedIn */}
              <button className="w-6 h-6 rounded hover:bg-sidebar-foreground/10 flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "hidden md:block fixed left-0 top-0 h-full z-30 transform transition-all duration-300 ease-in-out",
        isCollapsed ? "w-15" : "w-60"
      )}
    >
      {sidebarContent}
    </div>
  );
};