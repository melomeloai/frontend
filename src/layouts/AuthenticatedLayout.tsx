import React from "react";

import { Sidebar } from "./components/Sidebar";
import { WorkspaceHeader } from "./components/WorkspaceHeader";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { isOpen, isMobile, toggle, close } = useSidebar();

  // On desktop, sidebar should be open by default
  React.useEffect(() => {
    if (!isMobile && !isOpen) {
      toggle();
    }
  }, [isMobile, isOpen, toggle]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isOpen} isMobile={isMobile} onClose={close} />
      
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          // On desktop, add left margin when sidebar is open
          !isMobile && isOpen ? "ml-80" : "",
          // On mobile, sidebar overlays so no margin needed
          isMobile ? "" : ""
        )}
      >
        <WorkspaceHeader onMenuClick={toggle} isMobile={isMobile} />
        <main className="p-6 md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
};