'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Pencil, 
  FileText, 
  Target, 
  Flame, 
  AlertTriangle, 
  FileQuestion, 
  BookOpen, 
  Video, 
  FolderOpen, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    testsGiven: 0,
    avgScore: 0,
    streak: 1,
    weakArea: 'None (Take your first test)',
    hasTests: false,
    recentTestTitle: 'General Science - Diagnostic Mock Test #1',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      try {
        // Fetch real attempts from Supabase user_attempts table
        const { data: attempts } = await supabase
          .from('user_attempts')
          .select('*')
          .eq('user_id', session.user.id)
          .order('completed_at', { ascending: false });

        if (attempts && attempts.length > 0) {
          const totalScorePercent = attempts.reduce((acc, curr) => {
            const pct = curr.total_questions > 0 ? (curr.score / curr.total_questions) * 100 : 0;
            return acc + pct;
          }, 0);
          const calculatedAvg = Math.round(totalScorePercent / attempts.length);

          setStats({
            testsGiven: attempts.length,
            avgScore: calculatedAvg,
            streak: Math.min(attempts.length + 1, 14),
            weakArea: calculatedAvg < 60 ? 'Science & Numericals' : 'Exam Ready (Keep it up!)',
            hasTests: true,
            recentTestTitle: attempts[0]?.difficulty 
              ? `${attempts[0].difficulty.toUpperCase()} Test (Score: ${attempts[0].score}/${attempts[0].total_questions})` 
              : 'Recent Mock Test Attempt',
          });
        } else {
          // New student with 0 attempts
          setStats({
            testsGiven: 0,
            avgScore: 0,
            streak: 1,
            weakArea: 'No tests attempted yet',
            hasTests: false,
            recentTestTitle: 'General Science - Diagnostic Test',
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard attempts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
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
        <img 
          src="/images/logo-yellow.png" 
          alt="Dreams Academy" 
          style={{ width: '56px', height: '56px', borderRadius: '16px', marginBottom: '1.25rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} 
        />
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
                src={user?.user_metadata?.avatar_url || '/images/profile.png'} 
                alt="Profile" 
                className={styles.avatar} 
              />
              <button className={styles.editBtn} aria-label="Edit Profile">
                <Pencil size={13} />
              </button>
            </div>
            <div className={styles.welcomeText}>
              <h1>Welcome back, <span className={styles.userName}>{user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Student')}!</span></h1>
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
            <span className={styles.statIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} color="var(--primary)" />
            </span>
            <div className={styles.statInfo}>
              <h3>{stats.testsGiven}</h3>
              <p>Mock Tests Given</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={22} color="#3DBE7A" />
            </span>
            <div className={styles.statInfo}>
              <h3>{stats.hasTests ? `${stats.avgScore}%` : '0%'}</h3>
              <p>Avg Score</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={22} color="#FF8C42" />
            </span>
            <div className={styles.statInfo}>
              <h3>{stats.streak} Day{stats.streak > 1 ? 's' : ''}</h3>
              <p>Study Streak</p>
            </div>
          </div>
          <div className={`${styles.statCard} glass`}>
            <span className={styles.statIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={22} color="#EF4444" />
            </span>
            <div className={styles.statInfo}>
              <h3>Weak Areas</h3>
              <p>{stats.weakArea}</p>
            </div>
          </div>
        </section>

        {/* Resume Activity Card */}
        <section className={`${styles.resumeSection} glass animate-fade-in-up`}>
          <div className={styles.resumeInfo}>
            <div className={styles.cardHeader}>
              <span className={styles.pulse}></span>
              <h4>{stats.hasTests ? 'CONTINUE WHERE YOU LEFT OFF' : 'GET STARTED WITH YOUR STUDIES'}</h4>
            </div>
            <h2>{stats.hasTests ? stats.recentTestTitle : 'Start Your First Diagnostic Mock Test! 🎯'}</h2>
            <p>
              {stats.hasTests 
                ? 'Your latest test score is recorded. Take a new test or revision quiz to boost your ranking!' 
                : 'Welcome to Dreams Virtual Academy! Take your first test to measure your STS / JST prep score.'}
            </p>
          </div>
          <Link href="/tests" className={styles.resumeBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
            {stats.hasTests ? 'Take New Test →' : 'Start Test Now →'}
          </Link>
        </section>

        {/* Quick Links Grid (6 options) */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
             <h2>Explore Modules</h2>
             <p>Access all our learning tools instantly.</p>
          </div>
          <div className={styles.quickLinksGrid}>
             <Link href="/tests" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FFE8C7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <FileQuestion size={22} color="#D97706" />
                </div>
                <h4>Mock Tests</h4>
             </Link>
             <Link href="/notes" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <BookOpen size={22} color="#0284C7" />
                </div>
                <h4>Notes</h4>
             </Link>
             <Link href="/videos" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Video size={22} color="#0D9488" />
                </div>
                <h4>Videos</h4>
             </Link>
             <Link href="/courses" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <FolderOpen size={22} color="#7C3AED" />
                </div>
                <h4>Live Batches</h4>
             </Link>
             <Link href="/quizzes" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Sparkles size={22} color="#E11D48" />
                </div>
                <h4>Daily Quiz</h4>
             </Link>
             <Link href="/progress" className={`${styles.linkCard} glass`}>
                <div className={styles.linkIcon} style={{background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Layers size={22} color="#059669" />
                </div>
                <h4>Progress</h4>
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
