import React, { useState } from 'react';
import { Leaf, Users, Shield, Heart, Star, ChevronLeft, ChevronRight, ShoppingCart, Truck, Utensils, Award, Clock } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS, TESTIMONIALS } from '../data';

interface LandingPageProps {
  setView: (view: string) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function LandingPage({ setView, onAddToCart }: LandingPageProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Get the 4 special thalis for the thali grid
  const specialThalis = MENU_ITEMS.filter(item => item.category === 'Thali').slice(0, 4);

  // Handle slide controls for testimonials
  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#fff8f6] text-[#261813]" id="landing-page-root">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#fff8f6] pt-10 pb-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">
          
          {/* Hero text */}
          <div className="space-y-6 sm:space-y-8 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdc826]/20 border border-[#fdc826] shadow-sm">
              <span className="flex items-center justify-center w-4 h-4 border border-[#2E8B57] p-0.5">
                <span className="w-2 h-2 bg-[#2E8B57] rounded-full"></span>
              </span>
              <span className="font-semibold text-xs sm:text-sm text-[#765a00] tracking-wide uppercase">Pure Vegetarian Heritage</span>
            </div>
            
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#261813] leading-tight">
              Authentic Indian Food, <br />
              <span className="text-[#ac2d00] italic">Made with Love</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#5b4039] max-w-lg leading-relaxed font-sans">
              Experience the timeless flavors of traditional Indian highway cuisine. From rich, velvety slow-cooked gravies to freshly baked breads, we bring the warmth and purity of a traditional kitchen straight to your plate.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setView('menu')}
                className="bg-[#ac2d00] hover:bg-[#d63c05] text-[#ffffff] px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 duration-200"
                id="hero-view-menu-btn"
              >
                Explore Full Menu
              </button>
              <button 
                onClick={() => {
                  setView('menu');
                  // Trigger a search or filter if desired
                }}
                className="bg-transparent border-2 border-[#ac2d00] hover:bg-[#ffdbd1] text-[#ac2d00] px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 duration-200"
                id="hero-todays-special-btn"
              >
                Today's Special
              </button>
            </div>
          </div>

