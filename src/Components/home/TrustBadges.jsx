import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Truck,
      title: "Nationwide Delivery",
      shortTitle: "Nationwide Delivery",
      description: "Cash on delivery across all 64 districts in Bangladesh",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Quality",
      shortTitle: "100% Authentic",
      description: "Certified pure fabrics, intricate embroidery & royal craftsmanship",
    },
    {
      icon: RefreshCw,
      title: "7-Day Easy Exchange",
      shortTitle: "7-Day Exchange",
      description: "Hassle-free size & color exchange policy",
    },
    {
      icon: Headphones,
      title: "Dedicated Concierge",
      shortTitle: "Live Concierge",
      description: "Live styling advice via WhatsApp & phone support",
    },
  ];

  return (
    <section className="bg-[#EFE9E1] py-3 sm:py-8 border-y border-[#E8DFD3]/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile: 4 cards in 1 single serial (1 row) with brand logo color background (#72383D) */}
        <div className="grid grid-cols-4 gap-1.5 sm:hidden">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#72383D] text-[#EFE9E1] shadow-xs border border-[#582A2E]/50 transition-transform active:scale-98"
              >
                {/* Icon Base: Badami (#EFE9E1), Icon: Khoyeri (#72383D) */}
                <div className="w-7 h-7 rounded-lg bg-[#EFE9E1] text-[#72383D] flex items-center justify-center mb-1 shrink-0 shadow-2xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[9px] font-bold text-[#EFE9E1] leading-tight line-clamp-2">
                  {badge.shortTitle}
                </h4>
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop: Responsive 4-column cards with brand logo color background */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#72383D] text-[#EFE9E1] shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Icon Base: Badami (#EFE9E1), Icon: Khoyeri (#72383D) */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EFE9E1] text-[#72383D] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#EFE9E1] leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#EFE9E1]/80 mt-0.5 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
