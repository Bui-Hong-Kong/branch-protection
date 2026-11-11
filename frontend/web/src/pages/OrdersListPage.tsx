import React from 'react';
import { useApp } from '../context/AppContext';
import { Order, CartItem } from '../types';
import { Package, ChevronRight } from 'lucide-react';

export const OrdersListPage: React.FC = () => {
  const { orders, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-4 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="text-[10px] sm:text-xs text-[#8B8579] font-medium mb-1">
          <span>WeaveSocks Account</span>
          <span className="mx-1.5">/</span>
          <span className="text-[#FF6B4A]">Orders</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1E293B] tracking-tight">
            Past Orders
          </h1>
          <button
            onClick={() => navigate('/catalogue')}
            className="px-3 py-1.5 bg-[#FF6B4A] hover:bg-[#E8502E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            + Shop
          </button>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {orders.map((order: Order) => {
            const itemCount = order.items.reduce((acc: number, i: CartItem) => acc + i.quantity, 0);

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E6DF] p-4 sm:p-6 hover:border-[#D5D2C8] hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Order metadata & thumbnails */}
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFF5F2] text-[#FF6B4A] flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm sm:text-base text-[#1E293B]">
                        {order.id}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
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

                    <div className="text-[11px] sm:text-xs text-[#8B8579]">
                      {order.date} · {itemCount} pairs · ETA: {order.estimatedDelivery}
                    </div>
                  </div>
                </div>

                {/* Items thumbnails preview on mobile */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 w-full sm:w-auto">
                  {order.items.slice(0, 3).map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#F4F3EE] overflow-hidden border border-[#E8E6DF] shrink-0"
                    >
                      <img
                        src={item.sock.imageUrl}
                        alt={item.sock.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] flex items-center justify-center text-[10px] font-bold text-[#8B8579] shrink-0">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                {/* Total & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1EFEA]">
                  <div>
                    <span className="font-display font-extrabold text-base text-[#1E293B] tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#F1EFEA] hover:bg-[#1E293B] hover:text-white text-[#1E293B] text-xs font-bold rounded-lg transition-all">
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E8E6DF] space-y-3">
          <p className="text-xs text-[#64748B]">No orders placed yet.</p>
          <button
            onClick={() => navigate('/catalogue')}
            className="px-4 py-2 bg-[#FF6B4A] text-white text-xs font-bold rounded-xl"
          >
            Start Browsing
          </button>
        </div>
      )}
    </div>
  );
};
