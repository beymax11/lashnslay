"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

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
    { label: "Services", href: "/services" },
    { label: "Loyalty Rewards", href: "/loyalty" },
    { label: "Lounge", href: "/lounge" },
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-[0.25em] font-light hover:opacity-75 transition-opacity"
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
            <Link
              href="/reserve"
              className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] px-6 py-3 border border-luxury-black bg-luxury-black text-luxury-white hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium"
            >
              Reserve Appointment
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-luxury-light-gray text-luxury-black transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                // Moon Icon for Dark Mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              ) : (
                // Sun Icon for Light Mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM21 12h-1.5M3 12h1.5m9-9v1.5m0 16.5V19.5M19.07 19.07l-1.06-1.06M6.36 6.36l-1.06-1.06m12.73-12.73-1.06 1.06M6.36 17.64l-1.06 1.06"
                  />
                </svg>
              )}
            </button>

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
            href="/reserve"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 text-xs uppercase tracking-[0.2em] px-8 py-4 border border-luxury-black bg-luxury-black text-luxury-white hover:bg-transparent hover:text-luxury-black transition-all duration-300 font-medium"
          >
            Reserve Appointment
          </Link>
        </nav>
      </div>
    </>
  );
}
