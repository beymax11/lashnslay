"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const collectionList = [
    {
      title: "Classic Silk Eyelash Set",
      price: "$150",
      duration: "90 MINS",
      desc: "Natural, single-lash application using lightweight premium silk fibres for subtle definition. Fits client looking for clean enhancement.",
      img: "/lash_classic.png",
      details: ["Single extension per lash", "Organic rosewater cleanse", "Custom curl mapping"],
    },
    {
      title: "Cashmere Volume Custom Set",
      price: "$220",
      duration: "120 MINS",
      desc: "Dense, multi-dimensional cashmere fans styled for elegant, premium, weightless volume. Ideal for editorial depth and dramatic symmetry.",
      img: "/hero_eyelash.png",
      details: ["2D-6D featherlight fans", "Botanical primer prep", "Lash-health scan validation"],
    },
    {
      title: "Couture Lash Lift & Keratin",
      price: "$110",
      duration: "60 MINS",
      desc: "Custom premium lash lift with organic keratin coating to nurture and curl natural lashes. Low-maintenance styling lasting 6 to 8 weeks.",
      img: "/lash_lounge.png",
      details: ["Keratin-infusion coating", "Symmetry alignment curl", "Conditioning lash serum scan"],
    },
  ];

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-luxury-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-luxury-light-gray">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              THE COLLECTION
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide uppercase mt-2">
              Lash Custom Styling
            </h1>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light mt-4 md:mt-0 max-w-sm leading-relaxed">
            Every set is customized by our master lash architects to match your facial anatomy and desired aesthetic depth.
          </p>
        </div>

        {/* Detailed Collection List */}
        <div className="space-y-16">
          {collectionList.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-luxury-light-gray pb-16 last:border-b-0"
              >
                {/* Image Section */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] overflow-hidden grayscale contrast-[1.05] border border-luxury-light-gray ${
                    isEven ? "" : "lg:order-last"
                  }`}
                >
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-102 transition-transform duration-1000"
                  />
                </div>

                {/* Content Section */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-center px-4">
                  <span className="text-[10px] tracking-widest font-mono text-neutral-400">
                    COLLECTION EDITION 0{index + 1}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-wide font-light uppercase">
                    {service.title}
                  </h2>
                  <p className="text-sm text-luxury-black/70 font-light leading-relaxed tracking-wide">
                    {service.desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
                      Styling Protocol Includes:
                    </span>
                    <ul className="text-xs text-luxury-black/60 font-light space-y-1 tracking-wide">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2">
                          <span className="w-1 h-[1px] bg-neutral-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-luxury-light-gray flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-500">
                      {service.duration} / {service.price}
                    </span>
                    <Link
                      href="/reserve"
                      className="text-xs uppercase tracking-[0.2em] px-8 py-3.5 bg-luxury-black text-luxury-white border border-luxury-black hover:bg-transparent hover:text-luxury-black transition-all duration-400 font-medium"
                    >
                      Reserve Look
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
