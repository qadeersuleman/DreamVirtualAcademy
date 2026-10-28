'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { dvaAlert, dvaToast } from '@/components/DvaToast';
import styles from './page.module.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match. Please re-enter.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const dva_new_password = password;
      const { error } = await supabase.auth.updateUser({
        password: dva_new_password,
      });

      if (error) throw error;

      dvaToast.success('Password update ho gaya hai!');
      dvaAlert.fire({
        title: 'Password Updated! 🔒',
        text: 'Aapka naya password kamyabi se save ho chuka hai. Ab aap login kar sakte hain.',
        icon: 'success',
        confirmButtonText: 'Login Now',
        onConfirm: () => router.push('/login'),
      });

      setMessage({
        type: 'success',
        text: 'Password updated successfully! Redirecting to login...',
      });
    } catch (error: unknown) {
      const err = error as Error;
      const errorText = err.message || 'Failed to update password. Your reset link may have expired.';
      dvaToast.error(errorText);
      setMessage({
        type: 'error',
        text: errorText,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={styles.card}
      >
        {/* Left Branding Side */}
        <div className={styles.brandSide}>
          <div className={styles.brandLogo}>
            <img
              src="/images/logo-yellow.png"
              alt="Dreams Academy Icon"
              style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
            />
            <span>Dreams Academy</span>
          </div>

          <div className={styles.brandContent}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Secure <br />New Password
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Create a strong new password to protect your learning progress, test scores, and profile.
            </motion.p>
            <div className={styles.brandSindhiQuote}>
              پنهنجو نئون پاسورڊ ٺاهيو ۽ پنهنجي اڪائونٽ کي محفوظ رکو.
            </div>
          </div>

          <div className={styles.brandFooter}>
            <p>© 2026 Dreams Virtual Academy • Student Support</p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img
                src="/images/logo-yellow.png"
                alt="Dreams Academy"
                style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }}
              />
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)' }}>Dreams Virtual Academy</span>
            </div>
            <h1>Set New Password</h1>
            <p>Please enter your new password below to regain full access.</p>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{
                  background: message.type === 'error' ? '#FFF5F5' : '#F0FFF4',
                  border: `1px solid ${message.type === 'error' ? '#FEB2B2' : '#9AE6B4'}`,
                  color: message.type === 'error' ? '#C53030' : '#2F855A',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                }}
              >
                {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                <span>{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form className={styles.form} onSubmit={handleReset}>
            <div className={styles.inputWrapper}>
              <label htmlFor="new-password">New Password</label>
              <div className={styles.inputContainer}>
                <Lock className={styles.inputIcon} />
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="confirm-password">Confirm New Password</label>
              <div className={styles.inputContainer}>
                <Lock className={styles.inputIcon} />
                <input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`${styles.submitBtn} shimmer-hover`}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.loadingSpinner} />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Update Password</span>
                </>
              )}
            </motion.button>

            <Link href="/login" className={styles.backToLogin}>
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
            </Link>
          </form>
        </div>
      </motion.div>
    </main>
  );
}

