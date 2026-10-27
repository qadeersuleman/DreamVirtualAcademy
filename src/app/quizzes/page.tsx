import { createClient } from '@/lib/supabase/server';
import styles from '../page.module.css';
import QuizApp from '@/components/QuizApp';
import { Calculator, Microscope, Sparkles, Flame, Trophy } from 'lucide-react';

export default async function QuizzesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      <section className={styles.section} style={{paddingTop: '140px'}}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={14} />
            DAILY CHALLENGE
          </span>
          <h1>Interactive Learning & Daily Quizzes</h1>
          <p style={{ fontFamily: 'var(--font-sindhi), "Noto Sans Arabic"', fontSize: '1.4rem', color: 'var(--accent)', direction: 'rtl', margin: '0.5rem 0 1rem' }}>
            روزانو آنلائن ڪوئيز ۽ پنهنجي ذهني صلاحيتن جو امتحان
          </p>
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
             <div className={styles.iconWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Calculator size={28} color="var(--primary)" />
             </div>
             <h3>Mathematics Blitz</h3>
             <p>10 Questions • 15 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Microscope size={28} color="#0284C7" />
             </div>
             <h3>Everyday Science</h3>
             <p>10 Questions • 10 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>

          <div className={`${styles.card} glass`}>
             <div className={styles.iconWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Sparkles size={28} color="#FF8C42" />
             </div>
             <h3>Grammar Skill</h3>
             <p>5 Questions • 5 Minutes</p>
             <button className={styles.secondaryBtn} style={{width: '100%', marginTop: '1.5rem'}}>Unlock Quiz</button>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className={styles.section}>
         <div className={styles.featureCard} style={{maxWidth: '800px', margin: '0 auto'}}>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Daily Leaderboard (اڄ جا بهترين شاگرد)</h2>
            {[
              { rank: 1, name: "Tariq Ali (Sukkur)", xp: "1,250 XP", streak: "7 Day Streak", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
              { rank: 2, name: "Zainab Soomro (Larkana)", xp: "1,180 XP", streak: "5 Day Streak", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
              { rank: 3, name: "Naveed Ahmed (Hyderabad)", xp: "1,040 XP", streak: "4 Day Streak", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
            ].map((student) => (
               <div key={student.rank} className={styles.user} style={{justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--card-border)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                     <span style={{fontWeight: 800, color: 'var(--accent)'}}>#{student.rank}</span>
                     <img 
                        src={student.avatar} 
                        alt="User" 
                        style={{width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover'}} 
                     />
                     <div>
                       <strong>{student.name}</strong>
                       <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                         <Flame size={12} color="#FF8C42" /> {student.streak}
                       </span>
                     </div>
                  </div>
                  <strong style={{color: 'var(--success)'}}>{student.xp}</strong>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
