'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { GithubIcon as Github, ChromeIcon as Chrome } from '@/components/Icons';
import { supabase } from '@/lib/supabase';
import { dvaAlert, dvaToast } from '@/components/DvaToast';
import styles from './page.module.css';

/**
 * Modern, Creative Registration Page for Dreams Virtual Academy.
 * Connected to Supabase for Authentication.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [dvm_name, setDvmName] = useState('');
  const [dvm_email, setDvmEmail] = useState('');
  const [dvm_password, setDvmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 8000); // Longer for email confirmation notice
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const clean_dvm_name = dvm_name.trim().replace(/[<>]/g, '');
      const clean_dvm_email = dvm_email.trim().toLowerCase();
      const clean_dvm_password = dvm_password;

      if (clean_dvm_password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const { data, error } = await supabase.auth.signUp({
        email: clean_dvm_email,
        password: clean_dvm_password,
        options: {
          data: {
            dvm_name: clean_dvm_name,
            dva_name: clean_dvm_name,
            full_name: clean_dvm_name,
          }
        }
      });

      if (error) throw error;

      dvaToast.success('Registration kamyab!', 'Account Created');
      dvaAlert.fire({
        title: 'Account Registered! 🎉',
        text: 'Aapka account successfully ban gaya hai. Apne email inbox mein jakar verification link confirm karein.',
        icon: 'success',
        confirmButtonText: 'Go to Login',
        onConfirm: () => router.push('/login'),
      });

      setMessage({ 
        type: 'success', 
        text: 'Registration successful! Please check your email for the confirmation link.' 
      });
    } catch (error: unknown) {
      const err = error as Error;
      const errorText = err.message || 'Signup failed. Please try again.';
      dvaToast.error(errorText, 'Registration Failed');
      setMessage({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      const err = error as Error;
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <main className={styles.container}>
      {/* Background Blobs for Visual Interest */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} />
      <div className={`${styles.bgBlob} ${styles.blob2}`} />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.loginCard}
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
              Start <br />Your Destiny
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Create your account today and get unlimited access to all our courses, quizzes and interactive learning modules.
            </motion.p>
          </div>

          <div className={styles.brandFooter}>
            <p>© 2026 Dreams Virtual Academy</p>
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
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create Account
            </motion.h1>
            <p>Join our community of elite learners.</p>
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
                  fontSize: '0.9rem'
                }}
              >
                {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.inputWrapper}>
              <label>Full Name</label>
              <div className={styles.inputContainer}>
                <User className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={styles.input}
                  placeholder="John Doe"
                  value={dvm_name}
                  onChange={(e) => setDvmName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label>Email Address</label>
              <div className={styles.inputContainer}>
                <Mail className={styles.inputIcon} />
                <input 
                  type="email" 
                  className={styles.input}
                  placeholder="name@example.com"
                  value={dvm_email}
                  onChange={(e) => setDvmEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label>Password</label>
              <div className={styles.inputContainer}>
                <Lock className={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={styles.input}
                  placeholder="••••••••"
                  value={dvm_password}
                  onChange={(e) => setDvmPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={styles.loginButton}
              disabled={loading}
              style={{ marginTop: '10px' }}
            >
              {loading ? (
                <div className={styles.loadingSpinner} />
              ) : (
                <span>Join the Academy</span>
              )}
            </motion.button>
          </form>

          <div className={styles.divider}>Or Sign up With</div>

          <div className={styles.socialLogin}>
            <button 
              type="button" 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('google')}
            >
              <Chrome size={20} />
              <span>Google</span>
            </button>
            <button 
              type="button" 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('github')}
            >
              <Github size={20} />
              <span>GitHub</span>
            </button>
          </div>

          <p className={styles.footerText}>
            Already have an account? <Link href="/login">Log in here</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
