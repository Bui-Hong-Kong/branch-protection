import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, User as UserIcon, Menu, X, ArrowRight, Package } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    cartCount,
    user,
    setAuthModal,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E8E6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-14 sm:h-18">
            {/* Zone 1: Brand wordmark */}
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF6B4A] flex items-center justify-center text-white shadow-xs shadow-[#FF6B4A]/25 transition-transform group-hover:scale-105 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 2H8C6.89543 2 6 2.89543 6 4V13C6 14.1046 6.89543 15 8 15H11.5L16.2 19.7C17.4 20.9 19.4 20.9 20.6 19.7C21.8 18.5 21.8 16.5 20.6 15.3L16 10.7V4C16 2.89543 15.1046 2 14 2Z"
                    fill="currentColor"
                  />
                  <circle cx="10" cy="6" r="1.5" fill="#FBFBFA" />
                  <circle cx="12" cy="10" r="1.5" fill="#FBFBFA" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#1E293B] group-hover:text-[#FF6B4A] transition-colors whitespace-nowrap shrink-0">
                  WeaveSocks
                </span>
                <span className="hidden sm:inline text-[9px] tracking-wider uppercase font-semibold text-[#8B8579] -mt-0.5">
                  Sock Shop
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
              <button
                onClick={() => navigate('/')}
                className={`hover:text-[#FF6B4A] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPath === '/' ? 'text-[#FF6B4A] font-semibold' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/catalogue')}
                className={`hover:text-[#FF6B4A] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPath.startsWith('/catalogue') ? 'text-[#FF6B4A] font-semibold' : ''
                }`}
              >
                Catalogue
              </button>
              <button
                onClick={() => navigate('/orders')}
                className={`hover:text-[#FF6B4A] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPath.startsWith('/orders') ? 'text-[#FF6B4A] font-semibold' : ''
                }`}
              >
                Past Orders
              </button>
            </nav>

            {/* Zone 3: Actions (Cart & Auth) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* User Auth (Desktop) */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => navigate('/orders')}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#334155] bg-[#F1EFEA] hover:bg-[#E8E6DF] rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center text-[10px] font-bold">
                      {user.firstName[0] || 'U'}
                    </div>
                    <span className="max-w-[90px] truncate">{user.firstName || user.username}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-xs text-[#8B8579] hover:text-[#DC2626] transition-colors px-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModal('login')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1E293B] hover:text-[#FF6B4A] transition-colors cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1E293B] hover:bg-[#0F172A] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF6B4A]" />
                <span className="hidden sm:inline font-medium text-slate-200">Cart</span>
                <span className="px-1.5 py-0.2 bg-[#FF6B4A] text-white text-[11px] font-bold rounded-full min-w-[20px] text-center tabular-nums">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#475569] hover:text-[#1E293B] hover:bg-[#F3F1EC] rounded-xl transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-[#E8E6DF] space-y-1 animate-fadeIn">
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                  currentPath === '/' ? 'bg-[#FFF5F2] text-[#FF6B4A] font-bold' : 'text-[#1E293B] hover:bg-[#F3F1EC]'
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#8B8579]" />
              </button>
              <button
                onClick={() => {
                  navigate('/catalogue');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                  currentPath.startsWith('/catalogue') ? 'bg-[#FFF5F2] text-[#FF6B4A] font-bold' : 'text-[#1E293B] hover:bg-[#F3F1EC]'
                }`}
              >
                <span>Catalogue & Socks</span>
                <ArrowRight className="w-4 h-4 text-[#8B8579]" />
              </button>
              <button
                onClick={() => {
                  navigate('/orders');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                  currentPath.startsWith('/orders') ? 'bg-[#FFF5F2] text-[#FF6B4A] font-bold' : 'text-[#1E293B] hover:bg-[#F3F1EC]'
                }`}
              >
                <span>Order History</span>
                <ArrowRight className="w-4 h-4 text-[#8B8579]" />
              </button>
              <button
                onClick={() => {
                  navigate('/cart');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                  currentPath.startsWith('/cart') ? 'bg-[#FFF5F2] text-[#FF6B4A] font-bold' : 'text-[#1E293B] hover:bg-[#F3F1EC]'
                }`}
              >
                <span>Cart & Checkout ({cartCount})</span>
                <ArrowRight className="w-4 h-4 text-[#8B8579]" />
              </button>

              {/* Mobile Auth row */}
              <div className="pt-2 mt-2 border-t border-[#E8E6DF] px-3.5">
                {user ? (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center text-xs font-bold">
                        {user.firstName[0] || 'U'}
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-[#1E293B]">{user.firstName} {user.lastName}</div>
                        <div className="text-[#8B8579]">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs font-semibold text-[#DC2626] hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModal('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center bg-[#1E293B] text-white text-xs font-bold rounded-xl"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modern Thumb-Friendly Mobile Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E6DF] px-4 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            currentPath === '/' ? 'text-[#FF6B4A]' : 'text-[#64748B]'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate('/catalogue')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            currentPath.startsWith('/catalogue') ? 'text-[#FF6B4A]' : 'text-[#64748B]'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
          <span>Catalogue</span>
        </button>

        <button
          onClick={() => navigate('/orders')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            currentPath.startsWith('/orders') ? 'text-[#FF6B4A]' : 'text-[#64748B]'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => navigate('/cart')}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            currentPath.startsWith('/cart') ? 'text-[#FF6B4A]' : 'text-[#64748B]'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 bg-[#FF6B4A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </>
  );
};
