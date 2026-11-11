import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { SockItem } from '../types';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
} from 'lucide-react';

interface ProductDetailPageProps {
  sockId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ sockId }) => {
  const { socks, getSockById, addToCart, navigate } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const sock = getSockById(sockId) || socks[0];

  const handleAddToCart = () => {
    addToCart(sock, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const relatedSocks = socks.filter((s: SockItem) => s.id !== sock.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-8 sm:space-y-12 animate-fadeIn pb-24 sm:pb-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/catalogue')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        <div className="text-xs text-[#8B8579] hidden sm:flex items-center gap-1.5">
          <span className="hover:text-[#1E293B] cursor-pointer" onClick={() => navigate('/')}>
            Home
          </span>
          <span>/</span>
          <span className="hover:text-[#1E293B] cursor-pointer" onClick={() => navigate('/catalogue')}>
            Catalogue
          </span>
          <span>/</span>
          <span className="text-[#1E293B] font-semibold">{sock.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Left: Gallery & Visual Asset */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-4/3 w-full bg-[#F5F4EE] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xs">
            <img
              src={sock.imageUrl}
              alt={sock.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#1E293B] shadow-2xs">
              Sock Shop Signature
            </div>
          </div>

          {/* Value callouts below photo */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#64748B]">
            <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF]">
              <span className="font-bold text-[#1E293B] text-[11px] block">Seamless Toe</span>
              <span className="text-[10px]">Zero friction</span>
            </div>
            <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF]">
              <span className="font-bold text-[#1E293B] text-[11px] block">Reinforced Heel</span>
              <span className="text-[10px]">2x durable</span>
            </div>
            <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF]">
              <span className="font-bold text-[#1E293B] text-[11px] block">Arch Support</span>
              <span className="text-[10px]">All-day stay</span>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E6DF] shadow-xs space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8B8579] font-medium mb-1.5">
              <span className="uppercase tracking-wider">{sock.tags.join(' · ')}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                <span>{sock.rating}</span>
                <span className="text-[#8B8579]">({sock.reviewCount})</span>
              </span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1E293B] tracking-tight">
              {sock.name}
            </h1>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#1E293B] tabular-nums">
                ${sock.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#8B8579]">/ pair</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-b border-[#F1EFEA] py-3">
            {sock.description}
          </p>

          {/* Availability */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#10B981] font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>In Stock — {sock.count} pairs ready</span>
            </div>
            <span className="text-[#8B8579]">Unisex Fit</span>
          </div>

          {/* Quantity Stepper & Add to Cart Action (Desktop) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D5D2C8] rounded-xl bg-[#FBFBFA] p-0.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs sm:text-sm text-[#1E293B] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(sock.count, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  addedAnimation
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#FF6B4A] hover:bg-[#E8502E] active:scale-98 text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? 'Added!' : `Add to Cart — $${(sock.price * quantity).toFixed(2)}`}</span>
              </button>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="w-full py-2.5 px-3 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center block"
            >
              Go to Cart & Checkout →
            </button>
          </div>

          {/* Specs Tab */}
          <div className="pt-2 text-xs">
            <div className="flex border-b border-[#E8E6DF] mb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1.5 px-2 font-semibold cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#FF6B4A] text-[#FF6B4A]'
                    : 'text-[#64748B]'
                }`}
              >
                Specs
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-1.5 px-2 font-semibold cursor-pointer ${
                  activeTab === 'materials'
                    ? 'border-b-2 border-[#FF6B4A] text-[#FF6B4A]'
                    : 'text-[#64748B]'
                }`}
              >
                Care
              </button>
            </div>
            <div className="text-[#64748B] leading-relaxed text-[11px] sm:text-xs">
              {activeTab === 'details' ? (
                <div>
                  <p><strong>Yarn:</strong> {sock.material}</p>
                  <p><strong>Origin:</strong> {sock.origin}</p>
                </div>
              ) : (
                <p>{sock.care}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Socks (2 columns on mobile, 4 on desktop) */}
      <section className="pt-6 border-t border-[#E8E6DF]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#1E293B]">
            You Might Also Like
          </h2>
          <button
            onClick={() => navigate('/catalogue')}
            className="text-xs font-semibold text-[#FF6B4A] hover:underline"
          >
            All socks →
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {relatedSocks.map((s: SockItem) => (
            <ProductCard key={s.id} sock={s} />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="sm:hidden fixed bottom-12 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8E6DF] p-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-[#8B8579] block">Price</span>
          <span className="font-display font-extrabold text-base text-[#1E293B] tabular-nums">
            ${(sock.price * quantity).toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs ${
            addedAnimation ? 'bg-[#10B981] text-white' : 'bg-[#FF6B4A] active:scale-95 text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{addedAnimation ? 'Added!' : 'Add to Cart'}</span>
        </button>

        <button
          onClick={() => navigate('/cart')}
          className="px-3 py-2.5 bg-[#1E293B] text-white rounded-xl text-xs font-semibold"
        >
          Cart
        </button>
      </div>
    </div>
  );
};
