import React, { useState } from 'react';
import { Search, SlidersHorizontal, Info, Eye, Clock, Star, Flame, Sparkles, Plus, Minus, ArrowRight, Heart } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuPageProps {
  onAddToCart: (item: MenuItem, notes?: string) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function MenuPage({
  onAddToCart,
  onRemoveFromCart,
  cart,
  searchQuery,
  setSearchQuery,
}: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [satvikOnly, setSatvikOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Categories list
  const categories = [
    'All',
    'Thali',
    'Main Course',
    'Dal Special',
    'Roti/Naan',
    'Rice & Biryani',
    'Snacks/Pakoda',
    'Beverages',
  ];

  // Chef's recommendation items
  const recommendations = MENU_ITEMS.filter(
    (item) => item.id === 'dal-makhani' || item.id === 'mix-dal-dhaba'
  );

  // Helper to check quantity in cart
  const getItemQuantity = (itemId: string) => {
    const found = cart.find((item) => item.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  // Process filters
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    // Satvik (No Onion No Garlic) match
    if (satvikOnly && !item.isSatvik) {
      return false;
    }
    // Text search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    // Default popularity based on ratings or hardcoded ratings
    const ratingA = a.rating || 4.5;
    const ratingB = b.rating || 4.5;
    return ratingB - ratingA;
  });

  const handleOpenDetailModal = (item: MenuItem) => {
    setSelectedItem(item);
    const existingQty = getItemQuantity(item.id);
    setModalQuantity(existingQty > 0 ? existingQty : 1);
    setSpecialInstructions('');
  };

  const handleModalAdd = () => {
    if (!selectedItem) return;
    // Add multiple quantities by calling onAddToCart repeatedly or custom implementation
    for (let i = 0; i < modalQuantity - getItemQuantity(selectedItem.id); i++) {
      onAddToCart(selectedItem, specialInstructions);
    }
    // Handle reduction if less
    const currentQty = getItemQuantity(selectedItem.id);
    if (modalQuantity < currentQty) {
      for (let i = 0; i < currentQty - modalQuantity; i++) {
        onRemoveFromCart(selectedItem);
      }
    }
    setSelectedItem(null);
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 text-left px-4 sm:px-6 max-w-[1200px] mx-auto min-h-screen">
      
      {/* Title Header */}
      <div className="text-center md:text-left mb-8">
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#261813] mb-3">
          Our Authentic Menu
        </h1>
        <p className="text-sm sm:text-base text-[#5b4039] max-w-xl">
          Savor the real, rustic flavors of roadside highway dhaba, prepared fresh with extreme sanitation, pure desi ghee, and premium whole spices.
        </p>
      </div>

      {/* Chef's Recommendations Showcase */}
      {activeCategory === 'All' && searchQuery === '' && (
        <section className="mb-12" id="chefs-recommendations">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-[#ac2d00]" size={20} />
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#261813]">Chef's Special Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div 
                  key={item.id}
                  className="bg-[#ffe9e2] border border-[#e4beb4] rounded-3xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Visual Background Accent */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#fdc826]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  {/* Left Column Image */}
                  <div className="sm:col-span-5 relative h-40 rounded-2xl overflow-hidden shadow-inner border border-[#e4beb4]/50">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-[#ac2d00] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
                      Legendary
                    </span>
                  </div>

                  {/* Right Column Details */}
                  <div className="sm:col-span-7 space-y-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-4.5 h-4.5 border border-[#2E8B57] p-0.5">
                        <span className="w-2 h-2 bg-[#2E8B57] rounded-full"></span>
                      </span>
                      <span className="text-[10px] font-bold text-[#268451] uppercase tracking-wider">Satvik Option Available</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#261813] group-hover:text-[#ac2d00] transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-[#5b4039] line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-xl text-[#ac2d00]">₹{item.price}</span>
                      
                      {qty > 0 ? (
                        <div className="flex items-center gap-3.5 bg-white border border-[#ac2d00] px-3.5 py-1.5 rounded-full shadow-sm">
                          <button 
                            onClick={() => onRemoveFromCart(item)}
                            className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="font-bold text-xs text-[#261813] w-4 text-center">{qty}</span>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => onAddToCart(item)}
                          className="bg-[#ac2d00] hover:bg-[#d63c05] text-white px-5 py-2 rounded-full font-bold text-xs transition-all active:scale-95 shadow-sm"
                        >
                          ADD +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Categories Scroller, Filters, and Sorting Controls */}
      <section className="bg-white border border-[#e4beb4] rounded-[28px] p-4 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col gap-6">
          
          {/* Categories Tab Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none" id="category-selector-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap transition-all active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-[#ac2d00] text-white shadow-md'
                    : 'bg-[#fff8f6] text-[#5b4039] border border-[#e4beb4]/55 hover:bg-[#ffe9e2] hover:text-[#ac2d00]'
                }`}
                id={`category-btn-${cat.toLowerCase().replace('/', '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Toggle Filters & Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4 border-t border-[#e4beb4]/40">
            
            {/* Toggles */}
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2.5 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={satvikOnly}
                  onChange={(e) => setSatvikOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#268451]"></div>
                <span className="text-xs sm:text-sm font-semibold text-[#5b4039] group-hover:text-[#261813] transition-colors flex items-center gap-1">
                  Satvik (No Garlic/Onion)
                </span>
              </label>
            </div>

            {/* Sorter and Search Result status */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#5b4039] font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#fff8f6] border border-[#e4beb4] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#5b4039] focus:outline-none focus:ring-1 focus:ring-[#ac2d00]"
              >
                <option value="popularity">Popularity (High Rated)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* Grid of Dishes */}
      <section className="space-y-4">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div 
                  key={item.id}
                  className="bg-white border border-[#e4beb4] rounded-[24px] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 shadow-sm relative group cursor-pointer"
                  onClick={() => handleOpenDetailModal(item)}
                >
                  
                  {/* Image container */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={item.image} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      // Authentic visual illustration placeholder if no image
                      <div className="w-full h-full bg-gradient-to-br from-[#ffe9e2] to-[#ffdbd1] flex flex-col items-center justify-center p-4 text-center">
                        <Sparkles size={32} className="text-[#ac2d00]/40 mb-2" />
                        <span className="font-serif font-bold text-sm text-[#ac2d00]">{item.name}</span>
                        <span className="text-[10px] text-[#5b4039] mt-1 uppercase tracking-wider">{item.category}</span>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {item.isSatvik && (
                      <span className="absolute top-3 left-3 bg-[#268451] text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        Satvik
                      </span>
                    )}

                    {item.isSpicy && (
                      <span className="absolute top-3 right-3 bg-[#ac2d00] text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Flame size={10} fill="currentColor" /> Spicy
                      </span>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-3.5 h-3.5 border border-[#2E8B57] p-0.5">
                            <span className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full"></span>
                          </span>
                          <span className="text-[10px] font-semibold text-gray-500">{item.category}</span>
                        </div>
                        {item.rating && (
                          <div className="flex items-center gap-1 text-[#fdc826] text-xs font-bold">
                            <Star size={12} fill="currentColor" /> {item.rating}
                          </div>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#261813] group-hover:text-[#ac2d00] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      
                      <p className="text-xs text-[#5b4039] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div 
                      className="flex items-center justify-between pt-4 mt-4 border-t border-[#e4beb4]/30"
                      onClick={(e) => e.stopPropagation()} // Prevent clicking parent modal trigger
                    >
                      <span className="font-serif font-extrabold text-lg text-[#ac2d00]">₹{item.price}</span>

                      {qty > 0 ? (
                        <div className="flex items-center gap-3 bg-[#ffe9e2] border border-[#ac2d00]/30 px-3 py-1.5 rounded-full shadow-sm">
                          <button 
                            onClick={() => onRemoveFromCart(item)}
                            className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                            title="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="font-bold text-xs text-[#261813] w-4 text-center">{qty}</span>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                            title="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => onAddToCart(item)}
                          className="bg-white border-2 border-[#ac2d00] text-[#ac2d00] hover:bg-[#ac2d00] hover:text-white px-4 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm"
                        >
                          ADD
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e4beb4] max-w-lg mx-auto">
            <SlidersHorizontal size={40} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-lg text-[#261813]">No dishes matched your filters</h3>
            <p className="text-xs text-[#5b4039] mt-2 max-w-xs mx-auto">
              Try choosing a different category, turning off the Satvik filter, or clearing your text search.
            </p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSatvikOnly(false);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#ac2d00] text-white rounded-xl text-xs font-semibold hover:bg-[#d63c05]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#e4beb4] relative animate-scale-up text-left"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 bg-gray-100">
              {selectedItem.image ? (
                <img 
                  className="w-full h-full object-cover" 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#ffe9e2] flex flex-col items-center justify-center p-4 text-center">
                  <Sparkles size={48} className="text-[#ac2d00]/30 mb-2" />
                  <span className="font-serif font-bold text-lg text-[#ac2d00]">{selectedItem.name}</span>
                </div>
              )}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/40 text-white hover:bg-black/60 p-2 rounded-full transition-all"
                title="Close modal"
              >
                <Plus className="rotate-45" size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-xs text-[#268451] font-semibold">
                    <span className="flex items-center justify-center w-3.5 h-3.5 border border-[#2E8B57] p-0.5">
                      <span className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full"></span>
                    </span>
                    Pure Veg
                  </span>
                  {selectedItem.rating && (
                    <div className="flex items-center gap-1 text-[#fdc826] text-sm font-bold">
                      <Star size={14} fill="currentColor" /> {selectedItem.rating} ({selectedItem.reviewsCount} reviews)
                    </div>
                  )}
                </div>

                <h2 className="font-serif font-bold text-2xl text-[#261813] leading-snug">
                  {selectedItem.name}
                </h2>
                
                <p className="text-xs sm:text-sm text-[#5b4039] leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Special Instructions Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#261813] uppercase tracking-wider">
                  Special Instructions / Customs:
                </label>
                <textarea 
                  placeholder="E.g., No spicy, extra butter, don't add green chillies..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full border border-[#e4beb4] rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813] resize-none h-20"
                />
              </div>

              {/* Order Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e4beb4]/40">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#5b4039] uppercase font-bold tracking-wider block">Price</span>
                  <span className="font-serif font-extrabold text-2xl text-[#ac2d00]">₹{selectedItem.price * modalQuantity}</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-4 bg-[#fff8f6] border border-[#e4beb4] rounded-2xl p-1 px-3">
                    <button 
                      onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                      className="p-1 text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="font-bold text-base text-[#261813] w-5 text-center">{modalQuantity}</span>
                    <button 
                      onClick={() => setModalQuantity(prev => prev + 1)}
                      className="p-1 text-[#ac2d00] hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  <button 
                    onClick={handleModalAdd}
                    className="bg-[#ac2d00] hover:bg-[#d63c05] text-[#ffffff] px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md"
                  >
                    Confirm & Add
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
