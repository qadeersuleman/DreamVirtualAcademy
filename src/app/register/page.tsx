'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { GithubIcon as Github, ChromeIcon as Chrome } from '@/components/Icons';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

/**
 * Modern, Creative Registration Page for Dreams Virtual Academy.
 * Connected to Supabase for Authentication.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Registration successful! Please check your email for the confirmation link.' 
      });
      
      // Flash successful message then maybe redirect to login after a delay
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Signup failed. Please try again.' });
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
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
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
            <div className={styles.logoDot}>
               <UserPlus size={20} color="#F4C47F" />
            </div>
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <>
                  <span>Join the Academy</span>
                  <UserPlus size={20} />
                </>
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
