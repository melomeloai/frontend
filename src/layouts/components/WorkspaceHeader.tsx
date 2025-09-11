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
            className="flex items-center"
          >
            <img 
              src="/melofm_logo_cropped.jpg" 
              alt="melofm"
              className="h-8 md:h-10 object-contain"
            />
          </Link>
        </div>

        {/* User menu for mobile */}
        {isMobile && <UserMenu />}
      </div>
    </header>
  );
};