          {/* Hero images (Bento style) */}
          <div className="relative">
            {/* Soft decorative blur background */}
            <div className="absolute -inset-10 bg-radial-gradient from-[#fdc826]/15 to-transparent blur-3xl z-0 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="pt-12">
                <div className="rounded-[40px] overflow-hidden shadow-2xl transform -rotate-3 border-4 border-white h-64 sm:h-72 hover:rotate-0 transition-transform duration-300">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Delicious Creamy Shahi Paneer" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-w9W4yD15WTlEDao1NmBHc4Jbl0EQf5RUBlxpKxAlGstcBZRV5rGbg4xxWzEg3s-yM46UkCHXw6CJoaRm-55CNvOzmdVdlIOM2SdvbBlWT0-rWi1Oiv6RbqYWS6hQzc5rft-K0Hl37SJN3j_ijQihcbk1_mZenolcQxbO18CZx3IRfh-oYzUy5Lcok9OsEg6LOSHxmTHppA9RjG6OuSz9uoXhrEOOaJ3lmbG4VFI9ivw6hfsMzK0n079Z7w9LF9wYRr2qqApZW0JN"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[40px] overflow-hidden shadow-2xl transform rotate-3 border-4 border-white h-72 sm:h-80 hover:rotate-0 transition-transform duration-300">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Slow Cooked Creamy Dal Makhani" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuGTIoNyAUQz9eDGoSRcQYYa3QOSIpfiM0G5FYhChvkC_nA4dTd4_xRt1dgCal9Wo2BP7CogQdQNkH6LruQj9I2QjYOcMtXUwTnvt122HJOaMtNKOIxJnJcq4FP8I-SCleClxTl_9STabgcBGj5XARkVz-4LHVqo9bNteZnS_6Yu71u7tXP5Ghb3W132_JAM4Ce2qJSYuU-gm_rSto8UsIzD7z0XentXZe9Sd_n0_58SK7zG88h1kItyBLc8jyY1m73LVOUL6_ApO"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-full overflow-hidden shadow-xl border-4 border-white h-40 w-40 sm:h-48 sm:w-48 mx-auto -mt-12 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Fresh Butter Naan basket" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgBliNNCdz-_8tfTicGqL5mamz8fe8cAWLw7lf_eGl4xGyXmYmcFMg_a7WXHXUtCatCB41sVooc8bELli6KBoFnmUMfXVCFHdPqzx06Tu7Mf0dEdLPzK1JIrJE0mdQEDwEGKTvwanqZxYE7-rS4W2u_HTZuFvI6py_hsspNoN-kSY5cmO9mvf2cc_xOP3tY6g6tX9BiZVEJul9kBV3mG9-eN1TyyyMv50ZQv-q0_4WHdUGKTKy7TsVJ28QOZ0O54WK4jzxa7jE5wbx"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Info Cards Section */}
      <section className="bg-[#fff8f6] py-10 relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e4beb4] shadow-sm hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-full bg-[#ac2d00]/10 flex items-center justify-center text-[#ac2d00] mb-4 group-hover:scale-110 transition-transform">
              <Truck size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#261813] mb-2">Free Local Delivery</h3>
            <p className="text-sm text-[#5b4039]">Available for orders over ₹200 in Dhanwantri & Sanskriti regions.</p>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e4beb4] shadow-sm hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-full bg-[#fdc826]/20 flex items-center justify-center text-[#765a00] mb-4 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#261813] mb-2">Student Special</h3>
            <p className="text-sm text-[#5b4039]">Hearty, wholesome, and extremely nutritious meals at just ₹199 with a valid ID.</p>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e4beb4] shadow-sm hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-full bg-[#268451]/10 flex items-center justify-center text-[#268451] mb-4 group-hover:scale-110 transition-transform">
              <Utensils size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#261813] mb-2">Freshly Prepared</h3>
            <p className="text-sm text-[#5b4039]">Every order is cooked fresh upon request using premium local farm produce.</p>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e4beb4] shadow-sm hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-full bg-[#ac2d00]/10 flex items-center justify-center text-[#ac2d00] mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#261813] mb-2">Multiple Options</h3>
            <p className="text-sm text-[#5b4039]">From quick Lite Thalis to decadent Maharaja platters, we have everything you crave.</p>
          </div>

        </div>
      </section>

      {/* Special Thalis Section */}
      <section className="py-16 bg-[#fff8f6]" id="thalis">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#261813] mb-4">Our Special Thalis</h2>
            <div className="w-24 h-1 bg-[#ac2d00] mx-auto rounded-full mb-4"></div>
            <p className="text-base sm:text-lg text-[#5b4039] max-w-2xl mx-auto font-sans">
              Complete, perfectly balanced traditional Indian meals served with the signature generous hospitality of a Dhaba.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialThalis.map((thali) => (
              <div 
                key={thali.id}
                className="bg-white rounded-2xl border border-[#e4beb4] overflow-hidden flex flex-col group h-full hover:shadow-xl transition-all duration-300 text-left"
                id={`thali-card-${thali.id}`}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={thali.name} 
                    src={thali.image}
                    referrerPolicy="no-referrer"
                  />
                  {thali.id === 'student-thali' && (
                    <span className="absolute top-4 left-4 bg-[#fdc826] text-[#6e5400] px-3 py-1 rounded-full font-bold text-xs shadow-md">
                      Best Value
                    </span>
                  )}
                  {thali.isBestseller && (
                    <span className="absolute top-4 right-4 bg-[#ac2d00] text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-serif font-bold text-lg text-[#261813] group-hover:text-[#ac2d00] transition-colors leading-tight">
                      {thali.name}
                    </h3>
                    <span className="font-bold text-lg text-[#ac2d00] whitespace-nowrap">₹{thali.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5b4039] flex-grow mb-6 leading-relaxed">
                    {thali.description}
                  </p>
                  <button 
                    onClick={() => onAddToCart(thali)}
                    className="w-full py-3 rounded-xl border-2 border-[#ac2d00] text-[#ac2d00] hover:bg-[#ac2d00] hover:text-white font-bold text-sm transition-all active:scale-95 shadow-sm duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-[#fff1ec] overflow-hidden" id="about">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative order-2 md:order-1">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#ac2d00]/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 border-8 border-white rounded-[50px] overflow-hidden shadow-2xl max-w-md mx-auto">
              <img 
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" 
                alt="Beautiful Shri Ram Dhaba Interior Warm Atmosphere" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC52lyIFs7ey95De_PX2EiAd9yq926p7Wx8IIQvMFCn4uthDfE9ddr8WM34UTiPE3XVmBXa9qu4KPa4fr8x2wYjDnTnjwrX81-kweI7fmUyek47gc73c_oyEgXbewB66le6xKIyLxwzsUIEnDfOwql1SMADTDvkoKmh6_H2aIYxRvbcC3-Ym94m21UpSpQyGaAfv9syZJBX9rIeStYp6a5TCrCAs-hkoIWc6OW_LnwZCD3cZqEU2APIYpxY7y9DD4i3FbxbuV989sXr"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-white p-6 rounded-2xl shadow-xl max-w-[180px] text-center border border-[#e4beb4] transform rotate-3">
              <div className="font-serif font-bold text-primary text-4xl text-[#ac2d00]">15+</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#5b4039] mt-1">Years of Authentic Taste</div>
            </div>
          </div>

          <div className="space-y-6 text-left order-1 md:order-2">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#261813]">
              Traditional Taste, <br />Served with Warmth
            </h2>
            <div className="w-20 h-1.5 bg-[#ac2d00] rounded-full"></div>
            
            <p className="text-base sm:text-lg text-[#5b4039] font-sans leading-relaxed">
              At Shri Ram Dhaba, we believe food is more than just sustenance—it is a journey back to our cultural roots. Founded on the principles of culinary purity and uncompromised taste, our kitchen meticulously follows authentic age-old recipes passed down through generations.
            </p>
            
            <p className="text-sm sm:text-base text-[#5b4039] font-sans leading-relaxed">
              Whether you are stopping by for a quick, filling lunch or bringing your entire family for a warm dinner feast, we ensure every recipe is crafted using only premium whole grains, pure dairy, hand-ground spices, and a healthy dash of love. Our singular mission is to serve Dhanwantri and Sanskriti communities with the sweet comfort of home, every day.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Leaf className="text-[#ac2d00] flex-shrink-0" size={20} />
                <span className="font-semibold text-sm text-[#261813]">Fresh Ingredients</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-[#ac2d00] flex-shrink-0" size={20} />
                <span className="font-semibold text-sm text-[#261813]">Family Owned</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-[#ac2d00] flex-shrink-0" size={20} />
                <span className="font-semibold text-sm text-[#261813]">Hygienic Prep</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-[#ac2d00] flex-shrink-0" size={20} />
                <span className="font-semibold text-sm text-[#261813]">Made with Love</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-[#fff8f6]" id="testimonials">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div className="text-left">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#261813]">What Our Guests Say</h2>
              <p className="text-base text-[#5b4039] mt-2">Authentic feedback from our most cherished patrons.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={prevReview}
                className="p-3 border border-[#ac2d00] text-[#ac2d00] rounded-full hover:bg-[#fff1ec] transition-all active:scale-95"
                title="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextReview}
                className="p-3 bg-[#ac2d00] text-white rounded-full hover:bg-[#d63c05] transition-all active:scale-95 shadow-md"
                title="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonial slider view (Responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => {
              // Highlight the middle one or active index in mobile view
              const isActive = idx === activeReviewIndex;
              return (
                <div 
                  key={testimonial.id}
                  className={`p-6 sm:p-8 rounded-[32px] space-y-4 transition-all duration-300 text-left flex flex-col justify-between border ${
                    isActive 
                      ? 'bg-[#ffe9e2] border-[#ac2d00] shadow-md scale-[1.02]' 
                      : 'bg-white border-[#e4beb4] shadow-sm hover:border-[#ac2d00]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex gap-1 text-[#fdc826]">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    
                    <p className="text-sm sm:text-base italic text-[#261813] leading-relaxed font-sans">
                      "{testimonial.review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-[#e4beb4]/40">
                    <div className={`w-12 h-12 rounded-full font-bold flex items-center justify-center text-sm shadow-inner ${testimonial.bgTheme}`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#261813] text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs text-[#5b4039] opacity-80">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
