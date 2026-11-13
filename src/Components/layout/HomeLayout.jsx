import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import CartDrawer from "../common/CartDrawer";
import CheckoutModal from "../common/CheckoutModal";
import OrderSuccessModal from "../common/OrderSuccessModal";
import QuickViewModal from "../common/QuickViewModal";
import MobileDrawer from "../common/MobileDrawer";
import CookieConsent from "../common/CookieConsent";
import WhatsAppButton from "../common/WhatsAppButton";
import Toast from "../common/Toast";

const HomeLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#EFE9E1] text-[#322D29] selection:bg-[#72383D] selection:text-[#EFE9E1]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Fixed Navigation (lg:hidden) */}
      <MobileBottomNav />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <QuickViewModal />
      <MobileDrawer />
      <CookieConsent />
      <Toast />
    </div>
  );
};

export default HomeLayout;