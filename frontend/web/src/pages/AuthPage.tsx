import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, navigate } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim()) {
      setError('Please provide your username');
      return;
    }
    const ok = login(username, password);
    if (ok) {
      navigate('/cart');
    } else {
      setError('Invalid username or credentials.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !email.trim()) {
      setError('Username and email are required');
      return;
    }
    const ok = register({ username, email, firstName, lastName, password });
    if (ok) {
      navigate('/cart');
    } else {
      setError('Registration failed. Please check form inputs.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E8E6DF] p-6 sm:p-8 shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B4A] text-white mx-auto flex items-center justify-center mb-3 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H8C6.89543 2 6 2.89543 6 4V13C6 14.1046 6.89543 15 8 15H11.5L16.2 19.7C17.4 20.9 19.4 20.9 20.6 19.7C21.8 18.5 21.8 16.5 20.6 15.3L16 10.7V4C16 2.89543 15.1046 2 14 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#1E293B]">
            {mode === 'login' ? 'Sign In to WeaveSocks' : 'Create Customer Account'}
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Access your orders, saved addresses, and speedy 1-click checkout.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="flex bg-[#F3F1EC] p-1 rounded-xl mb-6">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'register' ? 'bg-white text-[#1E293B] shadow-xs' : 'text-[#64748B]'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. eve_devops"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6B4A] hover:bg-[#E8502E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
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
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
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
                  required
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6B4A] hover:bg-[#E8502E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
