'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Target, Clock, Trophy, RefreshCcw, CheckCircle2, ArrowRight, ArrowLeft, ArrowLeftCircle, Award, ThumbsUp, BookOpen, Microscope, Star } from 'lucide-react';
import { mockTestsData, type MockQuestion } from '@/data/mockTestsData';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import styles from '@/app/page.module.css';

function CustomQuizRunner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subject = searchParams.get('subject') || 'Science';
  const level = (searchParams.get('level') || 'easy').toLowerCase() as 'easy' | 'medium' | 'hard';
  const testType = searchParams.get('type') || 'Mock Exams';

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // States
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // Default 5 minutes (300s)
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  // 1. Fetch user & load questions
  useEffect(() => {
    async function loadTest() {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Find the subject matching our data
      const subjectData = mockTestsData.find(
        (item) => item.subject.toLowerCase() === subject.toLowerCase()
      );

      if (subjectData) {
        const selectedQuestions = subjectData.questions[level] || [];
        setQuestions(selectedQuestions);
      } else {
        // Fallback: If no match, use the first subject's questions
        setQuestions(mockTestsData[0].questions[level] || []);
      }
      setLoading(false);
    }
    loadTest();
  }, [subject, level]);

  const handleFinish = async () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        finalScore++;
      }
    });

    setScore(finalScore);
    setShowResult(true);

    // Save Attempt to Supabase if authenticated
    if (user) {
      try {
        await supabase.from('user_attempts').insert({
          user_id: user.id,
          score: finalScore,
          total_questions: questions.length,
          difficulty: level,
          completed_at: new Date().toISOString()
        });
      } catch (err) {
        console.error("Failed to save attempt to Supabase", err);
      }
    }
  };

  const handleFinishRef = React.useRef(handleFinish);
  useEffect(() => {
    handleFinishRef.current = handleFinish;
  });

  // 2. Timer Effect
  useEffect(() => {
    if (!started || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            handleFinishRef.current();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (idx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: idx });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setStarted(true);
  };

  if (loading) {
    return (
      <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid var(--accent)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>Preparing Quiz Questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>No questions found matching the criteria.</p>
          <button className={styles.primaryBtn} onClick={() => router.push('/tests')} style={{ marginTop: '1.5rem', cursor: 'pointer' }}>Back to Hub</button>
        </div>
      </div>
    );
  }

  // Result view
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={styles.container} style={{ minHeight: '90vh', paddingTop: '140px' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${styles.featureCard} glass`} 
            style={{ textAlign: 'center', padding: '4rem 2rem' }}
          >
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2rem' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent)" strokeDasharray={`${percentage}, 100`} strokeWidth="3" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {percentage}%
                </div>
            </div>
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {percentage >= 80 ? (
                <>Excellent! <Trophy size={28} color="#EAB308" /></>
              ) : percentage >= 50 ? (
                <>Good Job! <ThumbsUp size={28} color="#3DBE7A" /></>
              ) : (
                <>Keep Practicing! <BookOpen size={28} color="var(--accent)" /></>
              )}
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              You scored <strong style={{ color: 'var(--accent)' }}>{score} out of {questions.length}</strong> correctly on the <strong style={{ color: 'var(--accent)' }}>{subject}</strong> test.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className={styles.primaryBtn} onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <RefreshCcw size={18} /> Retry Test
                </button>
                <button className={styles.secondaryBtn} onClick={() => router.push('/tests')} style={{ cursor: 'pointer' }}>
                    Back to Hub
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Pre-test Intro view
  if (!started) {
    return (
      <div className={styles.container} style={{ minHeight: '90vh', paddingTop: '140px' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <button 
              onClick={() => router.push('/tests')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: 600 }}
            >
              <ArrowLeftCircle size={20} /> Cancel & Back
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles.featureCard} glass`} 
            style={{ border: '2px solid var(--accent)', padding: '3rem' }}
          >
            <div className={styles.cardTag} style={{ textTransform: 'uppercase' }}>{testType}</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Microscope size={48} color="var(--accent)" />
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Custom {subject} Test</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              You are about to start a custom-generated assessment. Questions are presented one-by-one.
            </p>

            <div className={styles.quizStats} style={{ marginBottom: '3rem' }}>
              <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} color="var(--accent)" /> {questions.length} MCQs
              </div>
              <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="var(--accent)" /> 5 Minutes Limit
              </div>
              <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'capitalize' }}>
                <Star size={18} color="#F59E0B" /> {level} Level
              </div>
            </div>

            <button 
              onClick={() => setStarted(true)}
              className={styles.primaryBtn} 
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              Start Exam Now
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Active quiz screen (one MCQ at a time)
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container} style={{ minHeight: '80vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${styles.featureCard} glass`} 
          style={{ padding: '1.5rem 2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--accent)' }}>
              QUESTION {currentQuestionIndex + 1} OF {questions.length} ({subject.toUpperCase()})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#FEE2E2', color: '#EF4444', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </div>
          </div>

          <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)', borderRadius: '10px' }}
              />
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.35', color: 'var(--text-dark)' }}>
            {currentQuestion?.questionText}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {currentQuestion?.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.005, background: '#F9FAFB' }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => handleSelect(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--card-border)',
                    background: isSelected ? 'rgba(124, 92, 255, 0.05)' : '#FFFFFF',
                    fontSize: '0.95rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-dark)',
                    minHeight: '50px'
                  }}
                >
                  <span style={{ paddingRight: '0.5rem' }}>{option}</span>
                  {isSelected && <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />}
                </motion.button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <button 
              className={styles.secondaryBtn} 
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.7rem', fontSize: '0.95rem', opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: 'pointer' }}
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button 
              className={styles.primaryBtn} 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.7rem', fontSize: '0.95rem', opacity: selectedAnswers[currentQuestionIndex] === undefined ? 0.7 : 1, cursor: 'pointer' }}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CustomQuizPage() {
  return (
    <Suspense fallback={
      <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading Quiz Engine...</p>
      </div>
    }>
      <CustomQuizRunner />
    </Suspense>
  );
}
