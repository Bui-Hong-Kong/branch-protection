import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1E293B] text-white p-3.5 rounded-xl shadow-xl border border-[#334155] flex items-center justify-between gap-3 text-xs animate-slideUp"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />}
            <span className="font-medium text-slate-100 leading-snug">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
