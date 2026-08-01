import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MenuPage from './components/MenuPage';
import CartSidebar from './components/CartSidebar';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import UserOrders from './components/UserOrders';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import { api } from './api';
import { MenuItem, CartItem, DeliveryDetails, Order, User } from './types';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load cart from localStorage and check auth on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('srd_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }

    // Check if user is still logged in via cookie
    api.getMe().then(user => {
      setCurrentUser(user);
    }).catch(() => {
      // Not logged in, that's fine
    });
  }, []);

  // Save cart to localStorage on change
  const saveCartToStorage = (newCart: CartItem[]) => {
    try {
      localStorage.setItem('srd_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error saving cart', e);
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

  const handlePlaceOrder = async (deliveryDetails: DeliveryDetails, paymentMethod: string) => {
    try {
      const order = await api.placeOrder({ items: cart, deliveryDetails, paymentMethod });
      setActiveOrder(order);
      setView('tracking');
      setCart([]);
      localStorage.removeItem('srd_cart');
    } catch (e: any) {
      alert(e.message || 'Failed to place order');
    }
  };

  const handleResetOrder = () => {
    setActiveOrder(null);
  };

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleUserLogout = async () => {
    try {
      await api.logout();
    } catch {}
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fff8f6] font-sans antialiased text-[#261813]">
      
      {/* Header - hidden on admin view */}
      {currentView !== 'admin' && (
        <Header 
          currentView={currentView}
          setView={setView}
          cart={cart}
          toggleCartSidebar={() => setIsCartOpen(!isCartOpen)}
          currentUser={currentUser}
          onLogout={handleUserLogout}
        />
      )}

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
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            setView={setView}
            onPlaceOrder={handlePlaceOrder}
            currentUser={currentUser}
          />
        )}

        {currentView === 'login' && (
          <UserLogin 
            setView={setView}
            onLogin={handleUserLogin}
          />
        )}

        {currentView === 'my-orders' && currentUser && (
          <UserOrders 
            currentUser={currentUser}
            setView={setView}
          />
        )}

        {currentView === 'profile' && currentUser && (
          <UserProfile 
            currentUser={currentUser}
            setCurrentUser={handleUserLogin}
            setView={setView}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingPage 
            order={activeOrder}
            setView={setView}
            onResetOrder={handleResetOrder}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            orders={[]}
            setView={setView}
            onUpdateOrders={() => {}}
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

      {/* Footer - hidden on admin view */}
      {currentView !== 'admin' && (
        <Footer setView={setView} />
      )}

    </div>
  );
}
