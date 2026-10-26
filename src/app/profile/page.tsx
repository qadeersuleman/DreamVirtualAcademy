import styles from './page.module.css';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.profileContent}>
        <header className={styles.header}>
          <h1>Your <span className={styles.accentText}>Profile</span></h1>
          <p>Manage your account and track your learning journey.</p>
        </header>

        <section className={styles.mainGrid}>
          {/* Left Column: Info */}
          <div className={`${styles.infoCard} glass`}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Profile" 
                  className={styles.avatar} 
                />
                <button className={styles.editAvatar}>📷</button>
              </div>
              <div className={styles.nameSection}>
                <h2>Qadeer</h2>
                <span className={styles.badge}>Premium Member</span>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <label>Email</label>
                <p>qadeer@example.com</p>
              </div>
              <div className={styles.detailItem}>
                <label>Phone</label>
                <p>+92 300 1234567</p>
              </div>
              <div className={styles.detailItem}>
                <label>Joined</label>
                <p>March 2026</p>
              </div>
              <div className={styles.detailItem}>
                <label>Target Exam</label>
                <p>FPSC General Knowledge</p>
              </div>
            </div>

            <button className={`${styles.btn} ${styles.primary}`}>Edit Personal Info</button>
          </div>

          {/* Right Column: Stats & Settings */}
          <div className={styles.rightCol}>
            <div className={`${styles.statsCard} glass`}>
              <h3>Learning Progress</h3>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>12</span>
                  <p>Tests Taken</p>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>85%</span>
                  <p>Average Score</p>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>450</span>
                  <p>XP Earned</p>
                </div>
              </div>
            </div>

            <div className={`${styles.settingsCard} glass`}>
              <h3>Account Settings</h3>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <span>🔔 Notifications</span>
                  <div className={styles.toggle} />
                </div>
                <div className={styles.settingItem}>
                  <span>🌙 Dark Mode</span>
                  <div className={styles.toggleActive} />
                </div>
                <div className={styles.settingItem}>
                  <span>🔒 Change Password</span>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </div>
            
            <Link href="/dashboard" className={`${styles.btn} glass`}>
              Go to Dashboard
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
