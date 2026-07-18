"use client";

import React, { useState, useEffect } from "react";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ onOpenMobileMenu, onLogout }: AdminHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="border-b border-luxury-light-gray bg-luxury-white/95 dark:bg-neutral-900/95 dark:border-neutral-800 py-6 px-6 md:px-12 lg:px-16 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md animate-fade-in w-full">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger menu toggle button */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 hover:opacity-75 transition-opacity cursor-pointer focus:outline-none text-luxury-black dark:text-neutral-200"
          aria-label="Open Mobile Navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        <span className="font-serif text-2xl tracking-[0.25em] font-bold uppercase dark:text-white">
          LASH & SLAY
        </span>
        <span className="text-[8px] tracking-[0.3em] uppercase border border-luxury-black/35 dark:border-neutral-700 px-2 py-0.5 font-semibold text-neutral-400 dark:text-neutral-500">
          Admin
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Light/Dark mode toggler */}
        <button
          onClick={toggleTheme}
          className="text-[10px] uppercase tracking-[0.2em] font-light hover:opacity-75 transition-opacity py-2 cursor-pointer focus:outline-none flex items-center gap-1.5 dark:text-neutral-300"
          aria-label="Toggle Theme"
        >
          <span>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 border border-luxury-black dark:border-neutral-300 hover:bg-luxury-black hover:text-luxury-white dark:hover:bg-white dark:hover:text-neutral-900 dark:text-white transition-all duration-400 font-semibold cursor-pointer focus:outline-none"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
