import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  CreditCard,
  ArrowRight,
  Check,
  Feather,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductModal, closeProductModal, addToCart, navigate } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Reset zoom & quantity when product changes
  React.useEffect(() => {
    setIsZoomed(false);
    setZoomCoords({ x: 50, y: 50 });
    setQuantity(1);
    setActiveTab('details');
  }, [selectedProductModal]);

  if (!selectedProductModal) return null;

  const handleAddToCart = () => {
    addToCart(selectedProductModal, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleCheckoutNow = () => {
    addToCart(selectedProductModal, quantity);
    closeProductModal();
    navigate('/cart');
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomCoords({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
      setZoomCoords({ x: 50, y: 50 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const itemTotal = (selectedProductModal.price * quantity).toFixed(2);

  return (
    <div
      onClick={closeProductModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[95vw] sm:w-[92vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8E6DF] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-7 py-3.5 border-b border-[#F1EFEA] flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FF6B4A]">
              Product Quick View
            </span>
            <span className="text-xs text-[#8B8579]">· Sock Shop</span>
          </div>
          <button
            onClick={closeProductModal}
            className="p-1.5 text-[#8B8579] hover:text-[#1E293B] rounded-xl hover:bg-[#F3F1EC] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Spacious, Harmonious Geometry on All Displays */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Left: Full-scale uncropped photo with hover zoom icon and press to zoom in/out */}
            <div
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
              className={`relative rounded-2xl overflow-hidden bg-[#F5F4EE] border border-[#E8E6DF] h-[280px] sm:h-full sm:min-h-[460px] w-full shrink-0 flex items-center justify-center group select-none transition-shadow ${
                isZoomed ? 'cursor-zoom-out shadow-inner' : 'cursor-zoom-in hover:shadow-sm'
              }`}
              title={isZoomed ? 'Press to zoom out' : 'Press to zoom in'}
            >
              {/* Full-scale image with smooth pan/zoom transformation */}
              <img
                src={selectedProductModal.imageUrl}
                alt={selectedProductModal.name}
                referrerPolicy="no-referrer"
                style={{
                  transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                  transition: isZoomed ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out',
                }}
                className="w-full h-full object-contain p-3 pointer-events-none"
              />

              {/* Hover Zoom Icon & Prompt Overlay (appears smoothly on hover when not zoomed) */}
              {!isZoomed && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10 pointer-events-none">
                  <div className="px-4 py-2 bg-white/95 text-[#1E293B] text-xs font-semibold rounded-full shadow-lg border border-[#E8E6DF] flex items-center gap-2 backdrop-blur-xs transform group-hover:scale-100 scale-95 transition-all">
                    <ZoomIn className="w-4 h-4 text-[#FF6B4A]" />
                    <span>Press to zoom in</span>
                  </div>
                </div>
              )}

              {/* Top signature badge */}
              <div
                className={`absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1E293B] shadow-2xs transition-opacity duration-200 pointer-events-none ${
                  isZoomed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                WeaveSocks Signature
              </div>

              {/* Zoom Action Status Badge (top right) */}
              <div className="absolute top-3.5 right-3.5 z-10">
                {isZoomed ? (
                  <button
                    onClick={toggleZoom}
                    className="px-3.5 py-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer group/btn"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-[#FF8566] group-hover/btn:scale-110 transition-transform" />
                    <span>Press to zoom out</span>
                  </button>
                ) : (
                  <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-medium text-[#475569] shadow-2xs border border-[#E8E6DF] flex items-center gap-1.5 opacity-80 group-hover:opacity-100 group-hover:border-[#FF6B4A]/50 group-hover:text-[#E8502E] transition-all">
                    <ZoomIn className="w-3.5 h-3.5 text-[#8B8579] group-hover:text-[#FF6B4A]" />
                    <span>Zoom</span>
                  </div>
                )}
              </div>

              {/* Bottom Feature Bar */}
              <div
                className={`absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/60 shadow-xs flex items-center justify-between text-[10px] text-[#475569] transition-opacity duration-200 pointer-events-none ${
                  isZoomed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="font-semibold text-[#1E293B] flex items-center gap-1">
                  <Feather className="w-3 h-3 text-[#FF6B4A]" /> Seamless Toe
                </span>
                <span>·</span>
                <span>Organic Cotton</span>
                <span>·</span>
                <span>Arch Cushion</span>
              </div>
            </div>

            {/* Right: Harmonious Details & Balanced Action Controls */}
            <div className="flex flex-col justify-between space-y-4 sm:min-h-[460px]">
              <div className="space-y-3.5">
                {/* Header Zone */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#8B8579] font-medium">
                    <span className="uppercase tracking-wider">{selectedProductModal.tags.join(' · ')}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                      <span>{selectedProductModal.rating}</span>
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#1E293B] tracking-tight">
                    {selectedProductModal.name}
                  </h2>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="font-display font-extrabold text-2xl text-[#1E293B] tabular-nums">
                      ${selectedProductModal.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#8B8579]">/ pair</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">
                  {selectedProductModal.description}
                </p>

                {/* Stock status & Size */}
                <div className="flex items-center justify-between text-xs py-1 border-t border-b border-[#F1EFEA]">
                  <div className="flex items-center gap-1.5 text-[#10B981] font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock ({selectedProductModal.count} available)</span>
                  </div>
                  <span className="text-[#8B8579] text-[11px]">Unisex US 5–13</span>
                </div>

                {/* Clean Inline Quantity Selector */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold text-[#334155]">Quantity</span>
                  <div className="flex items-center border border-[#D5D2C8] rounded-xl bg-[#FBFBFA] p-0.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-[#1E293B] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedProductModal.count, q + 1))}
                      className="w-7 h-7 flex items-center justify-center text-[#475569] hover:text-[#1E293B] rounded-lg transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Balanced, Symmetrical Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className={`h-12 px-3 rounded-xl font-semibold text-xs sm:text-sm tracking-normal transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                      justAdded
                        ? 'bg-[#10B981] text-white shadow-xs'
                        : 'bg-[#FFF5F2] hover:bg-[#FFEAE4] text-[#E8502E] border border-[#FFD9CF] active:scale-[0.99]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0 text-white" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 shrink-0 text-[#FF6B4A]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Checkout button with layout identical to Add to Cart (icon + centered label) */}
                  <button
                    onClick={handleCheckoutNow}
                    className="h-12 px-3 bg-[#1E293B] hover:bg-[#0F172A] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-normal rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <CreditCard className="w-4 h-4 shrink-0 text-[#FF8566]" />
                    <span>Checkout</span>
                  </button>
                </div>
              </div>

              {/* Specs & Care Accordion tabs with Strict Fixed Height to guarantee zero jump */}
              <div className="pt-2 text-xs border-t border-[#F1EFEA]">
                <div className="flex border-b border-[#E8E6DF] mb-2 text-[11px]">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 px-2.5 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-b-2 border-[#FF6B4A] text-[#FF6B4A]'
                        : 'text-[#64748B] hover:text-[#1E293B]'
                    }`}
                  >
                    Yarn & Origin
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 px-2.5 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-b-2 border-[#FF6B4A] text-[#FF6B4A]'
                        : 'text-[#64748B] hover:text-[#1E293B]'
                    }`}
                  >
                    Care Guide
                  </button>
                </div>

                {/* Locked Height Container: 100% immune to height differences or jump */}
                <div className="h-[46px] flex flex-col justify-center text-[#64748B] text-[11px] leading-relaxed">
                  {activeTab === 'details' ? (
                    <div className="space-y-0.5">
                      <p><span className="font-semibold text-[#334155]">Composition:</span> {selectedProductModal.material}</p>
                      <p><span className="font-semibold text-[#334155]">Crafted:</span> {selectedProductModal.origin}</p>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <p><span className="font-semibold text-[#334155]">Washing:</span> {selectedProductModal.care}</p>
                      <p><span className="font-semibold text-[#334155]">Guarantee:</span> Color-fast & shrinkage tested</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
