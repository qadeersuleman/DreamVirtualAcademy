import styles from '../page.module.css';

export default function QuizzesPage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      <section className={styles.section} style={{paddingTop: '140px'}}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>DAILY CHALLENGE</span>
          <h1>Interactive Quizzes</h1>
          <p>Boost your knowledge with our daily AI-powered quiz challenges.</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} glass`} style={{border: '2px solid var(--accent)'}}>
            <div className={styles.cardTag}>DAILY MCQS</div>
            <div className={styles.iconWrapper}>🔥</div>
            <h3>Physics & Logic</h3>
            <p>10 Questions • 15 Minutes</p>
            <button className={styles.primaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Start Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper}>🧠</div>
             <h3>Mathematics Blitz</h3>
             <p>10 Questions • 15 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper}>💻</div>
             <h3>General Knowledge</h3>
             <p>10 Questions • 10 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>
        </div>
      </section>

      {/* Leaderboard Placeholder */}
      <section className={styles.section}>
         <div className={styles.featureCard} style={{maxWidth: '800px', margin: '0 auto'}}>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Daily Leaderboard</h2>
            {[1, 2, 3].map((i) => (
               <div key={i} className={styles.user} style={{justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--card-border)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                     <span style={{fontWeight: 800, color: 'var(--accent)'}}>{i}</span>
                     <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=UserRank${i}`} 
                        alt="User" 
                        style={{width: '40px'}} 
                     />
                     <strong>Top Student {i}</strong>
                  </div>
                  <strong style={{color: 'var(--success)'}}>{1000 - i * 50} XP</strong>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
