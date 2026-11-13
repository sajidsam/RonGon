import React from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * SareeRowSection: 2-Row Curated Showcase for Sarees
 * (5 items x 2 rows on desktop = 10 items; 4 items x 2 rows on tablet = 8 items)
 */
const SareeRowSection = () => {
  const { setActiveCategoryFilter, sareeProducts = [], isLoading } = useShop();

  const handleViewAll = () => {
    setActiveCategoryFilter("saree");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Limit to exactly 2 rows (10 items on 5-col desktop grid)
  const displaySarees = sareeProducts.slice(0, 10);

  if (!isLoading && displaySarees.length === 0) return null;

  return (
    <section id="saree-showcase" className="py-10 sm:py-14 bg-[#FAF7F2] border-t border-[#E8DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered uppercase heading on mobile matching Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 text-center sm:text-left">
          <div className="w-full sm:w-auto">
            <h2 className="text-base sm:text-2xl lg:text-3xl font-brand font-bold text-[#322D29] tracking-[0.2em] uppercase">
              EXCLUSIVE HERITAGE SAREES
            </h2>
            <p className="hidden sm:block text-xs sm:text-sm text-[#7D7063] mt-1 max-w-xl">
              Pure handloom cotton weaves, delicate floral prints, and ceremonial zari drapes crafted for timeless elegance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#55272B] transition-colors self-start sm:self-auto group"
          >
            <span>Explore All Sarees</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Row Responsive Grid: 2 cols on mobile (8 items), 4 cols on tablet (8 items), 5 cols on desktop (10 items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displaySarees.map((product, idx) => (
            <div key={product.id} className={idx >= 8 ? "hidden lg:block" : ""}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SareeRowSection;
