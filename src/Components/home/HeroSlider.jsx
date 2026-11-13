import React, { useState, useEffect } from "react";
import { useShop } from "../../Context/ShopContext";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "../../data/bannerData";
import banner1 from "@/assets/banner.webp";
import banner2 from "@/assets/banner2.webp";
import banner3 from "@/assets/banner3.webp";
import banner4 from "@/assets/banner4.webp";

const BANNER_ASSETS = {
  "slide-1": banner1,
  "slide-2": banner2,
  "slide-3": banner3,
  "slide-4": banner4,
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const { setActiveCategoryFilter, heroSlides } = useShop();

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;

  // Auto advance slide - resets timer on user interaction
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleCtaClick = (categorySlug) => {
    setActiveCategoryFilter(categorySlug || "all");
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full h-[42vh] sm:h-[55vh] md:h-[70vh] lg:h-[86vh] xl:h-[90vh] overflow-hidden group bg-[#241715] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const bannerKey = slide.bannerId || slide.id;
        const slideImg = BANNER_ASSETS[bannerKey] || slide.image;

        return (
          <div
            key={slide.id || slide.bannerId || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image: Tall & expansive on desktop, centered & top-anchored */}
            <div className="absolute inset-0 overflow-hidden bg-[#241715]">
              <img
                src={slideImg}
                alt={slide.title}
                className={`w-full h-full object-cover object-[center_top] sm:object-[75%_top] lg:object-right-top transition-transform duration-7000 ease-out ${
                  isActive ? "scale-103" : "scale-100"
                }`}
              />

              {/* Scrim: Balanced dark backdrop for centered mobile text, elegant left-scrim for desktop */}
              <div className="absolute inset-0 bg-black/45 sm:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 sm:hidden" />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            </div>

            {/* Banner Content: Mobile & Tab stay in current bottom position; Desktop moves to left & vertically center-aligned */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 flex items-end lg:items-center justify-center lg:justify-start pb-12 sm:pb-16 md:pb-20 lg:pb-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left text-white space-y-1.5 sm:space-y-3 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0">
                {/* Main Title - Mobile font 12px, Tablet/Desktop prominent & font-brand */}
                <h1 className="text-[12px] sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-brand font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] leading-snug sm:leading-[1.2] text-[#EFE9E1] drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtext - Mobile font 10px, Tablet/Desktop responsive */}
                <p className="text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-[0.16em] text-[#EFE9E1]/90 max-w-xs sm:max-w-none">
                  {slide.subtitle || "New festive collection"}
                </p>

                {/* Aarong Signature Sharp Button - Compact width on phone version */}
                <div className="pt-0.5 sm:pt-2">
                  <button
                    type="button"
                    onClick={() => handleCtaClick(slide.categorySlug)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 sm:px-6 sm:py-2.5 lg:px-7 lg:py-3 bg-white hover:bg-[#72383D] text-[#322D29] hover:text-white text-[9px] sm:text-[10px] lg:text-xs font-brand font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-none transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 cursor-pointer group/btn"
                  >
                    <span>{slide.mobileButtonText || slide.buttonText || "SHOP NOW"}</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Aarong-Style Chevron Arrows (Translucent Circular Glass Buttons) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/30 hover:bg-black/70 text-white backdrop-blur-xs items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/30 hover:bg-black/70 text-white backdrop-blur-xs items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Aarong-Style Horizontal Dash Slider Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 inset-x-0 z-20 flex justify-center items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              i === currentSlide
                ? "w-8 sm:w-12 bg-white"
                : "w-3.5 sm:w-6 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
