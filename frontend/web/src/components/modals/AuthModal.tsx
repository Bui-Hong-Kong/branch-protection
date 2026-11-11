import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModal, setAuthModal, login, register } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(authModal || 'login');

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync mode if authModal changes
  React.useEffect(() => {
    if (authModal) setMode(authModal);
  }, [authModal]);

  if (!authModal) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    login(username, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !email.trim()) {
      setError('Username and email are required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    register({ username, email, firstName, lastName, password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E8E6DF] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#F1EFEA] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B4A]">
              WeaveSocks Account
            </span>
            <h3 className="font-display font-bold text-xl text-[#1E293B]">
              {mode === 'login' ? 'Sign In to Your Account' : 'Create Sock Shop Account'}
            </h3>
          </div>
          <button
            onClick={() => setAuthModal(null)}
            className="p-1.5 text-[#8B8579] hover:text-[#1E293B] hover:bg-[#F3F1EC] rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4">
          <div className="flex bg-[#F3F1EC] p-1 rounded-xl">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'register' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              New Customer
            </button>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. eve_devops"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B4A]" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Eve"
                    className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Kubernetes"
                    className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="sockfan42"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eve@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#FF6B4A] hover:bg-[#E8502E] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
