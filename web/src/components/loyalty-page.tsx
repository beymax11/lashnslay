"use client";

import LoyaltyCard from "@/components/loyalty-card";
import Link from "next/link";

export default function LoyaltyPage() {
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

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-luxury-soft-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-luxury-light-gray">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              THE COUTURE MEMBERSHIP
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase mt-2">
              Exclusive Tiers & Rewards
            </h1>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light mt-4 md:mt-0 max-w-sm leading-relaxed">
            Manage your card, check points balance, and redeem treatment vouchers.
          </p>
        </div>

        {/* Content Section: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Card & Details Column */}
          <div className="lg:col-span-6 bg-luxury-white border border-luxury-light-gray p-8 shadow-xl">
            <LoyaltyCard />
          </div>

          {/* Membership Tiers Column */}
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

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
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
      </div>
    </div>
  );
}
