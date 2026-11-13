import React, { useState, useEffect } from "react";
import { useShop } from "../Context/ShopContext";
import { Link } from "react-router";
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save,
  Package,
  Heart,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const Profile = () => {
  const { wishlistCount, cartCount, setIsCartOpen, showToast } = useShop();

  // Load profile from localStorage or fallback
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("rongon_user_profile");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      fullName: "Sultana Razia",
      phone: "+880 1712 345 678",
      email: "razia.sultana@example.com",
      address: "House 24, Road 7, Block D, Banani",
      district: "Dhaka",
      postalCode: "1213",
      altPhone: "+880 1970 085 954",
      deliveryNotes: "Please call before arriving. Cash on delivery.",
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const savedOrders =
        localStorage.getItem("rongon_orders") ||
        localStorage.getItem("leeswhim_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders([
          {
            orderId: "RGN-88421",
            date: "12 Nov 2026",
            status: "Processing",
            total: 6850,
            items: [
              { name: "Silk Katan Festive Saree", qty: 1, price: 4200 },
              { name: "Artisanal Crossbody Bag", qty: 1, price: 2650 },
            ],
            shippingMethod: "Nationwide Express (Dhaka)",
          },
        ]);
      }
    } catch (e) {
      console.error("Failed to load orders:", e);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem("rongon_user_profile", JSON.stringify(profile));
        showToast("Profile updated successfully! ✨", "success");
        setIsEditing(false);
      } catch (err) {
        console.error("Save error:", err);
        showToast("Failed to save profile.", "error");
      } finally {
        setIsSaving(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12 font-futura">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb - Clean without subtitle */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#72383D] hover:text-[#582A2E] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Profile Hero Card */}
        <div className="bg-gradient-to-r from-[#72383D] via-[#5C2B30] to-[#322D29] rounded-3xl p-6 sm:p-8 text-[#EFE9E1] shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-end pr-8">
            <Sparkles className="w-64 h-64 text-[#EFE9E1]" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-bold font-futura text-[#EFE9E1] shadow-inner">
                {profile.fullName ? profile.fullName.charAt(0) : "R"}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider text-[#EFE9E1] mb-1">
                  <span>Privilege Member</span>
                </div>
                <h1 className="text-xl sm:text-3xl font-bold font-futura tracking-tight text-[#EFE9E1]">
                  {profile.fullName || "Valued Client"}
                </h1>
                <p className="text-xs sm:text-sm text-[#D1C7BD] mt-0.5 font-medium">
                  {profile.phone} • {profile.email}
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-white text-[#72383D] hover:bg-[#FAF7F2] transition-colors shadow-xs cursor-pointer tracking-wide"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-white/15 hover:bg-white/25 text-[#EFE9E1] transition-colors backdrop-blur-xs border border-white/20 cursor-pointer flex items-center justify-center gap-1.5 tracking-wide"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Profile Form, Right Order History & Access Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Editable Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E8DFD3]/60">
              {/* Heading without unnecessary subheading */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8DFD3]/50">
                <h2 className="text-base sm:text-lg font-bold font-futura tracking-tight text-[#322D29]">
                  Personal & Delivery Information
                </h2>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold text-[#72383D] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 font-futura">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#AC9C8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Your full legal name"
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isEditing
                          ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                          : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Contact Row: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#AC9C8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={profile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+880 1..."
                        required
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          isEditing
                            ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                            : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#AC9C8D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="you@domain.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          isEditing
                            ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                            : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#AC9C8D] absolute left-3.5 top-3" />
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={profile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="House, Road, Area, Landmark"
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all resize-none ${
                        isEditing
                          ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                          : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* District & Alt Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                      District / City
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      placeholder="Dhaka, Chittagong, Sylhet, etc."
                      required
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isEditing
                          ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                          : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={profile.altPhone}
                      onChange={(e) => handleInputChange("altPhone", e.target.value)}
                      placeholder="Secondary contact number"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isEditing
                          ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                          : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Special Delivery Instructions */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#322D29] mb-1.5">
                    Delivery Instructions
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#AC9C8D] absolute left-3.5 top-3" />
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={profile.deliveryNotes}
                      onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                      placeholder="e.g. Call before arriving, leave with reception"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all resize-none ${
                        isEditing
                          ? "bg-white border border-[#72383D]/40 focus:outline-none focus:ring-2 focus:ring-[#72383D]/20 text-[#322D29]"
                          : "bg-[#FAF7F2] border border-transparent text-[#322D29] cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8DFD3]/50">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 text-xs font-bold rounded-xl text-[#322D29] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#72383D] text-[#EFE9E1] hover:bg-[#582A2E] transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Orders Section - Heading without unnecessary subheading */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E8DFD3]/60">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8DFD3]/50">
                <h2 className="text-base sm:text-lg font-bold font-futura tracking-tight text-[#322D29]">
                  Order History & Invoices
                </h2>
                <span className="text-xs font-bold text-[#72383D] bg-[#EFE9E1] px-2.5 py-1 rounded-lg">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10 font-futura">
                  <Package className="w-10 h-10 text-[#AC9C8D] mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-bold text-[#322D29] mb-4">No orders placed yet</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#72383D] text-[#EFE9E1] hover:bg-[#582A2E] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 font-futura">
                  {orders.map((ord, idx) => (
                    <div
                      key={ord.orderId || idx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#322D29]">
                            Order #{ord.orderId}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#72383D]/10 text-[#72383D]">
                            {ord.status || "Confirmed"}
                          </span>
                        </div>
                        <p className="text-xs text-[#AC9C8D] font-medium">
                          {ord.date || "Recent"} • {ord.shippingMethod || "Standard Courier"}
                        </p>
                        {ord.items && (
                          <div className="mt-2 text-xs text-[#322D29]">
                            {ord.items.map((item, i) => (
                              <span key={i} className="inline-block mr-2 font-medium">
                                • {item.name} (x{item.qty})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8DFD3]/60">
                        <span className="text-sm sm:text-base font-bold text-[#72383D] font-futura">
                          ৳{(ord.total || 0).toLocaleString()}
                        </span>
                        <a
                          href="https://wa.me/+8801970085954"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-[#72383D] hover:underline flex items-center gap-1 mt-1"
                        >
                          <span>Track Package</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Access & Guarantee */}
          <div className="space-y-6 font-futura">
            {/* Quick Access */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E8DFD3]/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#322D29] mb-4">
                Quick Access
              </h3>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#EFE9E1] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#72383D] text-[#EFE9E1] flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#322D29]">Shopping Bag</span>
                  </div>
                  <span className="text-xs font-bold text-[#72383D] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                    {cartCount}
                  </span>
                </button>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#72383D]/10 text-[#72383D] flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-[#322D29]">Saved Wishlist</span>
                  </div>
                  <span className="text-xs font-bold text-[#72383D] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                    {wishlistCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
