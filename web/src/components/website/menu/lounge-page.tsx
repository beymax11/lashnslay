"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoungePage() {
  const experiences = [
    {
      title: "Symmetric Design",
      desc: "Designed following traditional Parisian salons, featuring custom symmetry, monochrome stone details, and minimal shadow profiles.",
      coordinate: "48.8566Â° N, 2.3522Â° E // PARIS",
    },
    {
      title: "Acoustic Stillness",
      desc: "Soundproofed treatment spaces equipped with custom spatial audio playlists emitting slow low-frequency soundscapes for deep rest.",
      coordinate: "40.7128Â° N, 74.0060Â° W // NEW YORK",
    },
  ];

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-luxury-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-luxury-light-gray">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              THE LOUNGE
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase mt-2">
              Our Physical Lounge
            </h1>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light mt-4 md:mt-0 max-w-sm leading-relaxed">
            A sanctuary designed for sensory relaxation and flawless precision.
          </p>
        </div>

        {/* Gallery Image & Text Split Grid */}
        <div className="space-y-16">
          <div className="relative w-full aspect-[16/8] border border-luxury-light-gray p-4 bg-luxury-white">
            <div className="relative w-full h-full overflow-hidden grayscale contrast-[1.05]">
              <Image
                src="/lash_lounge.png"
                alt="Lash & Slay Luxury Lounge Atmosphere"
                fill
                className="object-cover hover:scale-101 transition-transform duration-1000"
              />
            </div>
            <div className="absolute bottom-10 left-10 text-white mix-blend-difference font-mono text-[10px] tracking-widest uppercase">
              VENDÃ”ME LOUNGE INTERIOR // 18 PLACE VENDÃ”ME, PARIS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="border border-luxury-light-gray p-8 bg-luxury-soft-white space-y-4 hover:border-luxury-black transition-all duration-300"
              >
                <span className="font-mono text-[10px] text-neutral-400">{exp.coordinate}</span>
                <h3 className="font-serif text-2xl font-light tracking-wide uppercase">{exp.title}</h3>
                <p className="text-xs text-luxury-black/70 font-light leading-relaxed tracking-wide">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center py-8">
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-light mb-6">
              Access to physical lounges is exclusive to LASH & SLAY Couture Members.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/reservation"
                className="text-xs uppercase tracking-[0.2em] px-8 py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400 font-medium"
              >
                Request Lounge Tour
              </Link>
              <Link
                href="/loyalty-card"
                className="text-xs uppercase tracking-[0.2em] px-8 py-4 border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-400 font-medium"
              >
                Access Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
