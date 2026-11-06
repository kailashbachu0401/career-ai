import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, X, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  const bgColor = isSuccess ? '#f0fdf4' : (isError ? '#fef2f2' : (isWarning ? '#fffbeb' : '#f0f9ff'));
  const borderColor = isSuccess ? '#bbf7d0' : (isError ? '#fecaca' : (isWarning ? '#fde68a' : '#bae6fd'));
  const textColor = isSuccess ? '#15803d' : (isError ? '#b91c1c' : (isWarning ? '#b45309' : '#0369a1'));

  const Icon = isSuccess ? CheckCircle2 : (isError ? AlertCircle : (isWarning ? AlertTriangle : Info));

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.85rem 1.25rem',
      borderRadius: '12px',
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      maxWidth: '420px',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <Icon size={20} color={textColor} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: textColor }}>
        {toast.message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: textColor,
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
