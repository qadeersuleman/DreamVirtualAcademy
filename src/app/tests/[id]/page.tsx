'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Trophy, RefreshCcw, CheckCircle2, ArrowRight, ArrowLeft, ArrowLeftCircle, ThumbsUp, BookOpen, AlertCircle, GraduationCap } from 'lucide-react';
import { mockTestsData, type MockQuestion, type SubjectData } from '@/data/mockTestsData';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import styles from '@/app/page.module.css';

export default function TakeTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = Number(params?.id);

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // States
  const [testDetails, setTestDetails] = useState<SubjectData | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth state and find the corresponding test
  useEffect(() => {
    async function init() {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Find local test data
      const localTest = mockTestsData.find((t) => t.id === testId);
      if (!localTest) {
        // Redirect back if test id is invalid
        router.push('/tests');
        return;
      }
      setTestDetails(localTest);

      try {
        // Attempt to fetch from Supabase tests table first
        const { data: dbTest, error: dbError } = await supabase
          .from('tests')
          .select('*')
          .eq('id', testId)
          .single();

        if (dbTest && !dbError) {
          // If found in DB, merge details
          setTestDetails({
            id: dbTest.id,
            title: dbTest.title,
            category: dbTest.category,
            timeLimit: dbTest.time_limit,
            mcqsCount: dbTest.mcqs,
            questions: localTest.questions // local questions as fallback
          });
        }
      } catch (err) {
        console.log("Supabase fetch error, using local fallback", err);
      } finally {
        setLoading(false);
      }
    }
    if (testId) {
      init();
    }
  }, [testId, router]);

  // 2. Handle Difficulty Selection & Fetch Questions
  const handleSelectDifficulty = async (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    setLoading(true);

    let selectedQuestions = [];

    try {
      // Attempt to load questions from Supabase questions table
      const { data: dbQuestions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('test_id', testId)
        .eq('difficulty', level);

      if (dbQuestions && dbQuestions.length > 0 && !error) {
        selectedQuestions = dbQuestions.map(q => ({
          questionText: q.question_text,
          options: q.options,
          correctAnswer: q.correct_answer
        }));
      } else {
        // Fallback to local questions
        selectedQuestions = testDetails.questions[level] || [];
      }
    } catch (err) {
      console.log("Could not load questions from DB, falling back to local dataset.", err);
      selectedQuestions = testDetails.questions[level] || [];
    }

    setQuestions(selectedQuestions);
    setTimeLeft(testDetails.timeLimit * 60); // Set time limit
    setStarted(true);
    setLoading(false);
  };

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
          test_id: testId,
          score: finalScore,
          total_questions: questions.length,
          difficulty: difficulty
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

  // 3. Timer Effect
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
    setStarted(false);
    setDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setTimeLeft(0);
  };

  if (loading) {
    return (
      <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="bg-mesh" />
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid var(--accent)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading Exam Details...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className={styles.container} style={{ minHeight: '90vh', paddingTop: '140px' }}>
        <div className="bg-mesh" />
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
                <>Mastermind! <Trophy size={28} color="#EAB308" /></>
              ) : percentage >= 50 ? (
                <>Good Effort! <ThumbsUp size={28} color="#3DBE7A" /></>
              ) : (
                <>Keep Learning! <BookOpen size={28} color="var(--accent)" /></>
              )}
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              You scored <strong style={{ color: 'var(--accent)' }}>{score} out of {questions.length}</strong> questions correctly on <strong style={{ textTransform: 'capitalize' }}>{difficulty}</strong> difficulty.
            </p>

            {!user && (
              <div style={{ background: 'rgba(255, 165, 0, 0.1)', color: 'orange', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '2rem', border: '1px solid orange', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <AlertCircle size={18} />
                <span><strong>Notice:</strong> Your result was not saved. Log in to track your scores in the personal dashboard.</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className={styles.primaryBtn} onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <RefreshCcw size={18} /> Retry Test
                </button>
                <button className={styles.secondaryBtn} onClick={() => router.push('/tests')} style={{ cursor: 'pointer' }}>
                    Back to Tests
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className={styles.container} style={{ minHeight: '90vh', paddingTop: '140px' }}>
        <div className="bg-mesh" />
        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <button 
              onClick={() => router.push('/tests')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: 600 }}
            >
              <ArrowLeftCircle size={20} /> Back to Hub
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles.featureCard} glass`} 
            style={{ border: '2px solid var(--accent)' }}
          >
            <div className={styles.cardTag}>{testDetails?.category} EXAM</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <GraduationCap size={48} color="var(--accent)" />
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{testDetails?.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Simulate actual competitive conditions. Choose a difficulty level below to configure your questions:
            </p>

            <div className={styles.quizStats}>
              <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} color="var(--accent)" /> {testDetails?.mcqsCount} MCQs Available
              </div>
              <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="var(--accent)" /> {testDetails?.timeLimit} Minutes limit
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={() => handleSelectDifficulty('easy')}
                className={styles.secondaryBtn} 
                style={{ padding: '1rem', background: '#ecfdf5', border: '1px solid #10b981', color: '#047857', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span>Easy Mode</span>
              </button>
              <button 
                onClick={() => handleSelectDifficulty('medium')}
                className={styles.secondaryBtn}
                style={{ padding: '1rem', background: '#fffbeb', border: '1px solid #f59e0b', color: '#b45309', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                <span>Medium Mode</span>
              </button>
              <button 
                onClick={() => handleSelectDifficulty('hard')}
                className={styles.secondaryBtn}
                style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #ef4444', color: '#b91c1c', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span>Hard Mode</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Active quiz screen
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container} style={{ minHeight: '90vh', paddingTop: '140px' }}>
      <div className="bg-mesh" />
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${styles.featureCard} glass`} 
          style={{ padding: '3rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)' }}>
              QUESTION {currentQuestionIndex + 1} OF {questions.length} ({difficulty?.toUpperCase()})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEE2E2', color: '#EF4444', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold' }}>
              <Clock size={16} /> {formatTime(timeLeft)}
            </div>
          </div>

          <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '10px', marginBottom: '3rem' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)', borderRadius: '10px' }}
              />
          </div>

          <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem', lineHeight: '1.4' }}>
            {currentQuestion?.questionText}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
            {currentQuestion?.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, background: '#F9FAFB' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelect(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '1.2rem 1.5rem',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--card-border)',
                    background: isSelected ? 'rgba(124, 92, 255, 0.05)' : '#FFFFFF',
                    fontSize: '1.1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-dark)'
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 size={22} color="var(--accent)" />}
                </motion.button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
            <button 
              className={styles.secondaryBtn} 
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: 'pointer' }}
            >
              <ArrowLeft size={18} /> Previous
            </button>
            <button 
              className={styles.primaryBtn} 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: selectedAnswers[currentQuestionIndex] === undefined ? 0.7 : 1, cursor: 'pointer' }}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
