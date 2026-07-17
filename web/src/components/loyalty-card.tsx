"use client";

import { useState, useRef, MouseEvent } from "react";

interface Reward {
  points: number;
  title: string;
  description: string;
  code: string;
  unlocked: boolean;
}

export default function LoyaltyCard() {
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenPosition, setSheenPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentPoints = 750;
  const maxPoints = 1000;
  const progressPercent = (currentPoints / maxPoints) * 100;

  const rewards: Reward[] = [
    {
      points: 250,
      title: "Lash Conditioning Bath",
      description: "A luxury botanical conditioning bath to cleanse and prolong lash life.",
      code: "LASH-BATH-250",
      unlocked: currentPoints >= 250,
    },
    {
      points: 500,
      title: "Premium Protective Sealant",
      description: "High-grade nano-coating sealant application to secure extension bonding.",
      code: "NANO-SEAL-500",
      unlocked: currentPoints >= 500,
    },
    {
      points: 750,
      title: "Complimentary Couture Refill",
      description: "One free standard refill of your choice (Classic or Volume Cashmere).",
      code: "COUTURE-REFILL-750",
      unlocked: currentPoints >= 750,
    },
    {
      points: 1000,
      title: "Exclusive Full Lash Set",
      description: "A complete custom full set of high-fashion extensions of your choice.",
      code: "FULL-SET-1000",
      unlocked: currentPoints >= 1000,
    },
  ];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Calculate rotation (max 10 degrees)
    const rotateYVal = (x / (width / 2)) * 10;
    const rotateXVal = -(y / (height / 2)) * 10;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);

    // Calculate sheen position percentage
    const sheenX = ((e.clientX - rect.left) / width) * 100;
    const sheenY = ((e.clientY - rect.top) / height) * 100;
    setSheenPosition({ x: sheenX, y: sheenY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* 3D Perspective Card Wrapper */}
      <div 
        className="w-full h-64 cursor-pointer mb-8 relative"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 text-white p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 ease-out"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Custom Glossy Sheen Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300 hover:opacity-30"
            style={{
              background: `radial-gradient(circle 120px at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
            }}
          />

          {/* Top Row: Card Brand & Logo */}
          <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-light text-neutral-400">COUTURE MEMBERSHIP</p>
              <h3 className="font-serif text-lg tracking-[0.2em] font-light mt-1">LASH & SLAY</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-[8px] tracking-widest font-light">LS</span>
            </div>
          </div>

          {/* Middle Row: Point Balance */}
          <div style={{ transform: "translateZ(40px)" }} className="my-auto pt-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-light text-neutral-400">Current Points</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-light tracking-wide">{currentPoints}</span>
              <span className="text-neutral-500 text-sm font-light">/ {maxPoints} PTS</span>
            </div>
          </div>

          {/* Bottom Row: Member Info */}
          <div className="flex justify-between items-end" style={{ transform: "translateZ(30px)" }}>
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] font-light text-neutral-500">MEMBER NAME</p>
              <p className="text-xs uppercase tracking-[0.15em] font-medium mt-0.5">ELEANOR VANE</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.25em] font-light text-neutral-500">CARD NO</p>
              <p className="text-xs tracking-widest font-mono text-neutral-300 mt-0.5">•••• 8009 5112</p>
            </div>
          </div>
        </div>
      </div>

      {/* Point Progress Bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-[11px] uppercase tracking-[0.15em] font-light text-luxury-black/70 mb-2">
          <span>Tier Progress: Gold Elite</span>
          <span>{maxPoints - currentPoints} pts to next reward</span>
        </div>
        <div className="w-full h-[3px] bg-luxury-light-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-luxury-black transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Rewards Milestones Grid */}
      <div className="w-full space-y-4">
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-neutral-800 font-medium mb-2">
          Select Unlocked Reward
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => (
            <button
              key={reward.points}
              disabled={!reward.unlocked}
              onClick={() => setActiveReward(activeReward?.points === reward.points ? null : reward)}
              className={`p-4 border text-left flex flex-col justify-between transition-all duration-300 h-28 relative overflow-hidden ${
                reward.unlocked
                  ? activeReward?.points === reward.points
                    ? "border-luxury-black bg-luxury-black text-luxury-white"
                    : "border-luxury-light-gray bg-luxury-white hover:border-luxury-black text-luxury-black"
                  : "border-luxury-light-gray/40 bg-luxury-soft-white/30 opacity-40 cursor-not-allowed text-luxury-black/40"
              }`}
            >
              <span className="text-[9px] tracking-widest font-light uppercase">
                {reward.points} PTS
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-wider line-clamp-1">
                  {reward.title}
                </p>
                <p className={`text-[9px] mt-1 font-light tracking-wide ${
                  activeReward?.points === reward.points ? "text-neutral-300" : "text-luxury-black/60"
                }`}>
                  {reward.unlocked ? "Click to view voucher" : "Locked"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reward Coupon Detail Pane */}
      {activeReward && (
        <div className="w-full mt-6 border border-luxury-black p-6 animate-fade-in-up bg-luxury-soft-white flex flex-col items-center text-center">
          <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-light">
            Voucher Code
          </span>
          <h5 className="font-serif text-lg font-light tracking-wide my-1">
            {activeReward.title}
          </h5>
          <p className="text-xs text-neutral-600 font-light max-w-sm mt-1 mb-4 leading-relaxed">
            {activeReward.description}
          </p>

          {/* Minimalist Barcode SVG */}
          <div className="bg-luxury-white px-6 py-4 border border-luxury-light-gray shadow-sm flex flex-col items-center">
            <svg className="w-48 h-10 text-luxury-black" viewBox="0 0 100 20" fill="currentColor">
              {/* Custom realistic barcode lines */}
              <rect x="2" y="1" width="1.5" height="18" />
              <rect x="4.5" y="1" width="0.8" height="18" />
              <rect x="6.5" y="1" width="2.2" height="18" />
              <rect x="10" y="1" width="0.5" height="18" />
              <rect x="11.5" y="1" width="1.8" height="18" />
              <rect x="14" y="1" width="0.8" height="18" />
              <rect x="16" y="1" width="2.5" height="18" />
              <rect x="20" y="1" width="0.5" height="18" />
              <rect x="22" y="1" width="1.2" height="18" />
              <rect x="24.5" y="1" width="1.8" height="18" />
              <rect x="28" y="1" width="0.8" height="18" />
              <rect x="30" y="1" width="2.2" height="18" />
              <rect x="33.5" y="1" width="0.5" height="18" />
              <rect x="35" y="1" width="1.5" height="18" />
              <rect x="37.5" y="1" width="2.8" height="18" />
              <rect x="41.5" y="1" width="0.8" height="18" />
              <rect x="43" y="1" width="1.2" height="18" />
              <rect x="45.5" y="1" width="1.8" height="18" />
              <rect x="49" y="1" width="0.5" height="18" />
              <rect x="51" y="1" width="2.2" height="18" />
              <rect x="54" y="1" width="0.8" height="18" />
              <rect x="56" y="1" width="1.5" height="18" />
              <rect x="58.5" y="1" width="2.8" height="18" />
              <rect x="62.5" y="1" width="0.5" height="18" />
              <rect x="64.5" y="1" width="1.8" height="18" />
              <rect x="67" y="1" width="0.8" height="18" />
              <rect x="69" y="1" width="2.2" height="18" />
              <rect x="72.5" y="1" width="0.5" height="18" />
              <rect x="74" y="1" width="1.5" height="18" />
              <rect x="76.5" y="1" width="1.8" height="18" />
              <rect x="79.5" y="1" width="0.8" height="18" />
              <rect x="81.5" y="1" width="2.2" height="18" />
              <rect x="85" y="1" width="0.5" height="18" />
              <rect x="86.5" y="1" width="1.5" height="18" />
              <rect x="89" y="1" width="2.8" height="18" />
              <rect x="92.5" y="1" width="0.8" height="18" />
              <rect x="94" y="1" width="1.2" height="18" />
              <rect x="96" y="1" width="1.8" height="18" />
            </svg>
            <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 mt-2 block">
              {activeReward.code}
            </span>
          </div>
          <span className="text-[9px] text-neutral-400 font-light mt-3 block">
            Scan at counter or use code when reserving appointment.
          </span>
        </div>
      )}
    </div>
  );
}
