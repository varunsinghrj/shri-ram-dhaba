import React, { useState, useEffect } from 'react';
import { ChevronLeft, Package, Clock, CheckCircle2, Truck, MapPin, Phone, Calendar, XCircle } from 'lucide-react';
import { Order, User } from '../types';
import { api } from '../api';

interface UserOrdersProps {
  currentUser: User;
  setView: (view: string) => void;
}

export default function UserOrders({ currentUser, setView }: UserOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      const userOrders = await api.getMyOrders();
      setOrders(userOrders);
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      await api.cancelOrder(orderId);
      loadOrders();
    } catch (e: any) {
      alert(e.message || 'Failed to cancel order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'preparing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 size={14} />;
      case 'preparing': return <Package size={14} />;
      case 'out_for_delivery': return <Truck size={14} />;
      case 'delivered': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing in Kitchen';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const canCancel = (status: string) => {
    return status === 'confirmed' || status === 'preparing';
  };

  const steps = [
    { label: 'Confirmed', icon: <CheckCircle2 size={16} /> },
    { label: 'Preparing', icon: <Package size={16} /> },
    { label: 'Out for Delivery', icon: <Truck size={16} /> },
    { label: 'Delivered', icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[800px] mx-auto text-left min-h-screen" id="user-orders-page">
      
      {/* Back Button */}
      <button 
        onClick={() => setView('menu')}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#ac2d00] hover:text-[#d63c05] mb-6 hover:translate-x-[-2px] transition-all"
      >
        <ChevronLeft size={18} />
        <span>Back to Menu</span>
      </button>

      {/* Title */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#261813]">My Orders</h1>
        <p className="text-sm text-[#5b4039] mt-1">Track your order status and history</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white border border-[#e4beb4] rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Order Header */}
              <div 
                className="p-4 sm:p-5 cursor-pointer hover:bg-[#fff8f6] transition-colors"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#ffe9e2] rounded-xl flex items-center justify-center">
                      <Package size={20} className="text-[#ac2d00]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#ac2d00]">#{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-xs text-[#5b4039] mt-0.5 flex items-center gap-1">
                        <Calendar size={12} /> {order.date} • {order.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#5b4039] uppercase font-bold">Total</p>
                    <p className="font-bold text-lg text-[#ac2d00]">₹{order.total}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-[#e4beb4] p-4 sm:p-5 bg-[#fff8f6] space-y-4">
                  
                  {/* Status Progress Bar */}
                  <div className="bg-white p-4 rounded-xl border border-[#e4beb4]">
                    <p className="text-xs font-bold text-[#5b4039] mb-4 uppercase tracking-wider">Order Progress</p>
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                        <div 
                          className="h-full bg-[#268451] transition-all duration-500"
                          style={{ width: `${((getStatusStep(order.status) - 1) / 3) * 100}%` }}
                        />
                      </div>
                      
                      {steps.map((step, idx) => {
                        const currentStep = getStatusStep(order.status);
                        const isCompleted = idx + 1 < currentStep;
                        const isActive = idx + 1 === currentStep;
                        
                        return (
                          <div key={idx} className="relative flex flex-col items-center z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isCompleted 
                                ? 'bg-[#268451] text-white' 
                                : isActive 
                                ? 'bg-[#ac2d00] text-white ring-4 ring-[#ac2d00]/20' 
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              {step.icon}
                            </div>
                            <span className={`text-[10px] mt-2 font-semibold text-center ${
                              isActive ? 'text-[#ac2d00]' : isCompleted ? 'text-[#268451]' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-[#261813] flex items-center gap-2">
                        <MapPin size={14} className="text-[#ac2d00]" /> Delivery Address
                      </h4>
                      <div className="bg-white p-3 rounded-xl border border-[#e4beb4] space-y-1.5">
                        <p className="text-xs text-[#5b4039]"><span className="font-semibold">Name:</span> {order.deliveryDetails.fullName}</p>
                        <p className="text-xs text-[#5b4039] flex items-center gap-1"><Phone size={12} /> {order.deliveryDetails.mobile}</p>
                        <p className="text-xs text-[#5b4039]">{order.deliveryDetails.address}</p>
                        {order.deliveryDetails.landmark && (
                          <p className="text-xs text-[#5b4039]">Landmark: {order.deliveryDetails.landmark}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-[#261813] flex items-center gap-2">
                        <Package size={14} className="text-[#ac2d00]" /> Order Items
                      </h4>
                      <div className="bg-white p-3 rounded-xl border border-[#e4beb4] space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-[#5b4039]">
                            <span>{item.menuItem.name} x{item.quantity}</span>
                            <span className="font-semibold">₹{item.menuItem.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t border-[#e4beb4]/50 pt-2 mt-2 space-y-1">
                          <div className="flex justify-between text-xs text-[#5b4039]">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-xs text-[#5b4039]">
                            <span>Packing</span>
                            <span>₹{order.packingCharges}</span>
                          </div>
                          <div className="flex justify-between text-xs text-[#5b4039]">
                            <span>Delivery</span>
                            <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-[#ac2d00] pt-1">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Time */}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="bg-[#ffe9e2] p-4 rounded-xl flex items-center gap-3">
                      <Clock size={18} className="text-[#ac2d00] animate-pulse" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[#5b4039] tracking-wider">Estimated Delivery</p>
                        <p className="font-bold text-sm text-[#ac2d00]">{order.estimatedTime}</p>
                      </div>
                    </div>
                  )}

                  {/* Cancel Button */}
                  {canCancel(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} />
                      Cancel Order
                    </button>
                  )}

                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e4beb4]">
            <Package size={40} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-lg text-[#261813]">No orders yet</h3>
            <p className="text-xs text-[#5b4039] mt-2">Your orders will appear here after you place one.</p>
            <button 
              onClick={() => setView('menu')}
              className="mt-4 px-5 py-2 bg-[#ac2d00] text-white rounded-xl text-xs font-semibold hover:bg-[#d63c05]"
            >
              Order Now
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
