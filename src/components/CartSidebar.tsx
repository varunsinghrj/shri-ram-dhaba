import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Truck } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onClearCartItem: (item: MenuItem) => void;
  setView: (view: string) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCartItem,
  setView,
}: CartSidebarProps) {
  if (!isOpen) return null;

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  
  // Custom billing rules
  const packingFee = totalItemCount > 0 ? 15 : 0;
  const deliveryThreshold = 200;
  const isDeliveryFree = subtotal >= deliveryThreshold || subtotal === 0;
  const deliveryFee = totalItemCount > 0 ? (isDeliveryFree ? 0 : 30) : 0;
  const totalAmount = subtotal + packingFee + deliveryFee;

  const progressPercentage = Math.min(100, (subtotal / deliveryThreshold) * 100);
  const remainingForFreeDelivery = deliveryThreshold - subtotal;

  const handleProceedToCheckout = () => {
    onClose();
    setView('checkout');
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity animate-fade-in"
        onClick={onClose}
        id="cart-backdrop"
      />

      {/* Cart Container Drawer */}
      <aside 
        className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#fff8f6] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out animate-slide-in-right text-left"
        id="cart-sidebar-container"
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e4beb4] flex justify-between items-center bg-[#ffe9e2]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#ac2d00]" />
            <h2 className="font-serif font-bold text-xl text-[#261813]">Your Basket</h2>
            <span className="bg-[#ac2d00]/10 text-[#ac2d00] font-bold text-xs px-2.5 py-1 rounded-full">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#5b4039] hover:bg-[#fff1ec] rounded-full hover:text-[#ac2d00]"
            id="cart-close-drawer-btn"
          >
            <X size={22} />
          </button>
        </div>

        {/* Dynamic Free Delivery Target Indicator */}
        {totalItemCount > 0 && (
          <div className="bg-white border-b border-[#e4beb4]/50 p-4 px-6 space-y-2">
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <Truck size={16} className={isDeliveryFree ? 'text-[#268451]' : 'text-[#765a00]'} />
              {isDeliveryFree ? (
                <span className="text-[#268451]">Awesome! You have unlocked Free Delivery to Dhanwantri & Sanskriti! 🎉</span>
              ) : (
                <span className="text-[#765a00]">Add ₹{remainingForFreeDelivery} more to get FREE Delivery!</span>
              )}
            </div>
            <div className="w-full bg-[#fff1ec] rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isDeliveryFree ? 'bg-[#268451]' : 'bg-[#fdc826]'}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* List of Basket items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div 
                key={item.menuItem.id}
                className="bg-white border border-[#e4beb4] rounded-2xl p-4 flex gap-4 hover:border-[#ac2d00]/30 transition-all shadow-sm relative group"
              >
                
                {/* Item Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-[#e4beb4]/40 flex-shrink-0">
                  {item.menuItem.image ? (
                    <img 
                      src={item.menuItem.image} 
                      alt={item.menuItem.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ffe9e2] flex items-center justify-center text-[#ac2d00] font-bold text-xs">
                      Veg
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif font-bold text-[#261813] text-sm sm:text-base leading-snug">
                        {item.menuItem.name}
                      </h3>
                      <button 
                        onClick={() => onClearCartItem(item.menuItem)}
                        className="text-gray-400 hover:text-red-500 p-0.5 transition-colors absolute top-3 right-3"
                        title="Delete item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {item.notes && (
                      <span className="text-[10px] text-[#765a00] font-semibold bg-[#ffdf95]/30 px-2 py-0.5 rounded border border-[#ffdf95]/50 block w-max">
                        Note: {item.notes}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-sm text-[#ac2d00]">₹{item.menuItem.price * item.quantity}</span>
                    
                    {/* Controls */}
                    <div className="flex items-center gap-2.5 bg-[#fff8f6] border border-[#e4beb4] px-2 py-1 rounded-lg">
                      <button 
                        onClick={() => onRemoveFromCart(item.menuItem)}
                        className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="font-bold text-xs text-[#261813] w-3 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onAddToCart(item.menuItem)}
                        className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-[#ffe9e2] rounded-full flex items-center justify-center text-[#ac2d00]">
                <ShoppingBag size={32} />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#261813]">Your basket is empty</h3>
              <p className="text-xs text-[#5b4039] max-w-xs mx-auto">
                Explore our mouth-watering traditional Dhaba items, rich thalis, and creamy desserts to add items to your cart!
              </p>
              <button 
                onClick={() => {
                  onClose();
                  setView('menu');
                }}
                className="mt-4 px-6 py-2.5 bg-[#ac2d00] text-white rounded-xl text-xs font-semibold hover:bg-[#d63c05] shadow"
              >
                Start Browsing
              </button>
            </div>
          )}
        </div>

        {/* Calculation Invoice Box */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#fff1ec] border-t border-[#e4beb4] space-y-4">
            
            <div className="space-y-2 text-xs sm:text-sm text-[#5b4039] font-medium">
              <div className="flex justify-between items-center">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#261813]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">Eco Packing Charge</span>
                <span className="font-semibold text-[#261813]">₹{packingFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge</span>
                {isDeliveryFree ? (
                  <span className="font-bold text-[#268451] uppercase text-[10px] tracking-wide">FREE</span>
                ) : (
                  <span className="font-semibold text-[#261813]">₹{deliveryFee}</span>
                )}
              </div>
              <div className="border-t border-[#e4beb4]/50 pt-2 flex justify-between items-center text-base font-bold text-[#261813]">
                <span className="font-serif">Grand Total</span>
                <span className="text-[#ac2d00] text-lg">₹{totalAmount}</span>
              </div>
            </div>

            {/* CTA checkout button */}
            <button 
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#ac2d00] hover:bg-[#d63c05] text-white font-bold text-sm sm:text-base rounded-xl transition-all active:scale-95 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
              id="cart-checkout-trigger-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </aside>
    </>
  );
}
