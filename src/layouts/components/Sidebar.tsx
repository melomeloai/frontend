import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, FileMusic, Library, CreditCard, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditDisplay } from "@/components/credits/CreditDisplay";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: "Create", href: "/workspace/create", icon: FileMusic },
  { name: "Library", href: "/workspace/library", icon: Library },
  { name: "Plan", href: "/workspace/plan", icon: CreditCard },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  const location = useLocation();
  const { user } = useUser();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Mobile close button */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Workspace</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.fullName || user?.emailAddresses[0]?.emailAddress}
            </p>
            <div className="mt-1">
              <CreditDisplay />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User menu at bottom */}
      <div className="p-4 border-t border-border">
        <UserMenu />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
        )}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full w-80 z-30 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {sidebarContent}
    </div>
  );
};