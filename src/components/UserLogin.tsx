import React, { useState } from 'react';
import { ChevronLeft, UserCircle, Lock, Mail, Phone, AlertCircle, UserPlus } from 'lucide-react';
import { User } from '../types';
import { api } from '../api';

interface UserLoginProps {
  setView: (view: string) => void;
  onLogin: (user: User) => void;
}

export default function UserLogin({ setView, onLogin }: UserLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const cleanMobile = mobile.replace(/\s+/g, '');
        if (!cleanMobile) {
          setError('Mobile number is required');
          setLoading(false);
          return;
        }
        const data = await api.login({ mobile: cleanMobile, password });
        onLogin(data.user);
        setView('menu');
      } else {
        if (!name.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
          setError('All fields are required');
          setLoading(false);
          return;
        }
        if (!/^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ''))) {
          setError('Please enter a valid 10-digit mobile number');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const data = await api.register({ name, email, mobile: mobile.trim(), password });
        onLogin(data.user);
        setView('menu');
      }
    } catch (e: any) {
      // If login fails, try migrating old localStorage users
      if (isLogin && e.message?.includes('Invalid')) {
        try {
          const oldUsers = JSON.parse(localStorage.getItem('srd_users') || '[]');
          if (oldUsers.length > 0) {
            await api.migrateUsers(oldUsers);
            // Retry login after migration
            const retryData = await api.login({ mobile: mobile.replace(/\s+/g, ''), password });
            onLogin(retryData.user);
            setView('menu');
            localStorage.removeItem('srd_users');
            return;
          }
        } catch {}
      }
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[420px] mx-auto text-center min-h-screen flex flex-col items-center justify-center" id="user-login-page">
      
      {/* Back Button */}
      <button 
        onClick={() => setView('home')}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#ac2d00] hover:text-[#d63c05] mb-8 hover:translate-x-[-2px] transition-all self-start"
      >
        <ChevronLeft size={18} />
        <span>Back to Home</span>
      </button>

      {/* Login/Register Card */}
      <div className="bg-white border border-[#e4beb4] rounded-3xl p-8 shadow-sm w-full">
        
        {/* Icon */}
        <div className="w-16 h-16 bg-[#ac2d00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {isLogin ? <Lock size={32} className="text-[#ac2d00]" /> : <UserPlus size={32} className="text-[#ac2d00]" />}
        </div>
        
        <h1 className="font-serif font-bold text-2xl text-[#261813] mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h1>
        <p className="text-xs text-[#5b4039] mb-6">
          {isLogin ? 'Login with your mobile number' : 'Register to start ordering'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name (Register only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
                Full Name
              </label>
              <div className="relative">
                <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="E.g., Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                />
              </div>
            </div>
          )}

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
              Mobile Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="tel"
                placeholder="E.g., 9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
                className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
              />
            </div>
          </div>

          {/* Email (Register only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email"
                  placeholder="E.g., rajesh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password"
                placeholder={isLogin ? "Enter password" : "Min 6 characters"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
                className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-xs text-red-600 font-semibold">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ac2d00] hover:bg-[#d63c05] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 pt-4 border-t border-[#e4beb4]/50">
          <p className="text-xs text-[#5b4039]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setName('');
                setEmail('');
                setMobile('');
                setPassword('');
              }}
              className="ml-1 font-bold text-[#ac2d00] hover:text-[#d63c05] transition-colors"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

      </div>

    </div>
  );
}
