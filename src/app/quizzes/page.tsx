import { createClient } from '@/lib/supabase/server';
import styles from '../page.module.css';
import QuizApp from '@/components/QuizApp';

export default async function QuizzesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      <section className={styles.section} style={{paddingTop: '140px'}}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>DAILY CHALLENGE</span>
          <h1>Interactive Learning</h1>
          <p>Boost your knowledge with our daily interactive concept-based quiz challenges and real-time results.</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
          {/* Main Quiz App for Physics & Logic */}
          <QuizApp user={user} />
        </div>

        <div className={styles.sectionHeader}>
           <h2>Other Challenges</h2>
           <p>These challenges are unlocked for your practice session.</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper}>🧠</div>
             <h3>Mathematics Blitz</h3>
             <p>10 Questions • 15 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper}>🔬</div>
             <h3>Everyday Science</h3>
             <p>10 Questions • 10 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper}>✨</div>
             <h3>Grammar Skill</h3>
             <p>5 Questions • 5 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
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
