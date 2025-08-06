import { useState, useEffect } from "react";

export const useDesktopSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Desktop default open
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Always keep desktop sidebar open
  useEffect(() => {
    if (!isMobile && !isOpen) {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const collapse = () => setIsCollapsed(true);
  const expand = () => setIsCollapsed(false);

  return {
    isOpen,
    isCollapsed,
    isMobile,
    toggle,
    close,
    open,
    toggleCollapse,
    collapse,
    expand,
  };
};