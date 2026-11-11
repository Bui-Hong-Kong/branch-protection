import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard } from 'lucide-react';

export const AddCardModal: React.FC = () => {
  const { showAddCardModal, setShowAddCardModal, addCard, user } = useApp();

  const [cardNumber, setCardNumber] = useState('');
  const [expires, setExpires] = useState('');
  const [ccv, setCcv] = useState('');
  const [cardholderName, setCardholderName] = useState(
    user ? `${user.firstName} ${user.lastName}`.trim() : ''
  );

  if (!showAddCardModal) return null;

  const handleCardNumberChange = (val: string) => {
    // Only digits, group by 4
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const parts = cleaned.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : cleaned);
  };

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setExpires(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setExpires(cleaned);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !expires.trim() || !ccv.trim()) return;

    addCard({
      longNum: cardNumber,
      expires,
      ccv,
      cardholderName: cardholderName || 'Sock Shop Customer',
      isDefault: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E8E6DF] overflow-hidden flex flex-col">
        <div className="p-6 pb-4 border-b border-[#F1EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFF5F2] text-[#FF6B4A] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1E293B]">Add Payment Card</h3>
              <p className="text-xs text-[#8B8579]">256-bit encrypted demo card tokenization</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddCardModal(false)}
            className="p-1.5 text-[#8B8579] hover:text-[#1E293B] rounded-xl hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Name on Card</label>
            <input
              type="text"
              required
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="e.g. Eve Kubernetes"
              className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A] font-mono"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">VISA / MC</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Expiry Date</label>
              <input
                type="text"
                required
                value={expires}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A] font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Security Code (CCV)</label>
              <input
                type="text"
                required
                value={ccv}
                onChange={(e) => setCcv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A] font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddCardModal(false)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#FF6B4A] hover:bg-[#E8502E] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
