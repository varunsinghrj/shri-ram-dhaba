import React, { useState } from 'react';
import { Menu, ShoppingCart, X, MapPin, User, Receipt, Phone, Heart, Info, Percent, LogOut, LogIn, Package, Settings } from 'lucide-react';
import { CartItem, User as UserType } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  toggleCartSidebar: () => void;
  currentUser: UserType | null;
  onLogout: () => void;
}

export default function Header({
  currentView,
  setView,
  cart,
  toggleCartSidebar,
  currentUser,
  onLogout,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    setView(view);
    setIsMobileMenuOpen(false);
    // Smooth scroll if element exists and we are on home
    if (view.startsWith('home#')) {
      const targetId = view.split('#')[1];
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>


      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-40 bg-[#fff8f6] border-b border-[#e4beb4] shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-[1200px] mx-auto">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-[#ac2d00] hover:bg-[#fff1ec] rounded-lg md:hidden"
              id="mobile-menu-trigger"
            >
              <Menu size={24} />
            </button>
            <div 
              onClick={(e) => handleNavClick('home', e)} 
              className="flex items-center gap-2 cursor-pointer group"
              id="logo-brand-container"
            >
              <img 
                alt="Shri Ram Dhaba Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz4vTiszeuwYx5pZVUsHnqnkoZGsxkNLIUgFnQAtWQAsQBTvN9uZsuYoo8ew5rk_Gik5lQTMeHF5IGUu0pAPFDo2tm3fCBt6EfvYh-UI7BeYjb33zjdsP16bdA8aYEMzi67jGUsOPArZdsNPdE7nEoYvt3XPaVY6-HThHhhY45x-pQQ6zrOBuyBh4C7WAHrMyxiSql0wVl1r0qf0mxJdVU8_a47XNOR0akS2KFrBdT4GT0YSC1CAAWz4W63xMGuBHLZPPT89cl-6Lu"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-2xl text-[#ac2d00] font-serif leading-none">श्री राम ढाबा</span>
                <span className="text-[10px] tracking-widest text-[#765a00] uppercase font-semibold">Shri Ram Dhaba</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => handleNavClick('home', e)}
              className={`font-semibold text-sm tracking-wide pb-1 transition-all border-b-2 ${
                currentView === 'home' 
                  ? 'text-[#ac2d00] border-[#ac2d00]' 
                  : 'text-[#5b4039] border-transparent hover:text-[#ac2d00]'
              }`}
              id="nav-link-home"
            >
              Home
            </a>
            <a 
              href="#menu" 
              onClick={(e) => handleNavClick('menu', e)}
              className={`font-semibold text-sm tracking-wide pb-1 transition-all border-b-2 ${
                currentView === 'menu' 
                  ? 'text-[#ac2d00] border-[#ac2d00]' 
                  : 'text-[#5b4039] border-transparent hover:text-[#ac2d00]'
              }`}
              id="nav-link-menu"
            >
              Menu
            </a>
            <a 
              href="#thalis" 
              onClick={(e) => handleNavClick('home#thalis', e)}
              className="font-semibold text-sm tracking-wide text-[#5b4039] hover:text-[#ac2d00] pb-1 border-b-2 border-transparent transition-all"
              id="nav-link-thalis"
            >
              Special Thalis
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick('home#about', e)}
              className="font-semibold text-sm tracking-wide text-[#5b4039] hover:text-[#ac2d00] pb-1 border-b-2 border-transparent transition-all"
              id="nav-link-about"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick('home#contact', e)}
              className="font-semibold text-sm tracking-wide text-[#5b4039] hover:text-[#ac2d00] pb-1 border-b-2 border-transparent transition-all"
              id="nav-link-contact"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Shopping Cart Button */}
            <button 
              onClick={toggleCartSidebar}
              className="p-2 text-[#5b4039] hover:text-[#ac2d00] hover:bg-[#fff1ec] rounded-full transition-all relative"
              title="Open cart"
              id="cart-icon-btn"
            >
              <ShoppingCart size={22} />
              {totalCartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#ac2d00] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#fff8f6] shadow-md">
                  {totalCartItemsCount}
                </span>
              )}
            </button>

            {/* User Login/Logout or User Info */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <button 
                  onClick={() => setView('my-orders')}
                  className="p-2 text-[#5b4039] hover:text-[#ac2d00] hover:bg-[#fff1ec] rounded-full transition-all"
                  title="My Orders"
                >
                  <Package size={18} />
                </button>
                <button 
                  onClick={() => setView('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#ffe9e2] rounded-full hover:bg-[#ffd9cc] transition-all"
                >
                  <div className="w-6 h-6 bg-[#ac2d00] rounded-full flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-[#5b4039] max-w-[80px] truncate">{currentUser.name}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 text-[#5b4039] hover:text-[#ac2d00] hover:bg-[#fff1ec] rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setView('login')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-[#ac2d00] hover:bg-[#fff1ec] rounded-full transition-all border border-[#ac2d00]/30"
              >
                <LogIn size={16} />
                <span className="text-xs font-semibold">Login</span>
              </button>
            )}

            {/* Order Online Button */}
            <button 
              onClick={() => setView('menu')}
              className="hidden sm:block bg-[#ac2d00] hover:bg-[#d63c05] text-[#ffffff] px-5 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95 shadow-md hover:shadow-lg"
              id="order-online-nav-btn"
            >
Order Now
            </button>

          </div>
        </div>
      </header>

      {/* Drawer Menu Overlay - Mobile only */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          id="drawer-overlay"
        />
      )}

      {/* Side Menu Drawer Content - Mobile only */}
      <aside 
        className={`fixed left-0 top-0 h-full w-80 z-50 bg-[#fff8f6] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="drawer-menu-aside"
      >
        <div className="px-6 py-8 border-b border-[#e4beb4] bg-[#ffe9e2] relative">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-1 text-[#ac2d00] hover:bg-[#fff1ec] rounded-full"
            id="drawer-close-btn"
          >
            <X size={24} />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-[#ac2d00] flex items-center justify-center mb-4 border-2 border-white shadow-lg">
            <User size={36} className="text-white" />
          </div>
          {currentUser ? (
            <>
              <h2 className="font-serif font-bold text-xl text-[#ac2d00]">Welcome, {currentUser.name}!</h2>
              <p className="text-xs text-[#5b4039] mt-1">{currentUser.email}</p>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => {
                    setView('my-orders');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-5 py-2 bg-[#ac2d00] text-white rounded-xl text-xs font-semibold hover:bg-[#d63c05] transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <Package size={14} />
                  My Orders
                </button>
                <button 
                  onClick={() => {
                    setView('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-5 py-2 bg-white border border-[#ac2d00] text-[#ac2d00] rounded-xl text-xs font-semibold hover:bg-[#ffe9e2] transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <Settings size={14} />
                  Profile
                </button>
                <button 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-5 py-2 bg-white border border-[#ac2d00] text-[#ac2d00] rounded-xl text-xs font-semibold hover:bg-[#ffe9e2] transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-serif font-bold text-xl text-[#ac2d00]">Welcome Guest!</h2>
              <p className="text-xs text-[#5b4039] mt-1">Login to place your order</p>
              <button 
                onClick={() => {
                  setView('login');
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 px-5 py-2 bg-[#ac2d00] text-white rounded-xl text-xs font-semibold hover:bg-[#d63c05] transition-all shadow-md w-full text-center flex items-center justify-center gap-2"
              >
                <LogIn size={14} />
                Login / Register
              </button>
            </>
          )}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button 
            onClick={(e) => handleNavClick('home', e)}
            className={`flex items-center gap-4 w-full py-3 px-4 rounded-xl text-left font-semibold transition-all ${
              currentView === 'home' 
                ? 'bg-[#ffe9e2] text-[#ac2d00]' 
                : 'text-[#5b4039] hover:bg-[#fff1ec]'
            }`}
          >
            <MapPin size={20} className="text-[#ac2d00]" />
            <span>Home / Explore</span>
          </button>

          <button 
            onClick={(e) => handleNavClick('menu', e)}
            className={`flex items-center gap-4 w-full py-3 px-4 rounded-xl text-left font-semibold transition-all ${
              currentView === 'menu' 
                ? 'bg-[#ffe9e2] text-[#ac2d00]' 
                : 'text-[#5b4039] hover:bg-[#fff1ec]'
            }`}
          >
            <Menu size={20} className="text-[#ac2d00]" />
            <span>Ordering Menu</span>
          </button>

          <button 
            onClick={(e) => handleNavClick('home#thalis', e)}
            className="flex items-center gap-4 w-full py-3 px-4 rounded-xl text-left text-[#5b4039] hover:bg-[#fff1ec] font-semibold transition-all"
          >
            <Percent size={20} className="text-[#ac2d00]" />
            <span>Special Thalis</span>
          </button>

          <button 
            onClick={(e) => handleNavClick('home#about', e)}
            className="flex items-center gap-4 w-full py-3 px-4 rounded-xl text-left text-[#5b4039] hover:bg-[#fff1ec] font-semibold transition-all"
          >
            <Info size={20} className="text-[#ac2d00]" />
            <span>Our About Story</span>
          </button>

          <button 
            onClick={(e) => handleNavClick('home#contact', e)}
            className="flex items-center gap-4 w-full py-3 px-4 rounded-xl text-left text-[#5b4039] hover:bg-[#fff1ec] font-semibold transition-all"
          >
            <Phone size={20} className="text-[#ac2d00]" />
            <span>Support & Contact</span>
          </button>
        </nav>

        <div className="p-4 border-t border-[#e4beb4] text-center text-xs text-[#5b4039] bg-[#fff1ec]">
          © 2026 Shri Ram Dhaba
        </div>
      </aside>
    </>
  );
}
