import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageSquare, Phone, MapPin, Navigation, Clock, ChevronRight, ShoppingBag, ArrowLeft, Send } from 'lucide-react';
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
  const [currentStep, setCurrentStep] = useState(0); // 0: Placed, 1: Preparing, 2: Out for Delivery, 3: Delivered
  const [timerCount, setTimerCount] = useState(35); // Estimated delivery countdown minutes
  
  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'rider', text: 'Namaste! I am Ramesh Kumar, your delivery partner. I am heading to Shri Ram Dhaba to pick up your hot order. 🙏', time: 'Just now' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRiderTyping, setIsRiderTyping] = useState(false);

  // Auto-advance order status stepper every 20 seconds for simulation,
  // or user can manually trigger state updates
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) {
          // Send simulated chat message updates as status changes!
          const next = prev + 1;
          setTimeout(() => {
            if (next === 1) {
              addRiderMessage("The chef has started preparing your fresh meals with Desi ghee. It will be packed shortly! 👨‍🍳");
            } else if (next === 2) {
              addRiderMessage("I have picked up your hot food package. Heading towards your delivery address now! 🏍️");
            } else if (next === 3) {
              addRiderMessage("I have arrived at your location. Please collect your delicious hot meal! Enjoy! 😊🍽️");
              setTimerCount(0);
            }
          }, 1000);
          return next;
        }
        return prev;
      });
    }, 20000); // 20s per step

    return () => clearInterval(statusInterval);
  }, []);

  // Countdown clock simulation
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimerCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Reduce minute every real minute
    return () => clearInterval(countdown);
  }, []);

  const addRiderMessage = (text: string) => {
    setChatMessages((prev) => [
      ...prev,
      { sender: 'rider', text, time: 'Just now' }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = inputMessage;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' }
    ]);
    setInputMessage('');

    // Trigger realistic simulated typing and response
    setIsRiderTyping(true);
    setTimeout(() => {
      setIsRiderTyping(false);
      let replyText = "Yes sir, copy that! On my way.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('where') || lower.includes('location') || lower.includes('reach')) {
        if (currentStep === 0) {
          replyText = "Waiting at the dhaba counter while chef prepares your order. Will depart soon!";
        } else if (currentStep === 1) {
          replyText = "The order is still preparing in the oven. I will pick it up and head over in 5 minutes!";
        } else if (currentStep === 2) {
          replyText = "I am currently passing near the Sanskriti main road, reaching your gate in 2-3 minutes!";
        } else {
          replyText = "I am already at your gate sir! Please step outside or check the desk.";
        }
      } else if (lower.includes('hot') || lower.includes('fresh')) {
        replyText = "Absolutely! Your thali is packed in an insulated thermal carrier. It will arrive piping hot.";
      } else if (lower.includes('call') || lower.includes('number')) {
        replyText = "Sure, you can call my mobile number at +91 90123-45678. I am driving safely.";
      } else if (lower.includes('gate') || lower.includes('room') || lower.includes('deliver')) {
        replyText = "Understood! I will deliver exactly as per your instructions. Thank you.";
      } else if (lower.includes('thank') || lower.includes('thanks')) {
        replyText = "You are very welcome! Serving you is our pleasure. Have a blessed day! 🙏";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'rider', text: replyText, time: 'Just now' }
      ]);
    }, 1500);
  };

  // Stepper elements definitions
  const steps = [
    { title: 'Order Confirmed', desc: 'Received at 10:14 AM' },
    { title: 'Preparing in Kitchen', desc: 'Simmering black lentils & baking rotis' },
    { title: 'Out for Delivery', desc: 'Rider Ramesh Kumar dispatched' },
    { title: 'Delivered Successfully', desc: 'Savor your authentic meals!' }
  ];

  // Map progress representation calculations (mock motorcycle moving across screen)
  const mapMotorcyclePosition = currentStep === 0 
    ? 'left-[10%] top-[80%]' 
    : currentStep === 1 
    ? 'left-[30%] top-[50%]' 
    : currentStep === 2 
    ? 'left-[65%] top-[25%]' 
    : 'left-[88%] top-[12%]';

  const handleBackToHome = () => {
    onResetOrder();
    setView('home');
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[1200px] mx-auto text-left min-h-screen" id="order-tracking-page">
      
      {/* Header Banner Success */}
      <div className="bg-[#268451] text-white p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-full">
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl">Order Placed Successfully!</h1>
            <p className="text-xs text-green-100 mt-1">Thank you for ordering from Shri Ram Dhaba</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs text-green-100">Order ID</div>
          <div className="font-mono font-bold text-lg sm:text-xl">#{order?.id || 'SRD-89024'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Delivery Route Map & Stepper status */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Animated 3D Isometric Route Map Visualizer */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden relative space-y-4">
            <div className="flex justify-between items-center border-b border-[#e4beb4]/30 pb-3">
              <div className="flex items-center gap-2">
                <Navigation size={18} className="text-[#ac2d00] animate-bounce" />
                <span className="font-serif font-bold text-base text-[#261813]">Live Delivery Route</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-[#268451] font-semibold">Simulated GPS Live</span>
              </div>
            </div>

            {/* Map Canvas Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[16/9] sm:h-80">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQmPm8yb0lgYtcEe87PjXJY-ibWJmxKnQmoPE3CRWmvB5ujHZsNfinqpep9W7wA9ATJ1goweTwhPSc7gfxsfeUoyJbZlVnVagB7fmJuJyGjTe1bOSNB4FkUfGzAJzb2ziikaVpq3JihsRCheFj29p23xWZrRtFvstgH65oU9Ki4aOqo4bZH6iL24dD9KyDiruciPeXYjiauLtsSOCjIaWTbFU4BgqUAiRg2DGahgAI9cZ9wC5iRn5j1UVm0ooQhHkuKzd9ZBMB2M7Z" 
                alt="Delivery Isometric Map Representation"
                className="w-full h-full object-cover filter saturate-125"
                referrerPolicy="no-referrer"
              />

              {/* Draw an elegant overlay dotted path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 60,250 C 120,220 180,180 250,150 S 400,100 500,60" 
                  fill="none" 
                  stroke="#ac2d00" 
                  strokeWidth="3" 
                  strokeDasharray="6,4" 
                  className="animate-[dash_10s_linear_infinite]"
                  style={{ strokeDashoffset: -20 }}
                />
              </svg>

              {/* Floating Dhaba Marker Left */}
              <div className="absolute left-[10%] top-[70%] bg-[#ac2d00] text-white p-1.5 sm:p-2 rounded-xl shadow-lg border border-white text-center transform -translate-x-1/2">
                <span className="text-[10px] sm:text-xs font-bold font-serif whitespace-nowrap block">श्री राम ढाबा</span>
              </div>

              {/* Floating Rider Motorbike Icon */}
              <div className={`absolute ${mapMotorcyclePosition} transition-all duration-1000 ease-out transform -translate-x-1/2 -translate-y-1/2 z-20`}>
                <div className="bg-[#fdc826] border-2 border-white p-2 rounded-full shadow-xl flex items-center justify-center animate-bounce">
                  <span className="text-base sm:text-lg">🏍️</span>
                </div>
              </div>

              {/* Floating Customer Location Marker Right */}
              <div className="absolute left-[85%] top-[18%] bg-[#268451] text-white p-1.5 sm:p-2 rounded-xl shadow-lg border border-white text-center transform -translate-x-1/2">
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap block flex items-center gap-1">
                  <MapPin size={10} /> You
                </span>
              </div>
            </div>

            {/* Quick Speed Simulator control (Useful & fun additions) */}
            <div className="flex justify-between items-center bg-[#fff8f6] p-3 rounded-xl border border-[#e4beb4]/50">
              <span className="text-xs text-[#5b4039] font-medium">Want to fast-forward the delivery simulation?</span>
              <button 
                onClick={() => {
                  setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
                  setTimeout(() => {
                    const next = currentStep + 1;
                    if (next === 1) {
                      addRiderMessage("The chef has started preparing your fresh meals with Desi ghee. It will be packed shortly! 👨‍🍳");
                    } else if (next === 2) {
                      addRiderMessage("I have picked up your hot food package. Heading towards your delivery address now! 🏍️");
                    } else if (next === 3) {
                      addRiderMessage("I have arrived at your location. Please collect your delicious hot meal! Enjoy! 😊🍽️");
                      setTimerCount(0);
                    }
                  }, 100);
                }}
                disabled={currentStep === 3}
                className="px-3.5 py-1.5 bg-[#ac2d00]/10 hover:bg-[#ac2d00] text-[#ac2d00] hover:text-white disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg text-xs font-bold transition-all"
              >
                {currentStep === 3 ? 'Completed' : 'Fast-Forward ⚡'}
              </button>
            </div>

          </div>

          {/* Realistic Stepper tracking status */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#261813] border-b border-[#e4beb4]/30 pb-4">
              Preparation & Delivery Progress
            </h2>

            <div className="relative pl-6 space-y-8">
              {/* Stepper bar connector line */}
              <div className="absolute top-2.5 left-[11px] bottom-2.5 w-0.5 bg-gray-200" />
              <div 
                className="absolute top-2.5 left-[11px] w-0.5 bg-[#268451] transition-all duration-500" 
                style={{ height: `${(currentStep / 3) * 100}%`, maxHeight: '100%' }}
              />

              {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                return (
                  <div key={idx} className="relative flex gap-5 items-start">
                    
                    {/* Circle Dot Badge */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors ${
                      isCompleted 
                        ? 'bg-[#268451] text-white' 
                        : isActive 
                        ? 'bg-[#fdc826] text-[#765a00] ring-4 ring-[#ffdf95]/40' 
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 size={14} fill="currentColor" className="text-white bg-[#268451] rounded-full" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step details */}
                    <div className="space-y-0.5 text-left">
                      <h3 className={`font-bold text-sm sm:text-base ${
                        isActive ? 'text-[#ac2d00]' : isCompleted ? 'text-[#268451]' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs ${isActive ? 'text-[#5b4039] font-medium' : 'text-gray-400'}`}>
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column Rider Partner details & Simulated Chat */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Rider profile banner card */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ac2d00] to-[#fdc826] border-2 border-white shadow-md flex items-center justify-center font-bold text-xl text-white">
                RK
              </div>
              <div className="flex-1 text-left">
                <span className="text-[10px] bg-[#fdc826]/20 text-[#765a00] font-bold px-2 py-0.5 rounded-full">
                  Delivery Valet Assigned
                </span>
                <h3 className="font-bold text-base text-[#261813] mt-1">Ramesh Kumar</h3>
                <p className="text-xs text-gray-500">Contact: +91 90123-45678 • Star rating 4.9⭐</p>
              </div>
              <a 
                href="tel:+919012345678"
                className="p-3 bg-[#ffe9e2] hover:bg-[#ffdbd1] text-[#ac2d00] rounded-full transition-colors active:scale-95"
                title="Call Delivery Partner"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Floating countdown time estimation */}
            <div className="bg-[#fff1ec] p-4 rounded-2xl flex items-center gap-3.5 border border-[#e4beb4]/30">
              <Clock className="text-[#ac2d00] flex-shrink-0 animate-pulse" size={20} />
              <div className="text-left space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#5b4039] tracking-wider">Estimated Arrival</span>
                <p className="font-serif font-extrabold text-[#ac2d00] text-lg">
                  {timerCount > 0 ? `${timerCount} Minutes Remaining` : 'Arrived at door!'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Chat Simulator */}
          <div className="bg-white border border-[#e4beb4] rounded-3xl shadow-sm flex flex-col h-[350px] overflow-hidden">
            
            {/* Chat header banner */}
            <div className="p-4 bg-[#ffe9e2] border-b border-[#e4beb4] flex items-center gap-2.5">
              <MessageSquare size={16} className="text-[#ac2d00]" />
              <span className="font-bold text-xs sm:text-sm text-[#261813]">Chat with Ramesh Kumar</span>
            </div>

            {/* Message streams panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-slate-50/50">
              {chatMessages.map((msg, idx) => {
                const isRider = msg.sender === 'rider';
                return (
                  <div 
                    key={idx}
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-sm leading-relaxed ${
                      isRider 
                        ? 'bg-white border border-[#e4beb4]/40 self-start text-[#261813]' 
                        : 'bg-[#ac2d00] text-white self-end'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1.5 ${isRider ? 'text-gray-400' : 'text-red-200'}`}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {isRiderTyping && (
                <div className="bg-white border border-[#e4beb4]/40 rounded-2xl p-3 text-xs text-gray-500 self-start animate-pulse">
                  Ramesh is typing...
                </div>
              )}
            </div>

            {/* Message input footer form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#e4beb4] bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Type instructions, e.g., Leave with gatekeeper..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-[#fff8f6] border border-[#e4beb4] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#261813] focus:outline-none focus:ring-1 focus:ring-[#ac2d00]"
              />
              <button 
                type="submit"
                className="p-3 bg-[#ac2d00] hover:bg-[#d63c05] text-white rounded-xl transition-all active:scale-95 flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </form>

          </div>

          {/* Quick return back home controls */}
          <button 
            onClick={handleBackToHome}
            className="w-full py-4 border-2 border-dashed border-[#ac2d00] text-[#ac2d00] font-bold rounded-2xl text-sm sm:text-base transition-all hover:bg-[#fff1ec] active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Return to Main Menu</span>
          </button>

        </div>

      </div>

    </div>
  );
}
