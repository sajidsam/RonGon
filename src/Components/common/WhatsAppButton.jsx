import React from "react";
import whatsappSticker from "@/assets/whatsapp.svg";

/**
 * Floating WhatsApp Sticker Button
 * Fixed at bottom-right, redirects directly to WhatsApp.
 * No custom hardcoded numbers or extra side texts.
 */
const WhatsAppButton = () => {
  return (
    <aside
      aria-label="WhatsApp Chat Support"
      className="fixed bottom-18 right-3.5 sm:bottom-20 sm:right-6 lg:bottom-6 lg:right-6 z-40"
    >
      <a
        href="https://api.whatsapp.com/send"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp"
        className="block w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-md hover:drop-shadow-lg"
      >
        <img
          src={whatsappSticker}
          alt="WhatsApp"
          className="w-full h-full object-contain"
        />
      </a>
    </aside>
  );
};

export default WhatsAppButton;
