"use client";

import { useState } from "react";
import LoyaltyCard from "@/components/loyalty/loyalty-card";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function LoyaltyPage() {
  const { isLoggedIn, user, openLoginModal, cancelReservation } = useAuth();
  const [activeTab, setActiveTab] = useState<"tiers" | "bookings">("tiers");

  const tiers = [
    {
      name: "Silver Essential",
      requirement: "Entry Level",
      benefits: [
        "Earn 10 points for every $10 spent",
        "Complimentary organic rosewater lash preps",
        "Anniversary treatment pricing offers",
      ],
    },
    {
      name: "Gold Elite",
      requirement: "Accumulate 500 Points",
      benefits: [
        "Earn 12 points for every $10 spent",
        "Priority reserve booking slot guarantees",
        "Complimentary protective sealant upgrades",
        "Milestone voucher claims (Free standard refills)",
      ],
    },
    {
      name: "Platinum Signature",
      requirement: "Accumulate 1,500 Points",
      benefits: [
        "Earn 15 points for every $10 spent",
        "24-hour concierge reserve chat access",
        "Free full-set couture treatment on birthday",
        "Early access to limited lash lash designs",
      ],
    },
  ];

  const handleCancel = (id: string, serviceName: string) => {
    if (
      window.confirm(
        `Are you sure you want to cancel your appointment for "${serviceName}"? This will cancel the reservation and adjust your loyalty points balance.`
      )
    ) {
      cancelReservation(id);
    }
  };

  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-luxury-soft-white min-h-[90vh]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-luxury-light-gray">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              THE COUTURE MEMBERSHIP
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase mt-2">
              {isLoggedIn ? "Your Member Portal" : "Exclusive Tiers & Rewards"}
            </h1>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light mt-4 md:mt-0 max-w-sm leading-relaxed">
            {isLoggedIn
              ? `Welcome back, ${user?.name}. Manage your active card, rewards, and booking schedules.`
              : "Manage your card, check points balance, and redeem treatment vouchers."}
          </p>
        </div>

        {/* Guest View */}
        {!isLoggedIn ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Locked Card Teaser Panel */}
            <div className="lg:col-span-6 bg-luxury-white border border-luxury-light-gray p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-luxury-white/40 backdrop-blur-xs z-10 flex flex-col items-center justify-center text-center p-6">
                <span className="w-10 h-10 rounded-full border border-luxury-black/10 flex items-center justify-center text-luxury-black mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <h3 className="font-serif text-xl tracking-wide uppercase text-luxury-black font-light mb-2">
                  Membership Account Required
                </h3>
                <p className="text-[11px] text-neutral-500 tracking-wide max-w-xs mb-6 font-light leading-relaxed uppercase">
                  Log in or register to unlock your dynamic 3D membership card and rewards.
                </p>
                <button
                  onClick={openLoginModal}
                  className="text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400 cursor-pointer"
                >
                  Sign In / Join the Club
                </button>
              </div>
              <div className="opacity-45 pointer-events-none select-none w-full">
                <LoyaltyCard />
              </div>
            </div>

            {/* Tiers & Benefits Preview */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="font-serif text-2xl tracking-wide font-light uppercase">
                  Membership Tiers & Benefits
                </h2>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-light mt-1">
                  Elevate your level through signature salon treatments.
                </p>
              </div>

              <div className="space-y-6">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="border border-luxury-light-gray p-6 bg-luxury-white space-y-4 hover:border-luxury-black transition-all duration-300"
                  >
                    <div className="flex justify-between items-baseline border-b border-luxury-light-gray pb-3">
                      <h3 className="font-serif text-lg tracking-wider font-light uppercase">
                        {tier.name}
                      </h3>
                      <span className="text-[9px] font-mono text-neutral-400 tracking-wider">
                        {tier.requirement}
                      </span>
                    </div>
                    <ul className="text-xs text-luxury-black/70 font-light space-y-2 leading-relaxed tracking-wide">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <span className="w-1 h-[1px] bg-luxury-black" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Interactive Loyalty Card Column */}
            <div className="lg:col-span-5 bg-luxury-white border border-luxury-light-gray p-8 shadow-xl">
              <LoyaltyCard />
            </div>

            {/* Dashboard Tabs & Actions Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Custom Tabs */}
              <div className="flex border-b border-luxury-light-gray">
                <button
                  onClick={() => setActiveTab("tiers")}
                  className={`pb-4 text-xs uppercase tracking-[0.2em] font-light mr-8 transition-all ${
                    activeTab === "tiers"
                      ? "border-b border-luxury-black font-semibold text-luxury-black"
                      : "text-luxury-black/40 hover:text-luxury-black/70"
                  }`}
                >
                  Tiers & Benefits
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`pb-4 text-xs uppercase tracking-[0.2em] font-light transition-all flex items-center gap-2 ${
                    activeTab === "bookings"
                      ? "border-b border-luxury-black font-semibold text-luxury-black"
                      : "text-luxury-black/40 hover:text-luxury-black/70"
                  }`}
                >
                  <span>My Appointments</span>
                  <span className="w-4 h-4 rounded-full bg-luxury-black text-luxury-white text-[8px] flex items-center justify-center font-mono">
                    {user?.reservations?.length ?? 0}
                  </span>
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === "tiers" ? (
                <div className="space-y-6">
                  {tiers.map((tier) => {
                    const isCurrentTier = user?.tier === tier.name;
                    return (
                      <div
                        key={tier.name}
                        className={`border p-6 bg-luxury-white space-y-4 transition-all duration-300 ${
                          isCurrentTier
                            ? "border-luxury-black shadow-md ring-1 ring-luxury-black/5"
                            : "border-luxury-light-gray hover:border-luxury-black"
                        }`}
                      >
                        <div className="flex justify-between items-baseline border-b border-luxury-light-gray pb-3">
                          <h3 className="font-serif text-lg tracking-wider font-light uppercase flex items-center gap-3">
                            {tier.name}
                            {isCurrentTier && (
                              <span className="bg-luxury-black text-luxury-white text-[8px] font-sans font-medium tracking-[0.2em] uppercase px-2 py-0.5 rounded-full">
                                Active Status
                              </span>
                            )}
                          </h3>
                          <span className="text-[9px] font-mono text-neutral-400 tracking-wider">
                            {tier.requirement}
                          </span>
                        </div>
                        <ul className="text-xs text-luxury-black/70 font-light space-y-2 leading-relaxed tracking-wide">
                          {tier.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2">
                              <span className="w-1 h-[1px] bg-luxury-black" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {user?.reservations && user.reservations.length > 0 ? (
                    <div className="space-y-4">
                      {user.reservations.map((res) => (
                        <div
                          key={res.id}
                          className="border border-luxury-light-gray p-6 bg-luxury-white hover:border-luxury-black transition-all duration-300 space-y-4"
                        >
                          <div className="flex justify-between items-start border-b border-luxury-light-gray pb-3">
                            <div>
                              <span className="text-[8px] font-mono text-neutral-400 tracking-wider">
                                {res.code}
                              </span>
                              <h4 className="font-serif text-lg font-light tracking-wide uppercase mt-0.5">
                                {res.serviceName}
                              </h4>
                            </div>
                            <span className="text-xs font-serif font-light text-neutral-800">
                              ${res.price}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs font-light tracking-wide text-neutral-600">
                            <div>
                              <p className="text-[9px] text-neutral-400 uppercase tracking-widest">
                                Stylist
                              </p>
                              <p className="font-medium text-luxury-black mt-0.5">
                                {res.stylistName}
                              </p>
                            </div>
                            <div>
                              <p className="text-[9px] text-neutral-400 uppercase tracking-widest">
                                Schedule
                              </p>
                              <p className="font-medium text-luxury-black mt-0.5">
                                {formatFriendlyDate(res.date)} at {res.time}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-3 border-t border-luxury-light-gray/60">
                            <button
                              onClick={() => handleCancel(res.id, res.serviceName)}
                              className="text-[9px] uppercase tracking-widest text-red-600 dark:text-red-400 hover:opacity-70 transition-opacity font-medium cursor-pointer"
                            >
                              Cancel Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-luxury-light-gray p-12 text-center bg-luxury-white/50">
                      <span className="w-8 h-8 rounded-full border border-luxury-black/10 flex items-center justify-center text-neutral-400 mx-auto mb-4">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <p className="font-serif text-lg font-light tracking-wide text-luxury-black">
                        No upcoming reservations
                      </p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-light mt-1.5 max-w-xs mx-auto leading-relaxed">
                        Book a custom couture treatment to earn points and climb membership tiers.
                      </p>
                      <Link
                        href="/reserve"
                        className="inline-block mt-6 text-[9px] uppercase tracking-[0.25em] font-medium px-6 py-3 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400"
                      >
                        Reserve Now
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Redirect Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-luxury-light-gray/60">
                <Link
                  href="/reserve"
                  className="text-xs text-center uppercase tracking-[0.2em] font-medium px-8 py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400"
                >
                  Reserve Next Appointment
                </Link>
                <Link
                  href="/"
                  className="text-xs text-center uppercase tracking-[0.2em] font-medium px-8 py-4 border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-400"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
