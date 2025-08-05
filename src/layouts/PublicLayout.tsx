import React from "react";

import { PublicHeader } from "./components/PublicHeader";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12">
        {children}
      </main>
    </div>
  );
};