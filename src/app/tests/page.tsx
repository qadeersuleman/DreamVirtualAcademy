import styles from './page.module.css';
import Link from 'next/link';

export default function MockTestsPage() {
  const tests = [
    { id: 1, title: "FPSC General Knowledge #4", mcqs: 50, time: 60, difficulty: 70, category: "FPSC" },
    { id: 2, title: "CSS English Précis & Composition", mcqs: 30, time: 45, difficulty: 90, category: "CSS" },
    { id: 3, title: "PPSC Everyday Science Quiz", mcqs: 40, time: 30, difficulty: 50, category: "PPSC" },
    { id: 4, title: "Computer Science - Mock Test", mcqs: 25, time: 20, difficulty: 40, category: "General" },
  ];

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerText}>
             <span className={styles.badge}>MOCK TESTS</span>
             <h1>Online Practice Hub</h1>
             <p>Simulate real exam conditions with our curated mock tests.</p>
          </div>
        </header>

        {/* Filters Section */}
        <section className={`${styles.filters} glass`}>
          <div className={styles.filterGroup}>
             <label>SUBJECT</label>
             <select className={styles.select}>
                <option>All Subjects</option>
                <option>English</option>
                <option>Mathematics</option>
                <option>General Knowledge</option>
             </select>
          </div>
          <div className={styles.filterGroup}>
             <label>DIFFICULTY</label>
             <select className={styles.select}>
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Hard</option>
             </select>
          </div>
          <div className={styles.filterGroup}>
             <label>TEST TYPE</label>
             <select className={styles.select}>
                <option>Mock Exams</option>
                <option>Topic Quizzes</option>
                <option>Past Papers</option>
             </select>
          </div>
          <button className={styles.filterBtn}>Apply Filters</button>
        </section>

        {/* Test List Grid */}
        <div className={styles.testGrid}>
          {tests.map((test) => (
            <div key={test.id} className={`${styles.testCard} glass animate-fade-in-up`}>
              <div className={styles.cardHeader}>
                 <span className={styles.catBadge}>{test.category}</span>
                 <h3>{test.title}</h3>
              </div>
              
              <div className={styles.metaRow}>
                 <div className={styles.meta}>
                    <span>📝</span>
                    <p>{test.mcqs} MCQs</p>
                 </div>
                 <div className={styles.meta}>
                    <span>⏱️</span>
                    <p>{test.time} Min</p>
                 </div>
              </div>

              <div className={styles.difficultySection}>
                 <div className={styles.diffHeader}>
                    <p>DIFFICULTY</p>
                    <span>{test.difficulty}%</span>
                 </div>
                 <div className={styles.progressBar}>
                    <div 
                      className={styles.pFill} 
                      style={{ 
                        width: `${test.difficulty}%`,
                        background: test.difficulty > 80 ? 'var(--error)' : test.difficulty > 50 ? 'var(--warning)' : 'var(--success)'
                      }} 
                    />
                 </div>
              </div>

              <Link href={`/tests/${test.id}`} className={styles.startBtn}>
                Start Today's Quiz
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
