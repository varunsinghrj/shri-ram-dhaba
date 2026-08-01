import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleFooterNav = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#261813] text-[#ffe9e2] pt-16 pb-8 border-t border-[#ac2d00]/30 text-left relative overflow-hidden" id="contact">
      {/* Visual background circles */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#ac2d00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 -right-24 w-72 h-72 bg-[#fdc826]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        
        {/* Brand & Tagline Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img 
              alt="Shri Ram Dhaba Logo Footer" 
              className="h-10 w-10 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz4vTiszeuwYx5pZVUsHnqnkoZGsxkNLIUgFnQAtWQAsQBTvN9uZsuYoo8ew5rk_Gik5lQTMeHF5IGUu0pAPFDo2tm3fCBt6EfvYh-UI7BeYjb33zjdsP16bdA8aYEMzi67jGUsOPArZdsNPdE7nEoYvt3XPaVY6-HThHhhY45x-pQQ6zrOBuyBh4C7WAHrMyxiSql0wVl1r0qf0mxJdVU8_a47XNOR0akS2KFrBdT4GT0YSC1CAAWz4W63xMGuBHLZPPT89cl-6Lu"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#fdc826] font-serif leading-none">श्री राम ढाबा</span>
              <span className="text-[9px] tracking-widest text-[#fff8f6] opacity-75 uppercase font-semibold">Shri Ram Dhaba</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#ffe9e2]/80 leading-relaxed">
            Delivering authentic highway dhaba recipes, simmered slow on traditional brick ovens, directly to your doorstep in IIT Dhanwantri and Sanskriti.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-4 h-4 border border-[#2E8B57] p-0.5 bg-white rounded">
              <span className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full"></span>
            </span>
            <span className="text-[10px] uppercase font-bold text-green-300 tracking-wider">100% Pure Vegetarian</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#fdc826]">Quick Navigation</h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#ffe9e2]/80">
            <li>
              <button onClick={() => handleFooterNav('home')} className="hover:text-[#fdc826] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                <span>Home / Story</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleFooterNav('menu')} className="hover:text-[#fdc826] transition-colors flex items-center gap-1.5 group">
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                <span>Our Dishes Menu</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setView('home');
                  setTimeout(() => {
                    document.getElementById('thalis')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="hover:text-[#fdc826] transition-colors flex items-center gap-1.5 group"
              >
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                <span>Special Thalis</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setView('home');
                  setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="hover:text-[#fdc826] transition-colors flex items-center gap-1.5 group"
              >
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                <span>About Kitchen Heritage</span>
              </button>
            </li>

          </ul>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#fdc826]">Operating Hours</h3>
          <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#ffe9e2]/80 leading-relaxed">
            <Clock size={18} className="text-[#fdc826] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">We are Open Daily</p>
              <p className="text-[#ffe9e2]/70 mt-1">11:00 AM – 11:00 PM</p>
              <p className="text-[10px] text-yellow-400 mt-2 font-medium">No Holidays! Serving you fresh food 365 days a year.</p>
            </div>
          </div>
        </div>

        {/* Contact Info Col */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#fdc826]">Get In Touch</h3>
          <ul className="space-y-3.5 text-xs sm:text-sm text-[#ffe9e2]/80">
            <li className="flex gap-3 items-start">
              <MapPin size={18} className="text-[#fdc826] flex-shrink-0 mt-0.5" />
              <span>Opposite Sanskriti Vihar Main Gate, Dhanwantri Marg, IIT Campus, India</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={18} className="text-[#fdc826] flex-shrink-0" />
              <a href="tel:+919876543210" className="hover:text-[#fdc826] transition-colors font-semibold">
                +91 98765 43210
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={18} className="text-[#fdc826] flex-shrink-0" />
              <a href="mailto:orders@shriramdhaba.com" className="hover:text-[#fdc826] transition-colors">
                orders@shriramdhaba.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 mt-12 border-t border-[#ffe9e2]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#ffe9e2]/60 relative z-10">
        <p>© 2026 Shri Ram Dhaba. All traditional rights reserved.</p>
        <button 
          onClick={() => handleFooterNav('admin')}
          className="px-4 py-2 bg-[#ac2d00]/20 hover:bg-[#ac2d00] text-[#fdc826] hover:text-white rounded-lg font-semibold text-[10px] uppercase tracking-wider transition-all border border-[#ac2d00]/30 hover:border-[#ac2d00]"
        >
          🔐 Admin Panel
        </button>
      </div>
    </footer>
  );
}
