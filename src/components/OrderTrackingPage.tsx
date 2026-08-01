import React from 'react';
import { CheckCircle2, ArrowLeft, Package } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingPageProps {
  order: Order | null;
  setView: (view: string) => void;
  onResetOrder: () => void;
}

export default function OrderTrackingPage({
  order,
  setView,
  onResetOrder,
}: OrderTrackingPageProps) {
  const handleBackToHome = () => {
    onResetOrder();
    setView('home');
  };

  const handleTrackOrder = () => {
    onResetOrder();
    setView('my-orders');
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[600px] mx-auto text-center min-h-screen flex flex-col items-center justify-center" id="order-success-page">
      
      {/* Success Icon */}
      <div className="w-24 h-24 bg-[#268451]/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={64} className="text-[#268451]" />
      </div>

      {/* Success Title */}
      <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#268451] mb-2">
        Order Placed Successfully!
      </h1>
      
      <p className="text-sm text-[#5b4039] mb-2">
        Thank you for ordering from Shri Ram Dhaba
      </p>

      {/* Order ID */}
      <div className="bg-white border border-[#e4beb4] rounded-2xl px-6 py-4 mb-8 shadow-sm">
        <span className="text-xs text-[#5b4039] block mb-1">Order ID</span>
        <span className="font-mono font-bold text-xl text-[#ac2d00]">#{order?.id || 'SRD-89024'}</span>
      </div>

      {/* Message */}
      <div className="bg-[#fff1ec] border border-[#e4beb4]/50 rounded-2xl px-6 py-4 mb-8 max-w-sm">
        <p className="text-sm text-[#5b4039] leading-relaxed">
          Your order has been confirmed and is being prepared. It will be delivered shortly. 
          Pay <span className="font-bold text-[#ac2d00]">₹{order?.total || 0}</span> via Cash on Delivery.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Track Order Button */}
        <button 
          onClick={handleTrackOrder}
          className="px-8 py-3 bg-[#268451] hover:bg-[#1e6b3f] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          <Package size={16} />
          <span>Track Order</span>
        </button>

        {/* Return Button */}
        <button 
          onClick={handleBackToHome}
          className="px-8 py-3 bg-[#ac2d00] hover:bg-[#d63c05] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Return to Main Menu</span>
        </button>
      </div>

    </div>
  );
}
