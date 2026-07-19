"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function AdminLogin() {
  const { login, isLoggedIn, isAdmin, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Artificial tiny delay for premium micro-interaction feel
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (!success) {
        setError("Invalid administrative credentials. Please verify your login details.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-luxury-soft-white text-luxury-black transition-colors duration-500 relative overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-luxury-black/10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-luxury-light-gray pointer-events-none opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-luxury-light-gray pointer-events-none opacity-50" />

      <div className="w-full max-w-md bg-luxury-white border border-luxury-light-gray p-8 md:p-12 shadow-sm relative z-10 transition-transform duration-500 hover:scale-[1.005]">
        {/* Editorial Frame */}
        <div className="absolute inset-2 border border-luxury-light-gray/60 pointer-events-none" />

        <div className="text-center mb-8 relative">
          <Link
            href="/"
            className="text-[9px] uppercase tracking-[0.25em] font-semibold text-neutral-400 hover:text-luxury-black transition-colors duration-300 inline-block mb-3"
          >
            ← Return to Salon
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.2em] font-bold uppercase mt-2">
            LASH & SLAY
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-light text-neutral-400 mt-2">
            Administrative Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 text-[10px] text-red-600 dark:text-red-400 tracking-wider font-light text-center uppercase animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
              Administrative Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@lashnslay.com"
              className="w-full px-4 py-3 bg-luxury-soft-white border border-luxury-light-gray focus:border-luxury-black focus:outline-none text-xs tracking-wide transition-all duration-300 font-light text-luxury-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
              Access Code / Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-luxury-soft-white border border-luxury-light-gray focus:border-luxury-black focus:outline-none text-xs tracking-wide transition-all duration-300 font-light text-luxury-black"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black disabled:opacity-50 text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-400 shadow-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Authorizing Access...
                </>
              ) : (
                "Authorize Access"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-luxury-light-gray text-center">
          <p className="text-[10px] text-neutral-400 tracking-wider font-light uppercase">
            Authorized Personnel Only. System access is monitored.
          </p>
          <div className="mt-3 text-[9px] font-mono text-neutral-300 dark:text-neutral-600 tracking-widest uppercase">
            DEMO ACCESS: admin@lashnslay.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}
