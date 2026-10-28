'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import { supabase } from '@/lib/supabase';
import { dvaAlert, dvaToast } from '@/components/DvaToast';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const dva_email = email.trim().toLowerCase();
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=/reset-password`
        : 'https://www.dreamsacademy.online/reset-password';

      const { error } = await supabase.auth.resetPasswordForEmail(dva_email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      dvaToast.success('Password reset link bhej diya gaya hai!');
      dvaAlert.fire({
        title: 'Check Your Email ✉️',
        text: `Humne ${dva_email} par password reset instructions bhej di hain. Apne inbox aur spam folder ko check karein.`,
        icon: 'info',
        confirmButtonText: 'Theek Hai',
      });

      setIsSubmitted(true);
      setResendTimer(60);
    } catch (error: unknown) {
      const err = error as Error;
      const errorText = err.message || 'Failed to send reset link. Please check your email and try again.';
      dvaToast.error(errorText);
      setErrorMessage(errorText);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !email) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?next=/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      if (error) throw error;
      setResendTimer(60);
    } catch (error: unknown) {
      const err = error as Error;
      setErrorMessage(err.message || 'Failed to resend link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* Background Blobs for Visual Ambience */}
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
              Account <br />Recovery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Don&apos;t worry! It happens to everyone. We will send you a secure link to reset your password and continue your learning.
            </motion.p>
            <div className={styles.brandSindhiQuote}>
              پنهنجي اڪائونٽ جو پاسورڊ محفوظ طريقي سان ريسيٽ ڪريو ۽ پنهنجي سکيا جو سفر جاري رکو.
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
            <h1>Forgot Password?</h1>
            <p>
              Enter the email associated with your account and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{ 
                  background: '#FFF5F5',
                  border: '1px solid #FEB2B2',
                  color: '#C53030',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem'
                }}
              >
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successBox}
            >
              <div className={styles.successIconWrap}>
                <CheckCircle2 size={26} />
              </div>
              <h3>Check Your Email</h3>
              <p>
                We have sent a password reset link to <strong>{email}</strong>. Please check your inbox (and Spam/Junk folder) and follow the instructions to choose a new password.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0 || loading}
                  className={styles.submitBtn}
                  style={{
                    background: resendTimer > 0 ? '#E2E8F0' : 'var(--accent, #7C5CFF)',
                    color: resendTimer > 0 ? '#64748B' : 'white',
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    boxShadow: resendTimer > 0 ? 'none' : undefined
                  }}
                >
                  {resendTimer > 0 ? `Resend Link in (${resendTimer}s)` : 'Resend Link'}
                </button>
                <Link
                  href="/login"
                  className={styles.backToLogin}
                  style={{ margin: 0 }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <label htmlFor="reset-email">Registered Email Address</label>
                <div className={styles.inputContainer}>
                  <Mail className={styles.inputIcon} />
                  <input 
                    id="reset-email"
                    type="email" 
                    className={styles.input}
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
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
                    <KeyRound size={18} />
                    <span>Send Reset Instructions</span>
                  </>
                )}
              </motion.button>

              <Link href="/login" className={styles.backToLogin}>
                <ArrowLeft size={16} />
                <span>Remember your password? Back to Login</span>
              </Link>
            </form>
          )}

          {/* Student Support Link */}
          <div className={styles.whatsappHelp}>
            <span>Trouble recovering access?</span>
            <a 
              href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20need%20help%20recovering%20my%20Dreams%20Academy%20account%20password."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappHelpLink}
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

