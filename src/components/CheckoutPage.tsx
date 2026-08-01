import React, { useState } from 'react';
import { ChevronLeft, Truck, Landmark, ClipboardList, Wallet, Sparkles, AlertCircle, LogIn, User } from 'lucide-react';
import { CartItem, DeliveryDetails, MenuItem, User as UserType } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  setView: (view: string) => void;
  onPlaceOrder: (details: DeliveryDetails, paymentMethod: string) => void;
  currentUser: UserType | null;
}

export default function CheckoutPage({
  cart,
  setView,
  onPlaceOrder,
  currentUser,
}: CheckoutPageProps) {
  // Details state
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Payment option - COD only
  const [paymentMethod] = useState('COD');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  
  const packingFee = totalItemCount > 0 ? 15 : 0;
  const isDeliveryFree = subtotal >= 200;
  const deliveryFee = totalItemCount > 0 ? (isDeliveryFree ? 0 : 30) : 0;
  const grandTotal = subtotal + packingFee + deliveryFee;

  const handleValidationAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    // Simple Indian Mobile validation
    const cleanMobile = mobile.replace(/\s+/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!address.trim()) {
      newErrors.address = 'Delivery Address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of errors or first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors({});
      // Call handler
      onPlaceOrder({
        fullName,
        mobile,
        address,
        landmark,
        instructions
      }, paymentMethod);
    }
  };

  // Show login prompt if not logged in
  if (!currentUser) {
    return (
      <div className="w-full bg-[#fff8f6] py-20 text-center flex flex-col items-center justify-center max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="w-16 h-16 bg-[#ffe9e2] rounded-full flex items-center justify-center text-[#ac2d00] mb-4">
          <User size={32} />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#261813]">Login Required</h2>
        <p className="text-sm text-[#5b4039] max-w-sm mt-2">
          Please login or create an account to place your order.
        </p>
        <button 
          onClick={() => setView('login')}
          className="mt-6 px-6 py-3 bg-[#ac2d00] text-white rounded-xl font-bold text-sm hover:bg-[#d63c05] flex items-center gap-2"
        >
          <LogIn size={16} />
          Login / Register
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#fff8f6] py-20 text-center flex flex-col items-center justify-center max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="w-16 h-16 bg-[#ffe9e2] rounded-full flex items-center justify-center text-[#ac2d00] mb-4">
          <ClipboardList size={32} />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#261813]">No items to checkout</h2>
        <p className="text-sm text-[#5b4039] max-w-sm mt-2">
          Your basket is empty. Please add delicious traditional foods from our menu first.
        </p>
        <button 
          onClick={() => setView('menu')}
          className="mt-6 px-6 py-3 bg-[#ac2d00] text-white rounded-xl font-bold text-sm hover:bg-[#d63c05]"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[1200px] mx-auto text-left min-h-screen" id="checkout-page-root">
      
      {/* Back to menu button */}
      <button 
        onClick={() => setView('menu')}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#ac2d00] hover:text-[#d63c05] mb-6 hover:translate-x-[-2px] transition-all"
        id="checkout-back-to-menu-btn"
      >
        <ChevronLeft size={18} />
        <span>Back to Menu</span>
      </button>

      <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#261813] mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Delivery Form & Payments */}
        <form onSubmit={handleValidationAndSubmit} className="lg:col-span-7 space-y-6">
          
          {/* Delivery Details Card */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#e4beb4]/30 pb-4">
              <div className="w-9 h-9 rounded-full bg-[#ac2d00]/10 text-[#ac2d00] flex items-center justify-center">
                <Truck size={18} />
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#261813]">Delivery Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  Full Name <span className="text-[#ac2d00]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="E.g., Rajesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813] ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#e4beb4]'
                  }`}
                  id="checkout-fullName-input"
                />
                {errors.fullName && (
                  <span className="text-xs text-red-500 flex items-center gap-1 font-semibold">
                    <AlertCircle size={12} /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  Mobile Number <span className="text-[#ac2d00]">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="E.g., 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813] ${
                    errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-[#e4beb4]'
                  }`}
                  id="checkout-mobile-input"
                />
                {errors.mobile && (
                  <span className="text-xs text-red-500 flex items-center gap-1 font-semibold">
                    <AlertCircle size={12} /> {errors.mobile}
                  </span>
                )}
              </div>

            </div>

            {/* Delivery Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                Delivery Address <span className="text-[#ac2d00]">*</span>
              </label>
              <textarea 
                placeholder="E.g., Sanskriti Vihar, Block C, Room 204 or Dhanwantri Hostel, IIT Campus"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813] h-20 resize-none ${
                  errors.address ? 'border-red-500 bg-red-50/20' : 'border-[#e4beb4]'
                }`}
                id="checkout-address-input"
              />
              {errors.address && (
                <span className="text-xs text-red-500 flex items-center gap-1 font-semibold">
                  <AlertCircle size={12} /> {errors.address}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Landmark */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  Landmark <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="E.g., Near Main Gate, Opp Temple"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full border border-[#e4beb4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  id="checkout-landmark-input"
                />
              </div>

              {/* Cooking / Delivery Instructions */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  Delivery Instructions <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="E.g., Call before arriving, leave at reception"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full border border-[#e4beb4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  id="checkout-instructions-input"
                />
              </div>

            </div>

          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#e4beb4]/30 pb-4">
              <div className="w-9 h-9 rounded-full bg-[#fdc826]/20 text-[#765a00] flex items-center justify-center">
                <Wallet size={18} />
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#261813]">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Cash on Delivery */}
              <div 
                className="border rounded-2xl p-4 flex flex-col justify-between items-start gap-4 border-[#ac2d00] bg-[#fff1ec] shadow-md ring-1 ring-[#ac2d00]"
                id="payment-cod-box"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-sm text-[#261813]">Cash on Delivery</span>
                  <div className="w-4 h-4 rounded-full border flex items-center justify-center border-[#ac2d00] bg-[#ac2d00]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
                <span className="text-[10px] text-[#5b4039]">Pay upon doorstep arrival</span>
              </div>

            </div>

          </div>

          {/* Place Order submit button for mobile (shown on bottom or alongside) */}
          <button 
            type="submit"
            className="w-full py-4 bg-[#ac2d00] hover:bg-[#d63c05] text-[#ffffff] font-extrabold rounded-xl text-base shadow-lg transition-all active:scale-95 duration-200 block lg:hidden"
            id="checkout-mobile-submit-btn"
          >
            Place Order • ₹{grandTotal}
          </button>

        </form>

        {/* Right Column Order Summary invoice card */}
        <div className="lg:col-span-5 bg-white border border-[#e4beb4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
          
          <div className="flex items-center gap-3 border-b border-[#e4beb4]/30 pb-4">
            <ClipboardList size={18} className="text-[#ac2d00]" />
            <h2 className="font-serif font-bold text-lg text-[#261813]">Order Summary</h2>
          </div>

          {/* Items Scroller inside summary */}
          <div className="space-y-3.5 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between items-start text-xs sm:text-sm text-[#261813]">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="flex items-center justify-center w-3 h-3 border border-[#2E8B57] p-0.5 flex-shrink-0">
                      <span className="w-1 h-1 bg-[#2E8B57] rounded-full"></span>
                    </span>
                    <span>{item.menuItem.name}</span>
                    <span className="text-[#ac2d00] font-bold text-xs">x{item.quantity}</span>
                  </div>
                  {item.notes && (
                    <span className="text-[10px] text-[#765a00] block mt-0.5 italic">
                      ({item.notes})
                    </span>
                  )}
                </div>
                <span className="font-semibold whitespace-nowrap">₹{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Pricing Math calculations */}
          <div className="border-t border-[#e4beb4]/30 pt-4 space-y-2.5 text-xs sm:text-sm text-[#5b4039] font-medium">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="font-semibold text-[#261813]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Eco-friendly Packing Charges</span>
              <span className="font-semibold text-[#261813]">₹{packingFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Fee</span>
              {isDeliveryFree ? (
                <span className="font-bold text-[#268451] uppercase text-[10px]">FREE</span>
              ) : (
                <span className="font-semibold text-[#261813]">₹{deliveryFee}</span>
              )}
            </div>
            
            <div className="border-t border-[#e4beb4]/50 pt-3.5 flex justify-between items-center text-base sm:text-lg font-bold text-[#261813]">
              <span className="font-serif">Grand Total</span>
              <span className="text-[#ac2d00] text-xl sm:text-2xl font-extrabold">₹{grandTotal}</span>
            </div>
          </div>

          {/* Guarantees bar */}
          <div className="bg-[#fff1ec] p-4 rounded-2xl border border-[#e4beb4]/40 flex items-center gap-3">
            <Sparkles size={18} className="text-[#ac2d00] flex-shrink-0" />
            <p className="text-[11px] text-[#5b4039] leading-snug">
              Every meal is prepared inside an extreme hygiene certified kitchen and packed in sealed containers with contactless handoff.
            </p>
          </div>

          {/* Place Order CTA Button */}
          <button 
            onClick={handleValidationAndSubmit}
            className="w-full py-4 bg-[#ac2d00] hover:bg-[#d63c05] text-[#ffffff] font-extrabold rounded-xl text-base shadow-lg hover:shadow-xl transition-all active:scale-95 duration-200 hidden lg:block text-center"
            id="checkout-desktop-submit-btn"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}
