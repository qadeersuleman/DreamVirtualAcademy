'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      <div className={styles.content}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className={styles.header}>
          <div className={styles.badge}>
            <ShieldCheck size={16} />
            LEGAL & PRIVACY COMPLIANCE
          </div>
          <h1>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Last updated: October 2026 • Dreams Virtual Academy
          </p>
        </header>

        <article className={styles.article}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Dreams Virtual Academy</strong> (accessible from <code>https://www.dreamsacademy.online</code>). 
              We are committed to protecting the privacy, security, and educational progress of our students and visitors. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you access our video lectures, study notes, mock tests, and interactive quizzes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Collect</h2>
            <p>
              When you use Dreams Virtual Academy, we may collect the following information:
            </p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, and optional profile data when registering.</li>
              <li><strong>Academic Progress:</strong> Quiz scores, practice test results, and lecture completion history to provide personalized learning insights.</li>
              <li><strong>Log Data & Cookies:</strong> Standard web log details including browser type, device information, and IP address for security and performance optimization.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Google AdSense & Third-Party Advertising</h2>
            <p>
              We partner with third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. 
              These companies may use cookies, web beacons, and similar tracking technologies to gather non-personally identifiable information about your visits to this and other websites in order to provide relevant advertisements about goods and services of interest to you.
            </p>
            <ul>
              <li>Google, as a third-party vendor, uses cookies (such as the DoubleClick cookie) to serve ads based on your visit to Dreams Virtual Academy and other sites on the Internet.</li>
              <li>You may opt out of the use of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Children&apos;s Information & Student Safety</h2>
            <p>
              Dreams Virtual Academy is an educational platform designed for academic growth. We do not knowingly collect personally identifiable information from children under 13 without verifiable parental or guardian consent. If you believe your child has provided personal information on our platform, please contact us immediately so we can promptly remove such records.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Data Security</h2>
            <p>
              We employ strict industry-standard security protocols and encryption (via Supabase and secure HTTPS) to prevent unauthorized access, alteration, or disclosure of user data.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy, please reach out to us:
            </p>
            <ul>
              <li><strong>Academy:</strong> Dreams Virtual Academy</li>
              <li><strong>Director:</strong> Sir Dilshad Murtaza</li>
              <li><strong>WhatsApp / Phone:</strong> +92 301 8183624</li>
              <li><strong>Website:</strong> <a href="https://www.dreamsacademy.online">https://www.dreamsacademy.online</a></li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}

