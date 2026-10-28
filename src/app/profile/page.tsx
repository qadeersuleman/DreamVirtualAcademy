'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { Camera, Bell, Moon, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    testsTaken: 0,
    avgScore: 0,
    xpPoints: 100,
    hasRealData: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        // Fetch user attempts for dynamic metrics
        const { data: attempts } = await supabase
          .from('user_attempts')
          .select('*')
          .eq('user_id', session.user.id);

        if (attempts && attempts.length > 0) {
          const totalScorePercent = attempts.reduce((acc, curr) => {
            const pct = curr.total_questions > 0 ? (curr.score / curr.total_questions) * 100 : 0;
            return acc + pct;
          }, 0);
          const calculatedAvg = Math.round(totalScorePercent / attempts.length);

          setStats({
            testsTaken: attempts.length,
            avgScore: calculatedAvg,
            xpPoints: attempts.length * 50 + 100,
            hasRealData: true,
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.dva_name || (user?.email ? user.email.split('@')[0] : 'Student');
  const displayEmail = user?.email || 'guest@dreamsacademy.online';
  const displayPhone = user?.user_metadata?.phone || '+92 301 8183624';
  const displayAvatar = user?.user_metadata?.avatar_url || '/images/profile.png';
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'March 2026';

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.profileContent}>
        <header className={styles.header}>
          <h1>Your <span className={styles.accentText}>Profile</span></h1>
          <p>Manage your account and track your learning journey.</p>
        </header>

        <section className={styles.mainGrid}>
          {/* Left Column: Info */}
          <div className={`${styles.infoCard} glass`}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <img 
                  src={displayAvatar} 
                  alt="Profile" 
                  className={styles.avatar} 
                />
                <button className={styles.editAvatar} aria-label="Change Avatar">
                  <Camera size={14} />
                </button>
              </div>
              <div className={styles.nameSection}>
                <h2>{displayName}</h2>
                <span className={styles.badge}>
                  <UserCheck size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                  {user ? 'Verified Student' : 'Guest Account'}
                </span>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <label>Email</label>
                <p>{displayEmail}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Phone</label>
                <p>{displayPhone}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Joined</label>
                <p>{joinedDate}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Target Exam</label>
                <p>STS / JST / SPSC</p>
              </div>
            </div>

            <Link href="/dashboard" className={`${styles.btn} ${styles.primary}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              View Student Dashboard
            </Link>
          </div>

          {/* Right Column: Stats & Settings */}
          <div className={styles.rightCol}>
            <div className={`${styles.statsCard} glass`}>
              <h3>Academic Mastery</h3>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{stats.testsTaken}</span>
                  <p>Tests Taken</p>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{stats.hasRealData ? `${stats.avgScore}%` : '0%'}</span>
                  <p>Average Score</p>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{stats.xpPoints}</span>
                  <p>XP Earned</p>
                </div>
              </div>
            </div>

            <div className={`${styles.settingsCard} glass`}>
              <h3>Account Settings</h3>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={16} /> Exam Notifications
                  </span>
                  <div className={styles.toggleActive} />
                </div>
                <div className={styles.settingItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Moon size={16} /> Theme Mode
                  </span>
                  <div className={styles.toggle} />
                </div>
                <Link href="/forgot-password" className={styles.settingItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={16} /> Change / Reset Password
                  </span>
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>
            
            <Link href="/courses" className={`${styles.btn} glass`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
              <span>Explore Live Batches</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
