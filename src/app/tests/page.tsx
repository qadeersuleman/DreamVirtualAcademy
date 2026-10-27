'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileQuestion, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function MockTestsPage() {
  const router = useRouter();

  // Filter States
  const [subject, setSubject] = useState('Science');
  const [level, setLevel] = useState('easy');
  const [testType, setTestType] = useState('Mock Exams');

  const handleStartCustomTest = () => {
    // Navigate to the custom step-by-step test take route
    router.push(`/tests/custom?subject=${encodeURIComponent(subject)}&level=${level}&type=${encodeURIComponent(testType)}`);
  };

  // Pre-configured quick-start tests matching our subjects
  const featuredTests = [
    { id: 1, title: "STS / IBA Sukkur General Science Test", subject: "Science", level: "easy", type: "Mock Exams", mcqs: 10, time: 10, difficultyPercentage: 45 },
    { id: 2, title: "JST Pedagogy & Teaching Methodology", subject: "Science", level: "medium", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 60 },
    { id: 3, title: "Physics Laws of Motion & Units Test", subject: "Physics", level: "medium", type: "Past Papers", mcqs: 10, time: 10, difficultyPercentage: 70 },
    { id: 4, title: "Chemistry Acids & Reactions Practice", subject: "Chemistry", level: "easy", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 45 },
    { id: 5, title: "Class 9th & 10th Mathematics Test", subject: "Mathematics", level: "medium", type: "Topic Quizzes", mcqs: 10, time: 10, difficultyPercentage: 65 },
    { id: 6, title: "Computer Basics Fundamentals", subject: "Computer Basics", level: "easy", type: "Mock Exams", mcqs: 10, time: 10, difficultyPercentage: 35 }
  ];

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerText} style={{ paddingTop: '140px' }}>
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
               <img 
                 src="/images/logo-variants/07_horizontal_color_light.png" 
                 alt="Dreams Virtual Academy Mock Tests" 
                 style={{ height: '44px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
               />
             </div>
             <span className={styles.badge}>EXAM GENERATOR</span>
             <h1>Custom Practice Tests & Mock Exams</h1>
             <p style={{ fontFamily: 'var(--font-sindhi), "Noto Sans Arabic"', fontSize: '1.4rem', color: 'var(--accent)', direction: 'rtl', margin: '0.5rem 0 1rem' }}>
               سنڌي شاگردن لاءِ آنلائن ايم سي ڪيوز ٽيسٽ ۽ امتحانن جي مشق
             </p>
             <p>Generate customized academic & science assessments based on your level and subject choice.</p>
          </div>
        </header>

        {/* Dynamic Generator Section */}
        <section className={`${styles.filters} glass`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'end', gap: '1.5rem', margin: '2rem auto 4rem', maxWidth: '1000px', padding: '2rem' }}>
          <div className={styles.filterGroup}>
             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Subject</label>
             <select 
               className={styles.select} 
               value={subject} 
               onChange={(e) => setSubject(e.target.value)}
               style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'white', fontSize: '1rem', color: 'var(--text-dark)' }}
             >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Computer Basics">Computer Basics</option>
             </select>
          </div>
          
          <div className={styles.filterGroup}>
             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Difficulty Level</label>
             <select 
               className={styles.select} 
               value={level} 
               onChange={(e) => setLevel(e.target.value)}
               style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'white', fontSize: '1rem', color: 'var(--text-dark)' }}
             >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
             </select>
          </div>

          <div className={styles.filterGroup}>
             <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Test Type</label>
             <select 
               className={styles.select} 
               value={testType} 
               onChange={(e) => setTestType(e.target.value)}
               style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'white', fontSize: '1rem', color: 'var(--text-dark)' }}
             >
                <option value="Mock Exams">Mock Exams</option>
                <option value="Topic Quizzes">Topic Quizzes</option>
                <option value="Past Papers">Past Papers</option>
             </select>
          </div>

          <button 
            onClick={handleStartCustomTest}
            className={styles.filterBtn}
            style={{ padding: '0.9rem 2rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.3s' }}
          >
            Start Custom Test
          </button>
        </section>

        {/* Featured Quick Start Cards */}
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Featured Science & Math Tests</h2>
        <div className={styles.testGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {featuredTests.map((test, idx) => (
            <motion.div 
              key={test.id} 
              className={`${styles.testCard} glass shimmer-hover`} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', background: 'white', borderRadius: '24px', border: '1px solid var(--card-border)' }}
            >
              <div>
                <div className={styles.cardHeader} style={{ marginBottom: '1.5rem' }}>
                   <span className={styles.catBadge} style={{ background: 'rgba(124, 92, 255, 0.1)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800 }}>{test.type}</span>
                   <h3 style={{ fontSize: '1.4rem', marginTop: '1rem', color: 'var(--text-dark)' }}>{test.title}</h3>
                </div>
                
                <div className={styles.metaRow} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                   <div className={styles.meta} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileQuestion size={16} color="var(--accent)" />
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-light)' }}>{test.mcqs} MCQs</p>
                   </div>
                   <div className={styles.meta} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="#FF8C42" />
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-light)' }}>{test.time} Min</p>
                   </div>
                </div>

                <div className={styles.difficultySection} style={{ marginBottom: '1.5rem' }}>
                   <div className={styles.diffHeader} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                      <p style={{ margin: 0 }}>AVERAGE DIFFICULTY</p>
                      <span>{test.difficultyPercentage}%</span>
                   </div>
                   <div className={styles.progressBar} style={{ height: '6px', background: '#eee', borderRadius: '99px', overflow: 'hidden' }}>
                      <div 
                        className={styles.pFill} 
                        style={{ 
                          height: '100%',
                          width: `${test.difficultyPercentage}%`,
                          background: test.difficultyPercentage > 80 ? 'red' : test.difficultyPercentage > 50 ? 'orange' : 'green'
                        }} 
                      />
                   </div>
                </div>
              </div>

              <button 
                onClick={() => router.push(`/tests/custom?subject=${encodeURIComponent(test.subject)}&level=${test.level}&type=${encodeURIComponent(test.type)}`)} 
                className={styles.startBtn}
                style={{ width: '100%', padding: '1rem', textAlign: 'center', display: 'block', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                Launch Test Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
