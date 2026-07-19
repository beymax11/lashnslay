"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-luxury-light-gray bg-luxury-soft-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center animate-fade-in-up">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400 block">
                LASH & SLAY COUTURE
              </span>
              <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl tracking-[0.08em] leading-[0.9] font-light uppercase text-luxury-black">
                Timeless <br />
                Beauty, <br />
                Perfected.
              </h1>
            </div>

            <p className="text-sm md:text-base text-luxury-black/70 font-light max-w-lg leading-relaxed tracking-wide">
              Elevate every appointment with luxurious lash experiences and exclusive member rewards designed for timeless elegance. Inspired by fashion house craftsmanship, tailored to your gaze.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/reservation"
                className="text-xs text-center uppercase tracking-[0.2em] font-medium px-8 py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400"
              >
                Reserve Appointment
              </Link>
              <Link
                href="/loyalty-card"
                className="text-xs text-center uppercase tracking-[0.2em] font-medium px-8 py-4 border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-400"
              >
                Explore Rewards
              </Link>
            </div>
          </div>

          {/* Right Campaign Image Framed */}
          <div className="lg:col-span-6 flex justify-center items-center relative animate-fade-in">
            <div className="relative w-full max-w-md aspect-[4/5] border border-luxury-light-gray p-4 bg-luxury-white shadow-xl">
              <div className="relative w-full h-full overflow-hidden grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-1000 ease-out">
                <Image
                  src="/hero_eyelash.png"
                  alt="Lash & Slay Lash Campaign Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transform hover:scale-105 transition-transform duration-[2000ms]"
                />
              </div>
              {/* Discrete Brand Coordinate Overlaid */}
              <div className="absolute bottom-6 left-6 text-white mix-blend-difference font-mono text-[9px] tracking-widest uppercase">
                COUTURE SET NO. 04 // 48.8566Â° N, 2.3522Â° E
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 animate-pulse">
          <span className="text-[9px] uppercase tracking-[0.25em] font-light">Scroll</span>
          <div className="w-[1px] h-8 bg-neutral-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-black animate-[draw-line_1.5s_infinite]" />
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-luxury-white flex justify-center items-center border-b border-luxury-light-gray">
        <div className="max-w-4xl text-center space-y-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-neutral-400 block">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-snug">
            â€œLuxury is not the addition of features, <br />but the absolute refinement of details.â€
          </h2>
          <div className="w-12 h-[1px] bg-luxury-black mx-auto" />
          <p className="text-xs md:text-sm text-luxury-black/60 max-w-2xl mx-auto uppercase tracking-[0.2em] font-light leading-relaxed">
            At Lash & Slay, we treat lash extension styling as an couture art form. Our master architects configure every set to align with your facial anatomy and personal aesthetic. We present an exclusive space for those who appreciate quiet luxury.
          </p>
        </div>
      </section>

      {/* Collection Spotlight Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-luxury-white border-b border-luxury-light-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              THE FEATURED LOOKS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide uppercase">
              The Classic & Volume Collections
            </h2>
            <div className="w-12 h-[1px] bg-luxury-black" />
            <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
              Explore our lash collections designed using ultra-soft cashmere fibres and premium silk. Each set is custom styled by our master lash architects for lightweight, tailored perfection.
            </p>
            <div className="pt-4">
              <Link
                href="/menu/services"
                className="text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400"
              >
                View Full Collection
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden grayscale contrast-[1.05] border border-luxury-light-gray">
            <Image
              src="/lash_classic.png"
              alt="Lash & Slay Lash Collection Spotlight"
              fill
              className="object-cover hover:scale-102 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Membership Teaser Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-luxury-soft-white border-b border-luxury-light-gray">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            MEMBERSHIP PRIVILEGES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase max-w-3xl mx-auto">
            Interactive Digital Loyalty Rewards
          </h2>
          <p className="text-sm text-luxury-black/70 font-light max-w-xl mx-auto leading-relaxed">
            Register and link your digital luxury loyalty card to track points, unlock premium treatment vouchers, and reserve sessions with master lash architects.
          </p>
          <div className="pt-4">
            <Link
              href="/loyalty-card"
              className="text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white transition-all duration-400 inline-block"
            >
              Access Member Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
