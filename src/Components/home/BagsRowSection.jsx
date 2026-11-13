import React from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * BagsRowSection: Exactly 2 rows of curated artisanal bags (10 items)
 * (5 items x 2 rows on desktop = 10 items; 4 items x 2 rows on tablet = 8 items)
 */
const BagsRowSection = () => {
  const { setActiveCategoryFilter, bagProducts = [], isLoading } = useShop();

  const handleViewAllBags = () => {
    setActiveCategoryFilter("bags");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Limit to exactly 2 rows (10 items on 5-col desktop grid)
  const displayBags = bagProducts.slice(0, 10);

  if (!isLoading && displayBags.length === 0) return null;

  return (
    <section id="bags-showcase" className="bg-[#FAF7F2] py-10 sm:py-14 border-y border-[#E8DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered uppercase heading on mobile matching Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 text-center sm:text-left">
          <div className="w-full sm:w-auto">
            <h2 className="text-base sm:text-2xl lg:text-3xl font-brand font-bold text-[#322D29] tracking-[0.2em] uppercase">
              ARTISANAL HANDBAGS & CROSSBODY
            </h2>
            <p className="hidden sm:block text-xs sm:text-sm text-[#7D7063] mt-1 max-w-xl">
              Trendy commuter shoulder bags, croissant chic crossbodies, and premium retro totes curated for modern elegance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAllBags}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#55272B] transition-colors self-start sm:self-auto group"
          >
            <span>View All Bags ({bagProducts.length > 0 ? "900+" : ""})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Row Responsive Grid: 2 cols on mobile (8 items), 4 cols on tablet (8 items), 5 cols on desktop (10 items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displayBags.map((bag, idx) => (
            <div key={bag.id} className={idx >= 8 ? "hidden lg:block" : ""}>
              <ProductCard product={bag} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BagsRowSection;
