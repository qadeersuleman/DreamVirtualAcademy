'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Trophy, RefreshCcw, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Lock, Zap, ThumbsUp, BookOpen } from 'lucide-react';
import { physicsLogicQuiz, Question } from '@/data/quizzes';
import styles from '@/app/page.module.css';

interface QuizAppProps {
  user: any;
}

export default function QuizApp({ user }: QuizAppProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [active, setActive] = useState(true);

  // Timer logic
  useEffect(() => {
    if (started && !showResult && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleFinish();
    }
  }, [started, showResult, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = physicsLogicQuiz[currentQuestionIndex];

  const handleSelect = (index: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: index });
  };

  const handleNext = () => {
    if (currentQuestionIndex < physicsLogicQuiz.length - 1) {
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

  const handleFinish = () => {
    let finalScore = 0;
    physicsLogicQuiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setTimeLeft(900);
  };

  if (!user) {
    return (
      <div className={`${styles.featureCard} glass`} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Lock size={56} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Premium Quiz Locked</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Please login to your account to participate in daily general science challenges.
        </p>
        <button 
          className={styles.primaryBtn} 
          onClick={() => window.location.href = '/login'}
          style={{ padding: '0.8rem 2.5rem' }}
        >
          Login to Unlock
        </button>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / physicsLogicQuiz.length) * 100;
    return (
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
          You scored <strong style={{ color: 'var(--accent)' }}>{score} out of {physicsLogicQuiz.length}</strong> questions correctly.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className={styles.primaryBtn} onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RefreshCcw size={18} /> Retry Quiz
            </button>
            <button className={styles.secondaryBtn} onClick={() => window.location.href='/dashboard'}>
                Dashboard
            </button>
        </div>
      </motion.div>
    );
  }

  if (!started) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.featureCard} glass`} 
        style={{ border: '2px solid var(--accent)' }}
      >
        <div className={styles.cardTag}>100 XP REWARD</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Zap size={48} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>General Science Blitz</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Test your general scientific knowledge. You have 15 minutes to answer 10 questions.
        </p>

        <div className={styles.quizStats}>
          <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={20} color="var(--accent)" /> 10 Questions
          </div>
          <div className={styles.stat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="var(--accent)" /> 15 Minutes
          </div>
        </div>

        <button 
          className={styles.primaryBtn} 
          onClick={() => setStarted(true)}
          style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}
        >
          Begin Challenge
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${styles.featureCard} glass`} 
      style={{ padding: '3rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)' }}>
          QUESTION {currentQuestionIndex + 1} OF {physicsLogicQuiz.length}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEE2E2', color: '#EF4444', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold' }}>
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '10px', marginBottom: '3rem' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / physicsLogicQuiz.length) * 100}%` }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)', borderRadius: '10px' }}
          />
      </div>

      <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem', lineHeight: '1.4' }}>
        {currentQuestion.question}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
        {currentQuestion.options.map((option, idx) => {
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
                transition: 'all 0.2s ease'
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
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
        >
          <ArrowLeft size={18} /> Previous
        </button>
        <button 
          className={styles.primaryBtn} 
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
          style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: selectedAnswers[currentQuestionIndex] === undefined ? 0.7 : 1 }}
        >
          {currentQuestionIndex === physicsLogicQuiz.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
