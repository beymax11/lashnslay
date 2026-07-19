"use client";

import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "join">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isLoginModalOpen) {
      setError("");
      setSuccessMsg("");
      setPassword("");
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoginModalOpen]);

  // Clear inputs when toggling tabs
  useEffect(() => {
    setError("");
    setSuccessMsg("");
    setPassword("");
  }, [activeTab]);

  if (!isLoginModalOpen) return null;

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const success = login(email, password);
    if (success) {
      setSuccessMsg("Welcome back to the Lounge.");
      setTimeout(() => {
        closeLoginModal();
        setEmail("");
        setPassword("");
      }, 1200);
    } else {
      setError("Authentication failed. Invalid email or password.");
    }
  };

  const handleJoinSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name || !email || !phone || !password) {
      setError("All fields are required to register.");
      return;
    }

    const success = register(name, email, phone, password);
    if (success) {
      setSuccessMsg("Welcome! Your digital loyalty card is ready.");
      setTimeout(() => {
        closeLoginModal();
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
      }, 1200);
    } else {
      setError("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeLoginModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Modal Content */}
      <div
        className={`relative bg-luxury-white border border-luxury-light-gray max-w-md w-full mx-4 shadow-2xl p-8 transition-all duration-300 z-10 ${isAnimating ? "scale-95 opacity-50 translate-y-4" : "scale-100 opacity-100 translate-y-0"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-6 right-6 text-luxury-black/40 hover:text-luxury-black transition-colors text-[10px] uppercase tracking-[0.2em] font-light cursor-pointer"
        >
          Close [×]
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8 mt-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-400">
            THE MEMBERSHIP CLUB
          </span>
          <h2 className="font-serif text-3xl font-light tracking-wider uppercase mt-2 text-luxury-black">
            Lash & Slay
          </h2>
          <div className="w-12 h-[1px] bg-luxury-black/20 mx-auto mt-4" />
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30 p-3 text-xs uppercase tracking-wide text-center font-light mb-6 transition-all">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-neutral-50 dark:bg-neutral-900/50 text-luxury-black border border-luxury-black p-3 text-xs uppercase tracking-[0.15em] text-center font-medium mb-6 transition-all duration-500 animate-pulse">
            {successMsg}
          </div>
        )}

        {/* Custom Luxury Tabs */}
        <div className="flex border-b border-luxury-light-gray mb-8">
          <button
            onClick={() => setActiveTab("signin")}
            className={`w-1/2 pb-3 text-xs uppercase tracking-[0.2em] font-light text-center transition-all ${activeTab === "signin"
              ? "border-b border-luxury-black font-semibold text-luxury-black"
              : "text-luxury-black/40 hover:text-luxury-black/70"
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`w-1/2 pb-3 text-xs uppercase tracking-[0.2em] font-light text-center transition-all ${activeTab === "join"
              ? "border-b border-luxury-black font-semibold text-luxury-black"
              : "text-luxury-black/40 hover:text-luxury-black/70"
              }`}
          >
            Sign up
          </button>
        </div>

        {/* Forms */}
        {activeTab === "signin" ? (
          <form onSubmit={handleSignInSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.com"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
              <span className="block text-[9px] font-light text-neutral-400 italic mt-2 leading-relaxed">
                Tip: Enter <span className="font-semibold text-neutral-500">eleanor@luxury.com</span> and password <span className="font-semibold text-neutral-500">eleanor123</span> to load the mock Gold membership card.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-black text-luxury-white text-xs uppercase tracking-[0.25em] font-medium py-4 border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400 focus:outline-none cursor-pointer mt-2"
            >
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ELEANOR VANE"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.com"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-019-8009"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-light text-neutral-500">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-luxury-soft-white border border-luxury-light-gray py-3 px-4 text-xs font-light tracking-wider focus:outline-none focus:border-luxury-black transition-colors text-luxury-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-luxury-black text-luxury-white text-xs uppercase tracking-[0.25em] font-medium py-4 border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400 focus:outline-none cursor-pointer mt-3"
            >
              Create a Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
