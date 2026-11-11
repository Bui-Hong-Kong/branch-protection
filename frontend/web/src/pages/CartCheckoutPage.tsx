import React from 'react';
import { useApp } from '../context/AppContext';
import { Address, Card, CartItem } from '../types';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    taxAmount,
    cartTotal,
    updateCartQty,
    removeFromCart,
    clearCart,
    user,
    setAuthModal,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    setShowAddAddressModal,
    cards,
    selectedCardId,
    setSelectedCardId,
    setShowAddCardModal,
    placeOrder,
    navigate,
    openProductModal,
  } = useApp();

  const freeShippingThreshold = 40.0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-[#FFF5F2] text-[#FF6B4A] mx-auto flex items-center justify-center mb-4 shadow-xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-display font-extrabold text-xl sm:text-3xl text-[#1E293B]">
          Your sock basket is empty
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto mt-2 leading-relaxed">
          Looks like you haven’t added any cheerful socks yet. Explore our signature collection and treat your feet.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate('/catalogue')}
            className="px-5 py-2.5 bg-[#FF6B4A] hover:bg-[#E8502E] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse Socks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-[10px] sm:text-xs text-[#8B8579] font-medium mb-1">
          <span>WeaveSocks</span>
          <span className="mx-1.5">/</span>
          <span className="text-[#FF6B4A]">Checkout</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1E293B] tracking-tight">
          Cart & Checkout
        </h1>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-[#FAF9F5] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E6DF]">
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          <span className="flex items-center gap-1.5 text-[#1E293B] text-[11px] sm:text-xs">
            <Truck className="w-3.5 h-3.5 text-[#FF6B4A]" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-[#10B981]">🎉 FREE Express Shipping Unlocked!</span>
            ) : (
              <span>
                Add <strong className="text-[#FF6B4A]">${remainingForFreeShipping.toFixed(2)}</strong> for FREE Shipping
              </span>
            )}
          </span>
          <span className="text-[#8B8579] text-[11px]">{freeShippingProgress.toFixed(0)}%</span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-[#E8E6DF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6B4A] transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {!user && (
        <div className="p-3.5 sm:p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#9A3412]">
            <AlertCircle className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span>Please sign in to place your order.</span>
          </div>
          <button
            onClick={() => setAuthModal('login')}
            className="px-3 py-1.5 bg-[#FF6B4A] text-white font-bold rounded-xl shadow-xs hover:bg-[#E8502E] transition-colors cursor-pointer text-xs"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Line items + Address + Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Line Items */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1EFEA]">
              <h2 className="font-display font-bold text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#FF6B4A]" />
                Cart Items ({cartCount})
              </h2>
              <button
                onClick={clearCart}
                className="text-xs text-[#8B8579] hover:text-[#DC2626] transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>

            <div className="divide-y divide-[#F1EFEA]">
              {cart.map((item: CartItem) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                  {/* Thumbnail */}
                  <div
                    onClick={() => openProductModal(item.sock)}
                    className="w-14 h-14 sm:w-18 sm:h-18 bg-[#F4F3EE] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-[#E8E6DF] cursor-pointer"
                  >
                    <img
                      src={item.sock.imageUrl}
                      alt={item.sock.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => openProductModal(item.sock)}
                      className="font-display font-bold text-xs sm:text-sm text-[#1E293B] hover:text-[#FF6B4A] transition-colors truncate cursor-pointer"
                    >
                      {item.sock.name}
                    </h3>
                    <div className="text-[11px] text-[#8B8579] mt-0.5">
                      ${item.unitPrice.toFixed(2)} each
                    </div>

                    {/* Quantity Stepper on Mobile */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-[#D5D2C8] rounded-lg bg-[#FBFBFA]">
                        <button
                          onClick={() => updateCartQty(item.sockId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#475569] hover:text-[#1E293B] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-[#1E293B] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.sockId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#475569] hover:text-[#1E293B] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.sockId)}
                        className="text-[#8B8579] hover:text-[#DC2626] p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right shrink-0">
                    <div className="font-display font-bold text-xs sm:text-sm text-[#1E293B] tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Shipping Address Block */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1EFEA]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B4A]" />
                <h2 className="font-display font-bold text-sm sm:text-base text-[#1E293B]">
                  1. Shipping Address
                </h2>
              </div>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addresses.map((addr: Address) => {
                  const isSelected = addr.id === selectedAddressId;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#FF6B4A] bg-[#FFF9F7]'
                          : 'border-[#E8E6DF] bg-[#FBFBFA]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-xs space-y-0.5">
                          <div className="font-bold text-[#1E293B]">
                            {addr.number} {addr.street}
                          </div>
                          <div className="text-[#64748B]">
                            {addr.city}, {addr.postcode}
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#FF6B4A] bg-[#FF6B4A] text-white'
                              : 'border-[#D5D2C8] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="w-full py-2.5 bg-[#1E293B] text-white text-xs font-semibold rounded-xl"
              >
                + Add Shipping Address
              </button>
            )}
          </div>

          {/* Section 3: Payment Card Block */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1EFEA]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#FF6B4A]" />
                <h2 className="font-display font-bold text-sm sm:text-base text-[#1E293B]">
                  2. Payment Method
                </h2>
              </div>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {cards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cards.map((card: Card) => {
                  const isSelected = card.id === selectedCardId;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCardId(card.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#FF6B4A] bg-[#FFF9F7]'
                          : 'border-[#E8E6DF] bg-[#FBFBFA]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-xs space-y-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF6B4A]">
                            {card.brand || 'Card'}
                          </span>
                          <div className="font-mono font-bold text-[#1E293B]">
                            {card.longNum}
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#FF6B4A] bg-[#FF6B4A] text-white'
                              : 'border-[#D5D2C8] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <button
                onClick={() => setShowAddCardModal(true)}
                className="w-full py-2.5 bg-[#1E293B] text-white text-xs font-semibold rounded-xl"
              >
                + Add Payment Card
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-4">
            <h2 className="font-display font-bold text-base sm:text-lg text-[#1E293B]">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs sm:text-sm border-b border-[#F1EFEA] pb-4">
              <div className="flex items-center justify-between text-[#475569]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1E293B] tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#475569]">
                <span>Shipping</span>
                <span className="font-semibold text-[#1E293B] tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#475569]">
                <span>Sales Tax (8.25%)</span>
                <span className="font-semibold text-[#1E293B] tabular-nums">
                  ${taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#F1EFEA] flex items-baseline justify-between">
                <span className="font-display font-extrabold text-base text-[#1E293B]">
                  Total
                </span>
                <span className="font-display font-extrabold text-xl sm:text-2xl text-[#1E293B] tabular-nums">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-2">
              <button
                onClick={placeOrder}
                className="w-full py-3.5 px-4 bg-[#FF6B4A] hover:bg-[#E8502E] active:scale-98 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8B8579]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Encrypted 1-Click Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
