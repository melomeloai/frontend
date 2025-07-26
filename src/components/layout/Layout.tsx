import React from "react";

import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {children}
      </main>
    </div>
  );
};
