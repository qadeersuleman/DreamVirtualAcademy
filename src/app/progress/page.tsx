'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { BarChart3, Flame, FileQuestion, Award, Target } from 'lucide-react';

export default function ProgressPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [testCount, setTestCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: attempts } = await supabase
          .from('user_attempts')
          .select('*')
          .eq('user_id', session.user.id);

        if (attempts && attempts.length > 0) {
          const totalScorePercent = attempts.reduce((acc, curr) => {
            const pct = curr.total_questions > 0 ? (curr.score / curr.total_questions) * 100 : 0;
            return acc + pct;
          }, 0);
          setTestCount(attempts.length);
          setAvgScore(Math.round(totalScorePercent / attempts.length));
        }
      }
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', padding: '9rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span
          style={{
            background: 'rgba(124, 92, 255, 0.12)',
            color: 'var(--accent)',
            padding: '0.4rem 1.2rem',
            borderRadius: '99px',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '1rem',
          }}
        >
          <BarChart3 size={15} />
          ACADEMIC PERFORMANCE & TRACKER
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
          Student Progress Center
        </h1>
        <p style={{ fontFamily: 'var(--font-sindhi), "Noto Sans Arabic"', fontSize: '1.4rem', color: 'var(--accent)', direction: 'rtl', textAlign: 'center', margin: '0.6rem auto 1.25rem', maxWidth: '800px', display: 'block' }}>
          شاگردن جي ڪارڪردگي ۽ روزاني ترقي جو مرڪز
        </p>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
          Track your test scores, view quiz streaks, and analyze your subject mastery across Physics, Chemistry, Science, and STS preparation.
        </p>

        {loading ? (
          <p>Loading your progress...</p>
        ) : user ? (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1px solid var(--card-border)',
              boxShadow: '0 8px 30px rgba(74, 59, 47, 0.05)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img
                src={user.user_metadata?.avatar_url || '/images/profile.png'}
                alt="Profile"
                style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent)', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{user.email}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFF7ED', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--primary)' }}>
                <Flame size={28} color="#FF8C42" />
                <h4 style={{ fontSize: '1.4rem', margin: '0.3rem 0 0.1rem', color: 'var(--text-dark)' }}>
                  {testCount > 0 ? `${Math.min(testCount + 1, 14)} Days` : '1 Day'}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Study Streak</p>
              </div>
              <div style={{ background: 'rgba(124, 92, 255, 0.08)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(124, 92, 255, 0.2)' }}>
                <FileQuestion size={28} color="var(--accent)" />
                <h4 style={{ fontSize: '1.4rem', margin: '0.3rem 0 0.1rem', color: 'var(--accent)' }}>
                  {testCount} Completed
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Mock & Custom Tests</p>
              </div>
              <div style={{ background: 'rgba(61, 190, 122, 0.08)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(61, 190, 122, 0.2)' }}>
                <Award size={28} color="#2e9660" />
                <h4 style={{ fontSize: '1.4rem', margin: '0.3rem 0 0.1rem', color: '#2e9660' }}>
                  {testCount > 0 ? `${avgScore}% Avg` : 'New Student'}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Academic Grade</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/dashboard"
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Go to Full Dashboard →
              </Link>
              <Link
                href="/tests"
                style={{
                  background: 'white',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Take a New Test
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '3rem 2rem',
              border: '1px solid var(--card-border)',
              boxShadow: '0 8px 30px rgba(74, 59, 47, 0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Target size={48} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
              Guest Student Access
            </h3>
            <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              You can practice tests and quizzes freely as a guest student! To save your permanent history, streak scores, and certificate, create a quick account.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/login"
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Login / Register
              </Link>
              <Link
                href="/tests"
                style={{
                  background: '#FFF7ED',
                  border: '1px solid var(--primary)',
                  color: 'var(--text-dark)',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Practice Free Tests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

