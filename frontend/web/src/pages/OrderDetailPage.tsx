import React from 'react';
import { useApp } from '../context/AppContext';
import { CartItem } from '../types';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Calendar,
  RotateCcw,
} from 'lucide-react';

interface OrderDetailPageProps {
  orderId: string;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orderId }) => {
  const { orders, getOrderById, navigate, addToCart, showToast, openProductModal } = useApp();

  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center animate-fadeIn">
        <h2 className="font-display font-bold text-lg text-[#1E293B]">Order not found</h2>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 px-4 py-2 bg-[#FF6B4A] text-white text-xs font-bold rounded-xl"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleReorder = () => {
    order.items.forEach((item: CartItem) => {
      addToCart(item.sock, item.quantity);
    });
    showToast(`Added ${order.items.length} items to cart`, 'success');
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </button>
      </div>

      {/* Order Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1EFEA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A]">
                Order Confirmed
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-emerald-50 text-emerald-700'
                    : order.status === 'Shipped'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {order.status}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-xl sm:text-3xl text-[#1E293B] tracking-tight mt-1">
              Order #{order.id}
            </h1>

            <div className="text-xs text-[#8B8579] mt-1">
              Placed on {order.date} · ETA: {order.estimatedDelivery}
            </div>
          </div>

          <button
            onClick={handleReorder}
            className="self-start sm:self-auto px-3.5 py-2 bg-[#FF6B4A] hover:bg-[#E8502E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reorder Items</span>
          </button>
        </div>

        {/* Fulfillment Journey (Compact Mobile Flow) */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
            <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>1. Placed</span>
            </div>
          </div>

          <div
            className={`p-2 sm:p-3 rounded-xl border ${
              order.status === 'Shipped' || order.status === 'Delivered'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-[#FBFBFA] border-[#E8E6DF] text-[#8B8579]'
            }`}
          >
            <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>2. Dispatched</span>
            </div>
          </div>

          <div
            className={`p-2 sm:p-3 rounded-xl border ${
              order.status === 'Delivered'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-[#FBFBFA] border-[#E8E6DF] text-[#8B8579]'
            }`}
          >
            <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>3. Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Items + Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 shadow-xs space-y-3">
          <h2 className="font-display font-bold text-base text-[#1E293B] pb-2.5 border-b border-[#F1EFEA]">
            Items ({order.items.reduce((acc: number, i: CartItem) => acc + i.quantity, 0)} pairs)
          </h2>

          <div className="divide-y divide-[#F1EFEA]">
            {order.items.map((item: CartItem) => (
              <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                <div
                  onClick={() => openProductModal(item.sock)}
                  className="w-14 h-14 bg-[#F4F3EE] rounded-xl overflow-hidden shrink-0 border border-[#E8E6DF] cursor-pointer"
                >
                  <img
                    src={item.sock.imageUrl}
                    alt={item.sock.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    onClick={() => openProductModal(item.sock)}
                    className="font-display font-bold text-xs sm:text-sm text-[#1E293B] hover:text-[#FF6B4A] transition-colors truncate cursor-pointer"
                  >
                    {item.sock.name}
                  </h3>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                  </div>
                </div>

                <div className="text-right shrink-0 font-display font-bold text-xs sm:text-sm text-[#1E293B] tabular-nums">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F1EFEA] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1E293B]">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Shipping</span>
              <span className="font-semibold text-[#1E293B]">{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Tax</span>
              <span className="font-semibold text-[#1E293B]">${order.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#F1EFEA] flex justify-between items-baseline font-bold text-sm text-[#1E293B]">
              <span>Total Paid</span>
              <span className="font-display font-extrabold text-base sm:text-lg">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#1E293B] pb-2 border-b border-[#F1EFEA]">
              <MapPin className="w-4 h-4 text-[#FF6B4A]" />
              <span>Shipping Address</span>
            </div>
            <div className="text-[#475569]">
              <div className="font-semibold text-[#1E293B]">{order.address.number} {order.address.street}</div>
              <div>{order.address.city}, {order.address.postcode}</div>
              <div className="text-[#8B8579]">{order.address.country}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#1E293B] pb-2 border-b border-[#F1EFEA]">
              <CreditCard className="w-4 h-4 text-[#FF6B4A]" />
              <span>Payment Info</span>
            </div>
            <div className="text-[#475569]">
              <div className="font-mono font-bold text-[#1E293B]">{order.card.longNum}</div>
              <div className="text-[#8B8579] text-[11px]">{order.card.cardholderName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
