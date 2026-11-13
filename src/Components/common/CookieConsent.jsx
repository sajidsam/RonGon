import React, { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";

/**
 * Functional Cookie Consent Banner
 * Styled precisely according to user reference (Image 1):
 * Light background bar, explanatory text with "Learn more",
 * and two sharp black rectangular action buttons: [ALLOW COOKIES] and [CLOSE].
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or dismissed
    const consent = localStorage.getItem("rongon_cookie_consent");
    if (!consent) {
      // Small timeout for smooth entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllowCookies = () => {
    try {
      localStorage.setItem("rongon_cookie_consent", "allowed");
      // Set real browser cookie for 1 year
      document.cookie =
        "rongon_cookie_consent=allowed; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // ignore storage errors
    }
    setIsVisible(false);
  };

  const handleClose = () => {
    try {
      localStorage.setItem("rongon_cookie_consent", "dismissed");
    } catch {
      // ignore storage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner Bar */}
      <aside
        aria-label="Cookie consent banner"
        className="fixed bottom-[56px] lg:bottom-0 inset-x-0 z-50 bg-[#E8DFD3]/98 backdrop-blur-md border-t border-[#D1C7BD] shadow-2xl px-4 py-3 sm:px-8 sm:py-3.5 transition-all duration-300 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Text Message */}
          <div className="text-xs sm:text-sm text-[#322D29] leading-relaxed text-center md:text-left flex-1">
            <span className="font-bold text-[#1E1B18]">
              We use cookies to make your experience better.
            </span>{" "}
            To comply with the new e-Privacy directive, we need to ask for your consent to set the cookies.{" "}
            <button
              type="button"
              onClick={() => setIsLearnMoreOpen(true)}
              className="text-[#B84E33] hover:underline font-semibold cursor-pointer ml-1 inline-block"
            >
              Learn more
            </button>
          </div>

          {/* Action Buttons: Sharp black rectangular buttons matching reference */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <button
              type="button"
              onClick={handleAllowCookies}
              className="px-5 py-2 sm:px-6 sm:py-2.5 bg-black hover:bg-[#72383D] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-none transition-colors duration-200 cursor-pointer shadow-xs active:scale-98"
            >
              ALLOW COOKIES
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 sm:px-6 sm:py-2.5 bg-black hover:bg-[#322D29] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-none transition-colors duration-200 cursor-pointer shadow-xs active:scale-98"
            >
              CLOSE
            </button>
          </div>
        </div>
      </aside>

      {/* Learn More Modal */}
      {isLearnMoreOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsLearnMoreOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] text-[#322D29] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLearnMoreOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#AC9C8D] hover:text-[#322D29] hover:bg-[#EFE9E1] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#72383D] text-[#EFE9E1] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#322D29]">
                  Cookie & Privacy Policy
                </h3>
                <span className="text-xs text-[#AC9C8D]">Rongon Luxury Boutique</span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#7D7063] leading-relaxed max-h-72 overflow-y-auto pr-1">
              <p>
                At Rongon, we respect your privacy. We use essential cookies to maintain your shopping cart, preserve your saved wishlist items, and remember your session preferences.
              </p>
              <p>
                <strong>What cookies we set:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><span className="font-semibold text-[#322D29]">Session & Cart:</span> Keeps track of your selected designer sarees and kurtis.</li>
                <li><span className="font-semibold text-[#322D29]">Wishlist Storage:</span> Saves your favorited festive styles across visits.</li>
                <li><span className="font-semibold text-[#322D29]">Performance:</span> Speeds up page caching and image loading.</li>
              </ul>
              <p className="text-[11px] text-[#AC9C8D] pt-2">
                We never sell your data or share tracking identifiers with unauthorized third parties.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-[#E8DFD3] pt-4">
              <button
                type="button"
                onClick={() => {
                  handleAllowCookies();
                  setIsLearnMoreOpen(false);
                }}
                className="px-5 py-2 bg-black hover:bg-[#72383D] text-white text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-colors"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
