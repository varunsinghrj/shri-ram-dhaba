import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MenuPage from './components/MenuPage';
import CartSidebar from './components/CartSidebar';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import Footer from './components/Footer';
import { MenuItem, CartItem, DeliveryDetails, Order } from './types';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('srd_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
  }, []);

  // Save cart to LocalStorage on change
  const saveCartToStorage = (newCart: CartItem[]) => {
    try {
      localStorage.setItem('srd_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  };

  const handleAddToCart = (item: MenuItem, notes?: string) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === item.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = cart.map((cartItem, idx) => {
        if (idx === existingIndex) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            notes: notes !== undefined ? notes : cartItem.notes,
          };
        }
        return cartItem;
      });
    } else {
      updatedCart = [
        ...cart,
        {
          menuItem: item,
          quantity: 1,
          notes: notes || '',
        },
      ];
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);

    // Microinteraction feedback: open a subtle toast or auto-toggle cart drawer?
    // Let's keep it clean, but opening cart drawer on thali adds confidence!
    if (item.category === 'Thali' && currentView === 'home') {
      setIsCartOpen(true);
    }
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === item.id);
    if (existingIndex === -1) return;

    let updatedCart: CartItem[] = [];
    const currentQty = cart[existingIndex].quantity;

    if (currentQty > 1) {
      updatedCart = cart.map((cartItem, idx) => {
        if (idx === existingIndex) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
    } else {
      updatedCart = cart.filter((_, idx) => idx !== existingIndex);
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const handleClearCartItem = (item: MenuItem) => {
    const updatedCart = cart.filter((cartItem) => cartItem.menuItem.id !== item.id);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const handlePlaceOrder = (deliveryDetails: DeliveryDetails, paymentMethod: string) => {
    const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    const packingFee = 15;
    const isDeliveryFree = subtotal >= 200;
    const deliveryFee = isDeliveryFree ? 0 : 30;
    const totalAmount = subtotal + packingFee + deliveryFee;

    const mockOrderId = 'SRD-' + Math.floor(10000 + Math.random() * 90000);
    const estimatedTime = isDeliveryFree ? '30 - 40 Mins' : '35 - 45 Mins';

    const newOrder: Order = {
      id: mockOrderId,
      items: [...cart],
      subtotal,
      packingCharges: packingFee,
      deliveryFee,
      total: totalAmount,
      deliveryDetails,
      paymentMethod,
      status: 'confirmed',
      estimatedTime,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveOrder(newOrder);
    setView('tracking');
    
    // Clear cart upon successful order
    setCart([]);
    localStorage.removeItem('srd_cart');
  };

  const handleResetOrder = () => {
    setActiveOrder(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fff8f6] font-sans antialiased text-[#261813]">
      
      {/* Shared Header bar */}
      <Header 
        currentView={currentView}
        setView={setView}
        cart={cart}
        toggleCartSidebar={() => setIsCartOpen(!isCartOpen)}
        onSearchChange={handleSearchChange}
        activeSearchQuery={searchQuery}
      />

      {/* Main viewport rendering of views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <LandingPage 
            setView={setView} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {currentView === 'menu' && (
          <MenuPage 
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            cart={cart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            setView={setView}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingPage 
            order={activeOrder}
            setView={setView}
            onResetOrder={handleResetOrder}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCartItem={handleClearCartItem}
        setView={setView}
      />

      {/* Shared Footer component */}
      <Footer setView={setView} />

    </div>
  );
}
