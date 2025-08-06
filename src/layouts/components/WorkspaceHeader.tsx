import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/UserMenu";
import { ROUTES } from "@/utils/constants";

interface WorkspaceHeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ 
  onMenuClick, 
  isMobile
}) => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile menu button and logo */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link
            to={ROUTES.HOME}
            className="text-lg md:text-xl font-bold text-foreground flex items-center"
          >
            MeloReels.AI
          </Link>
        </div>

        {/* User menu for mobile */}
        {isMobile && <UserMenu />}
      </div>
    </header>
  );
};