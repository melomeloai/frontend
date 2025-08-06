import React from "react";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { useDesktopSidebar } from "@/hooks/useDesktopSidebar";
import { cn } from "@/lib/utils";

import { MobileSidebar } from "./components/MobileSidebar";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { WorkspaceHeader } from "./components/WorkspaceHeader";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const mobileHooks = useMobileSidebar();
  const desktopHooks = useDesktopSidebar();

  const getSidebarWidth = () => {
    if (desktopHooks.isMobile || !desktopHooks.isOpen) return 0;
    return desktopHooks.isCollapsed ? 80 : 320; // 80px for collapsed, 320px for expanded
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileHooks.isOpen}
        onClose={mobileHooks.close}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        isOpen={desktopHooks.isOpen}
        isCollapsed={desktopHooks.isCollapsed}
        onToggleCollapse={desktopHooks.toggleCollapse}
      />

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          // On desktop, add left margin based on sidebar state
          !desktopHooks.isMobile && desktopHooks.isOpen ? `ml-[${getSidebarWidth()}px]` : "",
        )}
        style={{
          marginLeft: !desktopHooks.isMobile && desktopHooks.isOpen ? `${getSidebarWidth()}px` : 0,
        }}
      >
        {/* Mobile header with user menu */}
        {desktopHooks.isMobile && (
          <WorkspaceHeader 
            onMenuClick={mobileHooks.toggle} 
            isMobile={desktopHooks.isMobile} 
          />
        )}
        <main className="p-6 md:p-12">{children}</main>
      </div>
    </div>
  );
};
