import React, { useState, useEffect } from 'react';
import { ClipboardList, Search, ChevronLeft, User, Phone, MapPin, Package, IndianRupee, Lock, UserCircle, AlertCircle, Trash2, ChevronDown, Users, ShoppingCart, Mail, Calendar, RefreshCw } from 'lucide-react';
import { Order, User as UserType } from '../types';
import { api } from '../api';

interface AdminDashboardProps {
  orders: Order[];
  setView: (view: string) => void;
  onUpdateOrders: (orders: Order[]) => void;
}

export default function AdminDashboard({
  orders,
  setView,
  onUpdateOrders,
}: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'new' | 'completed' | 'users'>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState<string | null>(null);

  const [stats, setStats] = useState({ totalOrders: 0, todayOrders: 0, totalRevenue: 0, totalUsers: 0 });
  const [loadError, setLoadError] = useState('');

  // Check admin auth on mount
  useEffect(() => {
    api.adminMe().then(() => {
      setIsLoggedIn(true);
      loadDashboardData();
    }).catch(() => {
      setIsLoggedIn(false);
    }).finally(() => setChecking(false));
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoadError('');
      const [ordersData, usersData, statsData] = await Promise.all([
        api.adminGetOrders(statusFilter !== 'all' ? statusFilter : undefined),
        api.adminGetUsers(),
        api.adminGetStats(),
      ]);
      setOrdersList(ordersData);
      setUsers(usersData);
      setStats(statsData);
      onUpdateOrders(ordersData);
    } catch (err: any) {
      setLoadError(err.message || 'Failed to load data');
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn, statusFilter]);

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData();
    }
  }, [isLoggedIn, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await api.adminLogin({ username, password });
      setIsLoggedIn(true);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
      setUsername('');
      setPassword('');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await api.adminLogout(); } catch {}
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.adminUpdateOrderStatus(orderId, newStatus);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await api.adminDeleteOrder(orderId);
      setShowDeleteConfirm(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete order');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.adminDeleteUser(userId);
      setShowDeleteUserConfirm(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  // Loading state
  if (checking) {
    return (
      <div className="w-full bg-[#fff8f6] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#ac2d00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#5b4039]">Loading...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[400px] mx-auto text-center min-h-screen flex flex-col items-center justify-center" id="admin-login">
        
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#ac2d00] hover:text-[#d63c05] mb-8 hover:translate-x-[-2px] transition-all self-start"
        >
          <ChevronLeft size={18} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white border border-[#e4beb4] rounded-3xl p-8 shadow-sm w-full">
          
          <div className="w-16 h-16 bg-[#ac2d00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-[#ac2d00]" />
          </div>
          
          <h1 className="font-serif font-bold text-2xl text-[#261813] mb-2">Admin Login</h1>
          <p className="text-xs text-[#5b4039] mb-6">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
                Username
              </label>
              <div className="relative">
                <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5b4039] uppercase tracking-wider text-left">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6] text-[#261813]"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-xs text-red-600 font-semibold">{loginError}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#ac2d00] hover:bg-[#d63c05] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md disabled:opacity-50"
            >
              {loginLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  const filteredOrders = ordersList.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryDetails.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryDetails.mobile.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
           user.mobile.includes(userSearchQuery);
  });

  const newOrders = filteredOrders.filter(o => ['confirmed', 'preparing', 'out_for_delivery'].includes(o.status));
  const completedOrders = filteredOrders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  const getUserOrderCount = (userId: string) => {
    return ordersList.filter(order => order.userId === userId).length;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'preparing': return 'bg-yellow-100 text-yellow-700';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="w-full bg-[#fff8f6] py-10 px-4 sm:px-6 max-w-[1200px] mx-auto text-left min-h-screen" id="admin-dashboard">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#ac2d00] hover:text-[#d63c05] hover:translate-x-[-2px] transition-all"
        >
          <ChevronLeft size={18} />
          <span>Return to Site</span>
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={loadDashboardData}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#ffe9e2] text-[#5b4039] rounded-xl font-semibold text-xs transition-all border border-[#e4beb4]"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#ac2d00]/10 hover:bg-[#ac2d00] text-[#ac2d00] hover:text-white rounded-xl font-semibold text-xs transition-all border border-[#ac2d00]/30 hover:border-[#ac2d00]"
          >
            Logout
          </button>
        </div>
      </div>

      {loadError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-600 font-semibold">{loadError}</span>
        </div>
      )}

      {/* Title */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#261813]">Admin Dashboard</h1>
        <p className="text-sm text-[#5b4039] mt-1">Manage orders and users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ac2d00]/10 rounded-full flex items-center justify-center">
              <ClipboardList size={20} className="text-[#ac2d00]" />
            </div>
            <div>
              <p className="text-[10px] text-[#5b4039]">Total Orders</p>
              <p className="font-bold text-lg text-[#261813]">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#268451]/10 rounded-full flex items-center justify-center">
              <Package size={20} className="text-[#268451]" />
            </div>
            <div>
              <p className="text-[10px] text-[#5b4039]">Today's Orders</p>
              <p className="font-bold text-lg text-[#261813]">{stats.todayOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fdc826]/20 rounded-full flex items-center justify-center">
              <IndianRupee size={20} className="text-[#765a00]" />
            </div>
            <div>
              <p className="text-[10px] text-[#5b4039]">Revenue</p>
              <p className="font-bold text-lg text-[#261813]">₹{stats.totalRevenue}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6366f1]/10 rounded-full flex items-center justify-center">
              <Users size={20} className="text-[#6366f1]" />
            </div>
            <div>
              <p className="text-[10px] text-[#5b4039]">Users</p>
              <p className="font-bold text-lg text-[#261813]">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'new'
              ? 'bg-[#ac2d00] text-white shadow-md'
              : 'bg-white text-[#5b4039] border border-[#e4beb4] hover:bg-[#ffe9e2]'
          }`}
        >
          <ShoppingCart size={16} />
          New Orders ({newOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'completed'
              ? 'bg-[#268451] text-white shadow-md'
              : 'bg-white text-[#5b4039] border border-[#e4beb4] hover:bg-[#ffe9e2]'
          }`}
        >
          <Package size={16} />
          Completed ({completedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'users'
              ? 'bg-[#6366f1] text-white shadow-md'
              : 'bg-white text-[#5b4039] border border-[#e4beb4] hover:bg-[#ffe9e2]'
          }`}
        >
          <Users size={16} />
          Users ({stats.totalUsers})
        </button>
      </div>

      {/* Orders Tab */}
      {(activeTab === 'new' || activeTab === 'completed') && (
        <>
          <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by Order ID, Name, or Mobile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-[#e4beb4] rounded-xl text-sm font-semibold text-[#5b4039] focus:outline-none focus:ring-1 focus:ring-[#ac2d00] bg-[#fff8f6]"
              >
                <option value="all">All Status</option>
                {activeTab === 'new' && (
                  <>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {(activeTab === 'new' ? newOrders : completedOrders).length > 0 ? (
              (activeTab === 'new' ? newOrders : completedOrders).map((order) => (
                <div 
                  key={order.id}
                  className="bg-white border border-[#e4beb4] rounded-2xl overflow-hidden shadow-sm"
                >
                  <div 
                    className="p-4 sm:p-5 cursor-pointer hover:bg-[#fff8f6] transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ffe9e2] rounded-xl flex items-center justify-center">
                          <ClipboardList size={20} className="text-[#ac2d00]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#ac2d00]">#{order.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                          <p className="text-xs text-[#5b4039] mt-0.5">{order.deliveryDetails.fullName} • {order.deliveryDetails.mobile}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] text-[#5b4039] uppercase font-bold">Date & Time</p>
                          <p className="text-xs font-semibold text-[#261813]">{order.date} • {order.createdAt}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#5b4039] uppercase font-bold">Total</p>
                          <p className="font-bold text-lg text-[#ac2d00]">₹{order.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="border-t border-[#e4beb4] p-4 sm:p-5 bg-[#fff8f6] space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-bold text-sm text-[#261813] flex items-center gap-2">
                            <User size={14} className="text-[#ac2d00]" /> Delivery Details
                          </h4>
                          <div className="bg-white p-3 rounded-xl border border-[#e4beb4] space-y-1.5">
                            <p className="text-xs text-[#5b4039]"><span className="font-semibold">Name:</span> {order.deliveryDetails.fullName}</p>
                            <p className="text-xs text-[#5b4039] flex items-center gap-1"><Phone size={12} /> {order.deliveryDetails.mobile}</p>
                            <p className="text-xs text-[#5b4039] flex items-center gap-1"><MapPin size={12} /> {order.deliveryDetails.address}</p>
                            {order.deliveryDetails.landmark && (
                              <p className="text-xs text-[#5b4039]">Landmark: {order.deliveryDetails.landmark}</p>
                            )}
                            {order.deliveryDetails.instructions && (
                              <p className="text-xs text-[#765a00] italic">Instructions: {order.deliveryDetails.instructions}</p>
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
                                <span>Subtotal</span><span>₹{order.subtotal}</span>
                              </div>
                              <div className="flex justify-between text-xs text-[#5b4039]">
                                <span>Packing</span><span>₹{order.packingCharges}</span>
                              </div>
                              <div className="flex justify-between text-xs text-[#5b4039]">
                                <span>Delivery</span>
                                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-[#ac2d00] pt-1">
                                <span>Total</span><span>₹{order.total}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#e4beb4]/50">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#5b4039]">Update Status:</span>
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="appearance-none pl-4 pr-10 py-2 bg-white border border-[#e4beb4] rounded-xl text-xs font-semibold text-[#261813] focus:outline-none focus:ring-1 focus:ring-[#ac2d00] cursor-pointer"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="relative">
                          {showDeleteConfirm === order.id ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                              <span className="text-xs text-red-600 font-semibold">Delete order?</span>
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600"
                              >
                                Yes
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-300"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setShowDeleteConfirm(order.id)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#e4beb4]">
                <ClipboardList size={40} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg text-[#261813]">
                  {activeTab === 'new' ? 'No new orders' : 'No completed orders'}
                </h3>
                <p className="text-xs text-[#5b4039] mt-2">
                  {activeTab === 'new' ? 'New orders will appear here.' : 'Delivered and cancelled orders will appear here.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          <div className="bg-white border border-[#e4beb4] rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by Name, Email, or Mobile..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#e4beb4] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#6366f1] bg-[#fff8f6]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  className="bg-white border border-[#e4beb4] rounded-2xl overflow-hidden shadow-sm"
                >
                  <div 
                    className="p-4 sm:p-5 cursor-pointer hover:bg-[#fff8f6] transition-colors"
                    onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center">
                          <User size={20} className="text-[#6366f1]" />
                        </div>
                        <div>
                          <span className="font-bold text-base text-[#261813]">{user.name}</span>
                          <p className="text-xs text-[#5b4039] mt-0.5">{user.email} • {user.mobile}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] text-[#5b4039] uppercase font-bold">Orders</p>
                          <p className="font-bold text-lg text-[#6366f1]">{getUserOrderCount(user.id)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#5b4039] uppercase font-bold">Joined</p>
                          <p className="text-xs font-semibold text-[#261813]">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedUser === user.id && (
                    <div className="border-t border-[#e4beb4] p-4 sm:p-5 bg-[#fff8f6] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-bold text-sm text-[#261813] flex items-center gap-2">
                            <User size={14} className="text-[#6366f1]" /> Account Details
                          </h4>
                          <div className="bg-white p-3 rounded-xl border border-[#e4beb4] space-y-1.5">
                            <p className="text-xs text-[#5b4039]"><span className="font-semibold">User ID:</span> {user.id}</p>
                            <p className="text-xs text-[#5b4039]"><span className="font-semibold">Name:</span> {user.name}</p>
                            <p className="text-xs text-[#5b4039] flex items-center gap-1"><Mail size={12} /> {user.email}</p>
                            <p className="text-xs text-[#5b4039] flex items-center gap-1"><Phone size={12} /> {user.mobile}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-bold text-sm text-[#261813] flex items-center gap-2">
                            <Package size={14} className="text-[#6366f1]" /> User Orders ({getUserOrderCount(user.id)})
                          </h4>
                          <div className="bg-white p-3 rounded-xl border border-[#e4beb4] space-y-2 max-h-40 overflow-y-auto">
                            {ordersList.filter(order => order.userId === user.id).map((order) => (
                              <div key={order.id} className="flex justify-between items-center text-xs text-[#5b4039]">
                                <span className="font-mono">#{order.id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                                  {getStatusLabel(order.status)}
                                </span>
                                <span className="font-semibold">₹{order.total}</span>
                              </div>
                            ))}
                            {getUserOrderCount(user.id) === 0 && (
                              <p className="text-xs text-gray-400 text-center py-2">No orders yet</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-[#e4beb4]/50">
                        {showDeleteUserConfirm === user.id ? (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                            <span className="text-xs text-red-600 font-semibold">Delete user?</span>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600"
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setShowDeleteUserConfirm(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-300"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setShowDeleteUserConfirm(user.id)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold"
                          >
                            <Trash2 size={14} />
                            Delete User
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#e4beb4]">
                <Users size={40} className="text-gray-300 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg text-[#261813]">No users found</h3>
                <p className="text-xs text-[#5b4039] mt-2">Users will appear here when they register.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
