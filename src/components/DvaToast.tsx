'use client';

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import styles from './DvaToast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface AlertOptions {
  title: string;
  text?: string;
  icon?: ToastType;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, title?: string, duration?: number) => void;
  showAlert: (options: AlertOptions) => void;
  dismissToast: (id: string) => void;
  closeAlert: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Global event bus for singleton usage (dvaToast & dvaAlert)
type Listener<T> = (data: T) => void;
const toastListeners = new Set<Listener<{ type: ToastType; message: string; title?: string; duration?: number }>>();
const alertListeners = new Set<Listener<AlertOptions>>();

export const dvaToast = {
  success: (message: string, title?: string, duration?: number) => {
    toastListeners.forEach((fn) => fn({ type: 'success', message, title, duration }));
  },
  error: (message: string, title?: string, duration?: number) => {
    toastListeners.forEach((fn) => fn({ type: 'error', message, title, duration }));
  },
  warning: (message: string, title?: string, duration?: number) => {
    toastListeners.forEach((fn) => fn({ type: 'warning', message, title, duration }));
  },
  info: (message: string, title?: string, duration?: number) => {
    toastListeners.forEach((fn) => fn({ type: 'info', message, title, duration }));
  },
};

export const dvaAlert = {
  fire: (options: AlertOptions) => {
    alertListeners.forEach((fn) => fn(options));
  },
};

export function DvaToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeAlert, setActiveAlert] = useState<AlertOptions | null>(null);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, message: string, title?: string, duration = 4000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastItem = { id, type, message, title, duration };
    setToasts((prev) => [...prev.slice(-4), newToast]); // Keep maximum 5 active
  }, []);

  const showAlert = useCallback((options: AlertOptions) => {
    setActiveAlert(options);
  }, []);

  const closeAlert = useCallback(() => {
    setActiveAlert(null);
  }, []);

  // Subscribe to global listeners
  useEffect(() => {
    const handleToast: Listener<{ type: ToastType; message: string; title?: string; duration?: number }> = (data) => {
      showToast(data.type, data.message, data.title, data.duration);
    };
    const handleAlert: Listener<AlertOptions> = (data) => {
      showAlert(data);
    };

    toastListeners.add(handleToast);
    alertListeners.add(handleAlert);

    return () => {
      toastListeners.delete(handleToast);
      alertListeners.delete(handleAlert);
    };
  }, [showToast, showAlert]);

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeAlert) {
        if (activeAlert.onCancel) activeAlert.onCancel();
        closeAlert();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAlert, closeAlert]);

  return (
    <ToastContext.Provider value={{ showToast, showAlert, dismissToast, closeAlert }}>
      {children}

      {/* Floating Toasts View */}
      <div className={styles.toastContainer} aria-live="polite">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <SingleToast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>

      {/* SweetAlert Modal Dialog View */}
      <AnimatePresence>
        {activeAlert && (
          <SweetAlertModal
            options={activeAlert}
            onClose={closeAlert}
          />
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

function SingleToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const duration = toast.duration || 4000;

  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10B981" />;
      case 'error':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      case 'info':
      default:
        return <Info size={20} color="#00E5FF" />;
    }
  };

  const getProgressColor = () => {
    switch (toast.type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': default: return '#00E5FF';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
    >
      <div className={styles.toastIconWrapper}>{getIcon()}</div>
      <div className={styles.toastContent}>
        {toast.title && <div className={styles.toastTitle}>{toast.title}</div>}
        <div className={styles.toastMessage}>{toast.message}</div>
      </div>
      <button className={styles.toastCloseBtn} onClick={onDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>

      {/* Animated Countdown Progress Bar */}
      <motion.div
        className={styles.progressBar}
        style={{ background: getProgressColor() }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
}

function SweetAlertModal({ options, onClose }: { options: AlertOptions; onClose: () => void }) {
  const icon = options.icon || 'info';

  const handleConfirm = () => {
    if (options.onConfirm) options.onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (options.onCancel) options.onCancel();
    onClose();
  };

  const getAlertIcon = () => {
    switch (icon) {
      case 'success':
        return <CheckCircle2 size={42} strokeWidth={2.4} />;
      case 'error':
        return <AlertCircle size={42} strokeWidth={2.4} />;
      case 'warning':
        return <AlertTriangle size={42} strokeWidth={2.4} />;
      case 'info':
      default:
        return <Info size={42} strokeWidth={2.4} />;
    }
  };

  return (
    <motion.div
      className={styles.alertBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleCancel}
    >
      <motion.div
        className={styles.alertModal}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className={`${styles.alertIconWrapper} ${styles[icon]}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1, stiffness: 400, damping: 20 }}
        >
          {getAlertIcon()}
        </motion.div>

        <h3 className={styles.alertTitle}>{options.title}</h3>
        {options.text && <p className={styles.alertText}>{options.text}</p>}

        <div className={styles.alertActions}>
          {options.showCancelButton && (
            <button className={styles.cancelBtn} onClick={handleCancel}>
              {options.cancelButtonText || 'Cancel'}
            </button>
          )}
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            {options.confirmButtonText || 'OK'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function useDvaNotify() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: dvaToast,
      alert: dvaAlert,
    };
  }
  return {
    toast: {
      success: (msg: string, title?: string, dur?: number) => context.showToast('success', msg, title, dur),
      error: (msg: string, title?: string, dur?: number) => context.showToast('error', msg, title, dur),
      warning: (msg: string, title?: string, dur?: number) => context.showToast('warning', msg, title, dur),
      info: (msg: string, title?: string, dur?: number) => context.showToast('info', msg, title, dur),
    },
    alert: {
      fire: (options: AlertOptions) => context.showAlert(options),
    },
  };
}

