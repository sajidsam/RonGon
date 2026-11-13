import React, { useRef, useState, useEffect } from "react";
import { useShop } from "../../Context/ShopContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryBar = () => {
  const { activeCategoryFilter, setActiveCategoryFilter, categories = [] } = useShop();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
      }
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [categories]);

  const handleSlide = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSelect = (slug) => {
    setActiveCategoryFilter(slug);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-5 sm:py-8 shadow-xs border-b border-[#E8DFD3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Clean, centered uppercase with wide tracking on mobile like Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h2 className="text-base sm:text-xl font-bold font-brand tracking-[0.2em] uppercase text-[#322D29]">
              EXPLORE CURATIONS
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className="text-xs font-semibold text-[#72383D] hover:underline mr-2"
            >
              View All ({categories.reduce((acc, c) => acc + (c.itemCount || 0), 0)}+)
            </button>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#E8DFD3]/60 shadow-2xs">
              <button
                type="button"
                onClick={() => handleSlide("left")}
                disabled={!canScrollLeft}
                aria-label="Previous categories"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "bg-white text-[#72383D] hover:bg-[#72383D] hover:text-[#EFE9E1] shadow-2xs active:scale-95 cursor-pointer"
                    : "text-[#AC9C8D]/40 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide("right")}
                disabled={!canScrollRight}
                aria-label="Next categories"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "bg-[#72383D] text-[#EFE9E1] hover:bg-[#582A2E] shadow-2xs active:scale-95 cursor-pointer"
                    : "text-[#AC9C8D]/40 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Carousel with snap & smooth touch scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-center gap-3 sm:gap-5 overflow-x-auto scroll-smooth touch-pan-x snap-x snap-mandatory pb-2 pt-1 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* "All" button - Borderless */}
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 snap-start cursor-pointer ${
                activeCategoryFilter === "all"
                  ? "bg-[#EFE9E1] scale-105"
                  : "hover:bg-[#EFE9E1]/60"
              }`}
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform ${
                  activeCategoryFilter === "all"
                    ? "bg-[#72383D] text-[#EFE9E1]"
                    : "bg-[#322D29] text-[#EFE9E1]"
                }`}
              >
                <span>ALL</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#322D29] mt-2">
                All Styles
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = activeCategoryFilter === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelect(cat.slug)}
                  className={`group flex flex-col items-center shrink-0 p-2 rounded-2xl transition-all duration-200 snap-start cursor-pointer ${
                    isSelected
                      ? "bg-[#EFE9E1] scale-105"
                      : "hover:bg-[#EFE9E1]/60"
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform bg-[#EFE9E1]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center"
                    />
                    {cat.badge && (
                      <span className="absolute top-1 right-1 text-[8px] font-bold px-1.5 py-0.2 bg-[#72383D] text-[#EFE9E1] rounded-full">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#322D29] mt-2 text-center max-w-[80px] sm:max-w-[90px] truncate group-hover:text-[#72383D] transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#AC9C8D]">
                    {cat.itemCount} Items
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimalist Slider Indicator Bar for Mobile */}
          <div className="w-24 sm:w-36 h-1 bg-[#EFE9E1] rounded-full mx-auto mt-2 overflow-hidden">
            <div
              className="h-full bg-[#72383D] rounded-full transition-all duration-150"
              style={{
                width: "40%",
                transform: `translateX(${scrollProgress * 1.5}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
