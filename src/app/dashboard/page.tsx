'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#FFF7ED',
        color: '#4A3B2F'
      }}>
        <div className={styles.spinner} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.dashboardContent}>
        {/* Dashboard Header */}
        <header className={styles.dashboardHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarWrapper}>
              <img 
                src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                alt="Profile" 
                className={styles.avatar} 
              />
              <button className={styles.editBtn}>✏️</button>
            </div>
            <div className={styles.welcomeText}>
              <h1>Welcome back, <span className={styles.userName}>{user.user_metadata?.full_name || user.email.split('@')[0]}!</span></h1>
              <p>Ready to crush your study goals today?</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={`${styles.btn} glass`}>Download Report</button>
            <button className={`${styles.btn} ${styles.primary}`}>Start New Test</button>
          </div>
        </header>

        {/* Stats Row */}
        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon}>📝</span>
            <div className={styles.statInfo}>
              <h3>12</h3>
              <p>Mock Tests Given</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon}>🎯</span>
            <div className={styles.statInfo}>
              <h3>85%</h3>
              <p>Avg Score</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon}>🔥</span>
            <div className={styles.statInfo}>
              <h3>7 Days</h3>
              <p>Study Streak</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon}>⚠️</span>
            <div className={styles.statInfo}>
              <h3>Weak Areas</h3>
              <p>Pak Studies, Grammar</p>
            </div>
          </div>
        </section>

        {/* Resume Activity Card */}
        <section className={`${styles.resumeSection} glass animate-fade-in-up`}>
          <div className={styles.resumeInfo}>
            <div className={styles.cardHeader}>
              <span className={styles.pulse}></span>
              <h4>CONTINUE WHERE YOU LEFT OFF</h4>
            </div>
            <h2>FPSC General Knowledge - Mock Test #4</h2>
            <p>You stopped at Question 18/50. Resume to finish the test.</p>
          </div>
          <button className={styles.resumeBtn}>Resume Test →</button>
        </section>

        {/* Quick Links Grid (6 options) */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
             <h2>Explore Modules</h2>
             <p>Access all our learning tools instantly.</p>
          </div>
          <div className={styles.quickLinksGrid}>
             <Link href="/tests" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FFE8C7'}}>📝</div>
                <h4>Mock Tests</h4>
             </Link>
             <Link href="/notes" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#E0F2FE'}}>📚</div>
                <h4>Notes</h4>
             </Link>
             <Link href="/videos" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#F0FDFA'}}>🎬</div>
                <h4>Videos</h4>
             </Link>
             <Link href="/playlists" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FAF5FF'}}>📂</div>
                <h4>Playlists</h4>
             </Link>
             <Link href="/quizzes" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FEF2F2'}}>🎯</div>
                <h4>Daily Quiz</h4>
             </Link>
             <Link href="/flashcards" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#ECFDF5'}}>🃏</div>
                <h4>Flashcards</h4>
             </Link>
          </div>
        </section>

        {/* Smart Recommendations */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
             <h2 className={styles.aiTitle}>Recommended for You <span className={styles.aiBadge}>SMART STUDY</span></h2>
             <p>Tailored based on your recent performance.</p>
          </div>
          <div className={styles.aiGrid}>
             <div className={`${styles.aiCard} glass`}>
                <div className={styles.aiTag}>TOPIC NEEDED</div>
                <h4>Pak Studies: 1947-1971</h4>
                <p>Based on your low score in Mock Test #3.</p>
                <button className={styles.aiBtn}>Review Topic</button>
             </div>
             <div className={`${styles.aiCard} glass`}>
                <div className={styles.aiTag}>NEXT STEP</div>
                <h4>English Grammar Quiz</h4>
                <p>Suggested to improve your accuracy rate.</p>
                <button className={styles.aiBtn}>Take Quiz</button>
             </div>
             <div className={`${styles.aiCard} glass`}>
                <div className={styles.aiTag}>VIDEO</div>
                <h4>Quantitative Reasoning</h4>
                <p>Top trending video in your weakness area.</p>
                <button className={styles.aiBtn}>Watch Video</button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
