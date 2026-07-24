"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <MainContent isSidebarOpen={isSidebarOpen} isMobile={isMobile} onOpenSidebar={() => setIsSidebarOpen(true)} />
    </>
  );
}
