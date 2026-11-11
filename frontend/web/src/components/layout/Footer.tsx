import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, ShieldCheck, Heart, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#18202F] text-[#94A3B8] border-t border-[#334155] mt-16 sm:mt-24">
      {/* Trust & Craftsmanship strip */}
      <div className="border-b border-[#253248] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#253248] flex items-center justify-center text-[#FF6B4A] shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">Free Express Shipping</h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">On all orders over $40.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#253248] flex items-center justify-center text-[#FF6B4A] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">30-Day Happiness</h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Hassle-free size exchanges.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#253248] flex items-center justify-center text-[#FF6B4A] shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">Organic Combed Cotton</h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Hand-linked seamless toe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#253248] flex items-center justify-center text-[#FF6B4A] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">Sock Shop Microservices</h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Standard API compatible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B4A] flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 2H8C6.89543 2 6 2.89543 6 4V13C6 14.1046 6.89543 15 8 15H11.5L16.2 19.7C17.4 20.9 19.4 20.9 20.6 19.7C21.8 18.5 21.8 16.5 20.6 15.3L16 10.7V4C16 2.89543 15.1046 2 14 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-white">WeaveSocks</span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Friendly, playful sock brand storefront for modern web and mobile. Designed for all-day comfort and joyful footsteps.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-3">Shop</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  All Socks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Magic Knits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Athletic SuperSport
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs tracking-wider uppercase mb-3">Orders & Account</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/cart')} className="hover:text-white transition-colors cursor-pointer">
                  Shopping Cart
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/orders')} className="hover:text-white transition-colors cursor-pointer">
                  Past Orders
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#253248] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
          <p>© 2026 WeaveSocks Storefront Redesign.</p>
          <span>React SPA Architecture</span>
        </div>
      </div>
    </footer>
  );
};
