import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin } from 'lucide-react';

export const AddAddressModal: React.FC = () => {
  const { showAddAddressModal, setShowAddAddressModal, addAddress } = useApp();

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United States');

  if (!showAddAddressModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim() || !city.trim() || !postcode.trim()) return;

    addAddress({
      street,
      number: number || '1',
      city,
      postcode,
      country,
      isDefault: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E8E6DF] overflow-hidden flex flex-col">
        <div className="p-6 pb-4 border-b border-[#F1EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFF5F2] text-[#FF6B4A] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1E293B]">Add Shipping Address</h3>
              <p className="text-xs text-[#8B8579]">Where should we send your happy socks?</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddAddressModal(false)}
            className="p-1.5 text-[#8B8579] hover:text-[#1E293B] rounded-xl hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-[#334155] mb-1">Street Address</label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. Market Street"
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Apt / No.</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="402"
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Francisco"
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Postal Code</label>
              <input
                type="text"
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="94103"
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-[#D5D2C8] rounded-xl focus:ring-2 focus:ring-[#FF6B4A]"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddAddressModal(false)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#FF6B4A] hover:bg-[#E8502E] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
