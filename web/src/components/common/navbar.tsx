"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, user, openLoginModal, logout } = useAuth();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/menu/services" },
    { label: "Loyalty Rewards", href: "/loyalty-card" },
    { label: "Lounge", href: "/menu" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || pathname !== "/"
            ? "bg-luxury-white/90 backdrop-blur-md border-b border-luxury-light-gray py-4 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-bold hover:opacity-75 transition-opacity"
          >
            LASH & SLAY
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-light relative py-2 group transition-colors ${
                    isActive ? "text-luxury-black font-semibold" : "text-luxury-black/70 hover:text-luxury-black"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 h-[1px] bg-luxury-black transition-all duration-300 ${
                      isActive ? "w-full left-0" : "w-0 left-1/2 group-hover:w-full group-hover:left-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-6">

            {/* Reserve Appointment */}
            <Link
              href="/reservation"
              className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] px-6 py-3 border border-luxury-black bg-luxury-black text-luxury-white hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium"
            >
              Reserve Appointment
            </Link>

            {/* Desktop Auth State (Sign In / Profile dropdown at the very end of desktop) */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-black hover:opacity-75 transition-opacity flex items-center gap-1.5 cursor-pointer py-2 focus:outline-none"
                  >
                    <span>{user?.name.split(" ")[0]}</span>
                    <svg 
                      className={`w-2.5 h-2.5 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                      <div className="absolute right-0 mt-3 w-56 bg-luxury-white border border-luxury-light-gray shadow-xl py-4 z-20">
                        <div className="px-5 py-2.5 border-b border-luxury-light-gray">
                          <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">{user?.tier}</p>
                          <p className="text-xs text-luxury-black font-semibold uppercase tracking-wider truncate mt-0.5">{user?.name}</p>
                          <p className="text-[9px] text-neutral-500 font-mono tracking-wider mt-0.5">{user?.points} PTS</p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/loyalty-card"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-5 py-2 text-[10px] uppercase tracking-widest text-luxury-black/70 hover:text-luxury-black hover:bg-luxury-soft-white transition-colors"
                          >
                            Loyalty Portal
                          </Link>
                          {/* Theme Toggle Button inside Profile Dropdown */}
                          <button
                            onClick={toggleTheme}
                            className="w-full text-left px-5 py-2 text-[10px] uppercase tracking-widest text-luxury-black/70 hover:text-luxury-black hover:bg-luxury-soft-white transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>Theme: {theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                            <span className="text-xs">
                              {theme === "light" ? "🌙" : "☀️"}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              logout();
                            }}
                            className="w-full text-left px-5 py-2 text-[10px] uppercase tracking-widest text-red-600 dark:text-red-400 hover:bg-luxury-soft-white transition-colors cursor-pointer border-t border-luxury-light-gray/60 mt-1 pt-3"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="text-xs uppercase tracking-[0.2em] font-light text-luxury-black/70 hover:text-luxury-black py-2 cursor-pointer transition-colors focus:outline-none"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-between w-5 h-4 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span
                className={`h-[1px] w-full bg-luxury-black transition-transform duration-300 ${
                  isMobileMenuOpen ? "transform rotate-45 translate-y-[7.5px]" : ""
                }`}
              />
              <span
                className={`h-[1px] w-full bg-luxury-black transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1px] w-full bg-luxury-black transition-transform duration-300 ${
                  isMobileMenuOpen ? "transform -rotate-45 -translate-y-[7.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-luxury-white/98 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none translate-y-[-10px]"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.15em] font-light text-luxury-black hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 text-xs uppercase tracking-[0.2em] px-8 py-4 border border-luxury-black bg-luxury-black text-luxury-white hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium"
          >
            Reserve Appointment
          </Link>

          <div className="w-12 h-[1px] bg-luxury-black/10 my-2" />

          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-3">
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">{user?.tier}</span>
              <span className="font-serif text-xl tracking-[0.1em] text-luxury-black uppercase font-light">{user?.name}</span>
              <span className="text-[10px] text-neutral-500 tracking-wider font-mono -mt-1">{user?.points} PTS</span>
              
              {/* Theme Toggle option inside mobile menu */}
              <button
                onClick={toggleTheme}
                className="text-[10px] uppercase tracking-[0.2em] text-luxury-black/75 hover:text-luxury-black cursor-pointer mt-2 flex items-center gap-1.5 focus:outline-none"
              >
                <span>Theme: {theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                <span>{theme === "light" ? "🌙" : "☀️"}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-red-600 dark:text-red-400 cursor-pointer mt-3 pt-2 border-t border-luxury-black/5 w-24 text-center"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLoginModal();
              }}
              className="text-xs uppercase tracking-[0.2em] font-medium text-luxury-black hover:opacity-60 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </>
  );
}
