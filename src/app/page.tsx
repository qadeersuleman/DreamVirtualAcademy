import styles from './page.module.css';
import Link from 'next/link';

const popularPlaylists = [
  { category: "Physics", title: "Mechanics & Relativity Masterclass", videos: 18, hours: 9 },
  { category: "Chemistry", title: "Organic Chemistry: Fundamentals to Advanced", videos: 22, hours: 11 },
  { category: "Mathematics", title: "Calculus & Analytical Geometry", videos: 25, hours: 14 }
];

const testimonials = [
  { name: "Aisha Rehman", role: "FSc Pre-Medical Student", text: "This platform completely changed how I learn. The mock tests are incredibly helpful, and the UI is just amazing!" },
  { name: "Bilal Ahmed", role: "CSS Aspirant", text: "The Everyday Science and GK quizzes helped me clear my screening test with ease. Extremely recommended!" },
  { name: "Mariam Khan", role: "O-Level Physics Student", text: "The smart notes and interactive mock tests saved my exams. Concepts are explained so clearly!" }
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background Mesh */}
      <div className="bg-mesh" />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Main Content Area */}
          <div className={`${styles.heroMain} animate-fade-in-up`}>
            {/* Left Column: Text */}
            <div className={styles.heroText}>

              <span className={`${styles.badge} animate-float`}>#1 Virtual Academy in Sindh</span>
              <h1 className={styles.title}>
                Dreams Virtual <span className={styles.accentText}>Academy</span>
              </h1>
              <p className={styles.subtitle}>
                Master the subjects that matter. From Physics and Chemistry to Mathematics and Biology, join the modern education revolution and build your academic future today.
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/register" className={styles.primaryBtn}>Get Started</Link>
                <button className={styles.secondaryBtn}>View Courses</button>
              </div>
            </div>

            {/* Right Column: Illustration */}
            <div className={styles.heroImage}>
              <img
                src="/illustration-hero.png"
                alt="Student Illustration"
                className={styles.illustration}
              />
            </div>
          </div>

          {/* Search Bar Section */}
          <div className={styles.searchSection}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search Notes / Tests / Videos / Quizzes..."
                className={styles.searchInput}
              />
              <button className={styles.searchBtn}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Top Features Section */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={`${styles.card} glass`}>
            <div className={styles.iconWrapper}>📝</div>
            <h3>Mock Tests</h3>
            <p>Timed exams with instant results and detailed explanations for every answer.</p>
          </div>
          <div className={`${styles.card} glass`}>
            <div className={styles.iconWrapper}>📚</div>
            <h3>Smart Notes</h3>
            <p>Interactive PDF notes with flip animation and bookmarking for quick revision.</p>
          </div>
          <div className={`${styles.card} glass`}>
            <div className={styles.iconWrapper}>🎬</div>
            <h3>Video Lessons</h3>
            <p>High-quality video content from experienced educators, organized by subject.</p>
          </div>
        </div>
      </section>

      {/* Daily Quiz & Progress Card */}
      <section className={styles.section}>
        <div className={styles.dualGrid}>
          {/* Daily Quiz Card */}
          <div className={`${styles.featureCard} ${styles.quizCard}`}>
            <div className={styles.cardTag}>HOT!</div>
            <h2>Daily Quiz</h2>
            <p>Solve 10 random MCQs every day to maintain your streak and earn XP.</p>
            <div className={styles.quizStats}>
              <div className={styles.stat}>🔥 5 Day Streak</div>
              <div className={styles.stat}>⭐ +50 XP Today</div>
            </div>
            <button className={styles.quizBtn}>Start Today's Quiz</button>
          </div>

          {/* Progress Mini Tracker */}
          <div className={`${styles.featureCard} ${styles.progressCard}`}>
            <h2>Quick Progress</h2>
            <div className={styles.miniGraph}>
              <div className={styles.barLine} style={{ height: '40%' }}></div>
              <div className={styles.barLine} style={{ height: '70%' }}></div>
              <div className={styles.barLine} style={{ height: '90%' }}></div>
              <div className={styles.barLine} style={{ height: '60%' }}></div>
              <div className={styles.barLine} style={{ height: '85%' }}></div>
            </div>
            <p>Your performance has improved by <strong>15%</strong> this week!</p>
            <button className={styles.textBtn}>View Full Analytics →</button>
          </div>
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteCard}>
          <span className={styles.quoteMark}>"</span>
          <p>The best way to predict your future is to create it. Don't wait for opportunity, build it through learning.</p>
          <span className={styles.quoteAuthor}>— Visionary Mentor</span>
        </div>
      </section>

      {/* Popular Playlists */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Popular Playlists</h2>
          <p>Explore our most watched and loved course collections.</p>
        </div>
        <div className={styles.grid}>
          {popularPlaylists.map((playlist, idx) => (
            <div key={idx} className={styles.playlistCard}>
              <div className={styles.playImage}>
                <span className={styles.playIcon}>▶</span>
              </div>
              <div className={styles.playInfo}>
                <span className={styles.category}>{playlist.category}</span>
                <h4>{playlist.title}</h4>
                <p>{playlist.videos} Videos • {playlist.hours} Hours</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Success Stories</h2>
          <p>Hear from students who transformed their learning at Dreams Academy.</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={`${styles.testimonial} glass`}>
              <div className={styles.user}>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                  alt="User"
                />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
              <p>"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
            <h2>Dreams Virtual Academy</h2>
            <p>Your journey to academic excellence starts here. Learn, explore, and master key subjects for your bright future.</p>
            <div className={styles.socials}>
              <span>🌐</span> <span>📸</span> <span>🐦</span> <span>💼</span>
            </div>
          </div>
          <div className={styles.footerNav}>
            <h4>Quick Links</h4>
            <a href="/tests">Mock Tests</a>
            <a href="/notes">Notes Library</a>
            <a href="/videos">Videos</a>
            <a href="/daily-quiz">Daily Quiz</a>
          </div>
          <div className={styles.footerNav}>
            <h4>Support</h4>
            <a href="/contact">Contact Us</a>
            <a href="/faq">FAQs</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Dreams Virtual Academy. Created for Future Leaders.</p>
        </div>
      </footer>
    </div>
  );
}

