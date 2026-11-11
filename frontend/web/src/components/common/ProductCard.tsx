import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SockItem } from '../../types';
import { Plus, Check, Star } from 'lucide-react';

interface ProductCardProps {
  sock: SockItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ sock }) => {
  const { openProductModal, addToCart } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(sock, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      onClick={() => openProductModal(sock)}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-[#E8E6DF] overflow-hidden hover:border-[#D5D2C8] hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#F4F3EE] overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <img
            src={sock.imageUrl}
            alt={sock.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F5EFEB] to-[#EAE4DC] flex flex-col items-center justify-center p-3 text-center text-[#8B8579]">
            <span className="font-display text-xs font-semibold text-[#1E293B]">{sock.name}</span>
          </div>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer ${
              justAdded
                ? 'bg-[#10B981] text-white'
                : 'bg-white/95 text-[#1E293B] hover:bg-[#FF6B4A] hover:text-white backdrop-blur-xs'
            }`}
            title="Quick add to cart"
            aria-label={`Add ${sock.name} to cart`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#8B8579] mb-1 font-medium truncate">
            <span className="capitalize">{sock.tags[0] || 'cotton'}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-600">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 stroke-amber-500" />
              <span>{sock.rating}</span>
            </span>
          </div>

          <h3 className="font-display font-bold text-xs sm:text-base text-[#1E293B] group-hover:text-[#FF6B4A] transition-colors line-clamp-1">
            {sock.name}
          </h3>

          <p className="hidden sm:block text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
            {sock.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#F1EFEA] flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-extrabold text-sm sm:text-lg text-[#1E293B] tabular-nums">
              ${sock.price.toFixed(2)}
            </span>
          </div>

          <span className="text-[10px] sm:text-xs font-semibold text-[#FF6B4A] group-hover:underline">
            Quick View →
          </span>
        </div>
      </div>
    </div>
  );
};
