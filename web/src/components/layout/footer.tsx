"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 lg:px-24 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-neutral-800">
        {/* Logo & Statement */}
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="font-serif text-2xl tracking-[0.25em] font-light">
            LASH & SLAY
          </Link>
          <p className="text-xs text-neutral-400 font-light tracking-wide max-w-sm leading-relaxed">
            Couture eyelash extension design and premium membership lounge. Reflecting exclusive craftsmanship and timeless aesthetic luxury.
          </p>
        </div>

        {/* Locations */}
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">LOUNGES</h4>
          <ul className="text-xs text-neutral-300 font-light space-y-2 tracking-wide">
            <li>18 Place Vendôme, Paris</li>
            <li>742 Fifth Avenue, New York</li>
            <li>Bond Street, London</li>
          </ul>
        </div>

        {/* Connections */}
        <div className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">CONNECT</h4>
          <ul className="text-xs text-neutral-300 font-light space-y-2 tracking-wide font-sans">
            <li>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Contact Concierge</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Row */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between text-[10px] tracking-[0.2em] text-neutral-500 font-light uppercase gap-4 font-sans">
        <span>© {new Date().getFullYear()} LASH & SLAY COUTURE. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Experience</a>
        </div>
      </div>
    </footer>
  );
}
