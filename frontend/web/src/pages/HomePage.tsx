import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { HERO_IMAGE } from '../data/mockData';
import { SockItem } from '../types';
import { ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { socks, navigate, setSelectedTag } = useApp();

  const featuredSocks = socks.slice(0, 4);

  const handleTagJump = (tag: string) => {
    setSelectedTag(tag);
    navigate('/catalogue');
  };

  return (
    <div className="space-y-10 sm:space-y-20 pb-8 sm:pb-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F5F0] to-[#FBFBFA] pt-4 sm:pt-14 pb-8 sm:pb-12 border-b border-[#E8E6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left copy */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF5F2] border border-[#FFD9CF] text-[#E8502E] text-[11px] sm:text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-[#FF6B4A]" />
                <span>Sock Shop 2026 Redesign</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1E293B] tracking-tight leading-[1.2] text-balance">
                Socks that weave <span className="text-[#FF6B4A]">joy & comfort</span> into every step.
              </h1>

              <p className="text-xs sm:text-base text-[#475569] leading-relaxed max-w-xl">
                Friendly, playful, and crafted from 100% combed organic cotton. Seamless hand-linked toes and all-day arch cushion for developers, dreamers, and everyday explorers.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  onClick={() => navigate('/catalogue')}
                  className="flex-1 sm:flex-initial px-5 py-3 bg-[#FF6B4A] hover:bg-[#E8502E] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Shop Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleTagJump('magic')}
                  className="flex-1 sm:flex-initial px-4 py-3 bg-white hover:bg-[#F3F1EC] text-[#1E293B] font-semibold text-xs sm:text-sm rounded-xl border border-[#D5D2C8] transition-colors cursor-pointer text-center"
                >
                  Magic Collection
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-3 grid grid-cols-3 gap-2 text-[10px] sm:text-xs text-[#64748B] font-medium border-t border-[#E8E6DF]/80">
                <div className="flex items-center gap-1">
                  <Feather className="w-3.5 h-3.5 text-[#FF6B4A] shrink-0" />
                  <span className="truncate">Soft Cotton</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B4A] shrink-0" />
                  <span className="truncate">Free Ship $40+</span>
                </div>
                <div className="flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#FF6B4A] shrink-0" />
                  <span className="truncate">30-Day Exch.</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative mt-2 sm:mt-0">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white aspect-16/10 group">
                <img
                  src={HERO_IMAGE}
                  alt="Playful colorful cotton socks neatly organized"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6">
                  <div className="text-white">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#FF6B4A] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                      Seasonal Knits
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-lg mt-1">Joyful Everyday Weave</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swipeable Tag Filter Strip for Mobile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E8E6DF]">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#FF6B4A]">
              Curated by Mood & Style
            </span>
            <button
              onClick={() => navigate('/catalogue')}
              className="text-[11px] font-semibold text-[#FF6B4A] hover:underline"
            >
              All →
            </button>
          </div>

          {/* Horizontally scrollable strip on mobile, wraps nicely on desktop */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin -mx-1 px-1">
            {[
              { label: 'All', tag: 'all' },
              { label: 'Magic', tag: 'magic' },
              { label: 'Blue', tag: 'blue' },
              { label: 'Brown & Amber', tag: 'brown' },
              { label: 'Green & Sage', tag: 'green' },
              { label: 'Formal Argyle', tag: 'formal' },
              { label: 'SuperSport', tag: 'sport' },
              { label: 'Stripes', tag: 'stripes' },
            ].map((item) => (
              <button
                key={item.tag}
                onClick={() => handleTagJump(item.tag)}
                className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-[#FF6B4A] hover:text-white text-[#334155] border border-[#E8E6DF] rounded-xl transition-all shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Socks Grid (2 Columns on Mobile, 4 Columns on Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#FF6B4A]">
              Signature Best-Sellers
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-3xl text-[#1E293B]">
              Top Picks from the Weave
            </h2>
          </div>
          <button
            onClick={() => navigate('/catalogue')}
            className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({socks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredSocks.map((sock: SockItem) => (
            <ProductCard key={sock.id} sock={sock} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E293B] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="text-[10px] font-bold text-[#FF6B4A] uppercase tracking-wider">
              Microservices Demo · 2026 Storefront
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Built on clean APIs, engineered for joyful footsteps.
            </h3>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              WeaveSocks provides an ultra-clean, modern shopping experience with single-page checkout, instant cart updates, and mobile-first responsive controls.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigate('/catalogue')}
                className="px-4 py-2.5 bg-[#FF6B4A] hover:bg-[#E8502E] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Browse All Socks
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
