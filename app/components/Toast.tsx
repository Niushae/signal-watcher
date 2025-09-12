'use client';

import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

type ToastProps = {
  id: number;
  message: string;
  type: 'success' | 'error';
  onClose: (id: number) => void;
};

const toastStyles = {
  success: {
    bg: 'bg-green-600',
    icon: <CheckCircle className="h-6 w-6 text-white" />,
  },
  error: {
    bg: 'bg-red-600',
    icon: <XCircle className="h-6 w-6 text-white" />,
  },
};

export default function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const styles = toastStyles[type];

  return (
    <div className={`flex items-center p-4 mb-4 text-white rounded-lg shadow-lg ${styles.bg}`} role="alert">
      <div className="flex-shrink-0">{styles.icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 inline-flex h-8 w-8" onClick={() => onClose(id)} aria-label="Close">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}