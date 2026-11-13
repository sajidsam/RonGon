import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../common/ProductCard";
import { useShop } from "../../Context/ShopContext";
import { fetchProducts } from "../../services/api";
import { Sparkles, ArrowUpDown, ChevronLeft, ChevronRight, Loader2, X, ChevronDown, Check } from "lucide-react";

const PRODUCTS_PER_PAGE = 15;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest Arrival" },
];

const CatalogSection = () => {
  const {
    activeCategoryFilter,
    setActiveCategoryFilter,
    categories = [],
    searchQuery,
    setSearchQuery,
  } = useShop();
  const [sortBy, setSortBy] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogData, setCatalogData] = useState({
    products: [],
    total: 0,
    totalPages: 1,
  });
  const [isFetching, setIsFetching] = useState(false);

  // Close sort menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Reset to page 1 whenever filter, sort, or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryFilter, sortBy, searchQuery]);

  // Fetch paginated products on page/filter/sort/search change
  useEffect(() => {
    let isMounted = true;
    const loadCatalogPage = async () => {
      setIsFetching(true);
      try {
        const res = await fetchProducts({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          categorySlug: activeCategoryFilter,
          sort: sortBy,
          search: searchQuery,
        });

        if (isMounted && res) {
          setCatalogData({
            products: res.products || [],
            total: res.total || 0,
            totalPages: res.totalPages || 1,
          });
        }
      } catch (err) {
        console.error("Failed to load catalog page:", err);
      } finally {
        if (isMounted) setIsFetching(false);
      }
    };

    loadCatalogPage();
    return () => {
      isMounted = false;
    };
  }, [activeCategoryFilter, sortBy, currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > catalogData.totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate visible page numbers with ellipsis window
  const getPageNumbers = () => {
    const total = catalogData.totalPages;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", total];
    }
    if (currentPage >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", total];
  };

  const startIdx = catalogData.total === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * PRODUCTS_PER_PAGE, catalogData.total);

  return (
    <section id="catalog-section" className="py-12 sm:py-16 bg-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered uppercase heading on mobile matching Image 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-center md:text-left">
          <div className="w-full md:w-auto">
            <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold font-brand tracking-[0.2em] uppercase text-[#322D29]">
              RONGON SIGNATURE COLLECTION
            </h2>
            <p className="hidden md:block text-xs sm:text-sm text-[#AC9C8D] mt-1 max-w-xl">
              Showing exclusive Salwar Kameez, designer cotton sarees, single kameez, and contemporary fusion wear.
            </p>
          </div>

          {/* Custom Modern Sort Dropdown */}
          <div className="relative self-center md:self-auto" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
              aria-label="Sort products"
              className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl text-xs text-[#322D29] shadow-xs border border-[#E8DFD3]/60 hover:border-[#72383D]/40 transition-all cursor-pointer select-none"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#72383D] shrink-0" />
              <span className="font-medium text-[#AC9C8D]">Sort:</span>
              <span className="font-semibold text-[#322D29]">
                {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Featured First"}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#AC9C8D] transition-transform duration-200 shrink-0 ${
                  isSortOpen ? "rotate-180 text-[#72383D]" : ""
                }`}
              />
            </button>

            {/* Modern Floating Menu with smooth fade & checkmark */}
            {isSortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E8DFD3]/80 p-1.5 z-40 animate-fade-in"
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = sortBy === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-[#72383D]/10 text-[#72383D] font-bold"
                          : "text-[#322D29] hover:bg-[#FAF7F2] hover:text-[#72383D]"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#72383D] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3 mb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
              activeCategoryFilter === "all"
                ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                : "bg-white text-[#322D29] hover:bg-white/80"
            }`}
          >
            All Collections
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategoryFilter === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-[#72383D] text-[#EFE9E1] shadow-xs"
                    : "bg-white text-[#322D29] hover:bg-white/80"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Search Filter Chip Banner */}
        {searchQuery && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:px-5 rounded-2xl mb-8 shadow-xs border border-[#EFE9E1]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#AC9C8D]">Search results for:</span>
              <span className="text-xs font-bold text-[#72383D] bg-[#EFE9E1] px-2.5 py-1 rounded-lg">
                "{searchQuery}"
              </span>
              <span className="text-xs text-[#322D29] font-medium ml-1">
                ({catalogData.total} {catalogData.total === 1 ? "piece" : "pieces"} found)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-1.5 text-xs text-[#72383D] hover:text-[#322D29] font-semibold bg-[#EFE9E1]/70 hover:bg-[#EFE9E1] px-3 py-1.5 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear search</span>
            </button>
          </div>
        )}

        {/* Product Grid / Loading / Empty States */}
        {isFetching ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#72383D]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold text-[#7D7063]">Loading boutique products...</span>
          </div>
        ) : catalogData.products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-12 text-center shadow-xs max-w-md mx-auto my-8 border border-[#EFE9E1]">
            <h3 className="text-base font-bold text-[#322D29] mb-2">
              {searchQuery ? `No products found for "${searchQuery}"` : "No matching products found"}
            </h3>
            <p className="text-xs text-[#AC9C8D] mb-6">
              {searchQuery
                ? "Try checking your keywords or reset your search to explore the entire Rongon catalog."
                : "Try switching your category filter or select 'All Collections' to explore all available items."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2.5 bg-[#72383D] text-[#EFE9E1] text-xs font-bold rounded-xl hover:bg-[#322D29] transition-colors"
                >
                  Clear Search
                </button>
              )}
              {activeCategoryFilter !== "all" && (
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("all")}
                  className="px-5 py-2.5 bg-[#EFE9E1] text-[#322D29] text-xs font-bold rounded-xl hover:bg-[#72383D] hover:text-white transition-colors"
                >
                  Reset Category Filter
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {catalogData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {catalogData.totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D1C7BD]/50">
                <span className="text-xs text-[#7D7063] font-medium order-2 sm:order-1">
                  Showing <strong className="text-[#322D29]">{startIdx}</strong>–
                  <strong className="text-[#322D29]">{endIdx}</strong> of{" "}
                  <strong className="text-[#322D29]">{catalogData.total}</strong> products
                </span>

                <div className="flex items-center gap-1.5 order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#322D29] transition-colors shadow-2xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-xs text-[#AC9C8D]">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                          currentPage === pageNum
                            ? "bg-[#72383D] text-white scale-105"
                            : "bg-white text-[#322D29] hover:bg-[#EFE9E1]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === catalogData.totalPages}
                    className="p-2 rounded-xl bg-white text-[#322D29] hover:bg-[#72383D] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#322D29] transition-colors shadow-2xs"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
