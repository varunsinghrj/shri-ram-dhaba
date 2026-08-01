import React, { useState } from 'react';
import { ChevronLeft, UserCircle, Lock, Mail, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { api } from '../api';

interface UserProfileProps {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  setView: (view: string) => void;
}

export default function UserProfile({ currentUser, setCurrentUser, setView }: UserProfileProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const updated = await api.updateProfile({
        name,
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      setCurrentUser(updated);
      setSuccess('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[500px] mx-auto text-left min-h-screen" id="user-profile-page">
      
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
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#261813]">My Profile</h1>
        <p className="text-sm text-[#5b4039] mt-1">Manage your account details</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-[#e4beb4] rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e4beb4]/50">
          <div className="w-16 h-16 bg-[#ac2d00] rounded-full flex items-center justify-center">
            <UserCircle size={36} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-[#261813]">{currentUser.name}</h2>
            <p className="text-xs text-[#5b4039]">{currentUser.mobile}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          
          {/* Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
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

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
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

          {/* Mobile (read-only) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
              Mobile Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="tel"
                value={currentUser.mobile}
                readOnly
                className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-[#5b4039]">Mobile number cannot be changed</p>
          </div>

          {/* Change Password Section */}
          <div className="pt-4 border-t border-[#e4beb4]/50">
            <h3 className="font-bold text-sm text-[#261813] mb-3 flex items-center gap-2">
              <Lock size={14} className="text-[#ac2d00]" />
              Change Password
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    maxLength={100}
                    className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="password"
                    placeholder="Min 6 characters (leave blank to keep current)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    maxLength={100}
                    className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-xs text-red-600 font-semibold">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
              <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-xs text-green-600 font-semibold">{success}</span>
            </div>
          )}

          {/* Save Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ac2d00] hover:bg-[#d63c05] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

    </div>
  );
}
