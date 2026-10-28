'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import styles from '../privacy-policy/page.module.css';

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      <div className={styles.content}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className={styles.header}>
          <div className={styles.badge}>
            <FileText size={16} />
            TERMS & CONDITIONS
          </div>
          <h1>Terms of Service</h1>
          <p className={styles.subtitle}>
            Last updated: October 2026 • Dreams Virtual Academy
          </p>
        </header>

        <article className={styles.article}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using <strong>Dreams Virtual Academy</strong> (<code>https://www.dreamsacademy.online</code>), 
              you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, 
              please refrain from using our educational services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Educational Content & Intellectual Property</h2>
            <p>
              All video lectures, notes, diagram summaries, mock tests, and question banks available on Dreams Virtual Academy 
              are curated for student learning and personal academic preparation. Commercial reproduction or unauthorized redistribution 
              of course materials without explicit written permission is prohibited.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. User Accounts & Security</h2>
            <p>
              When creating an account, you agree to provide accurate information and keep your credentials confidential. You are responsible 
              for all activities that occur under your account.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Advertisements & Third-Party Content</h2>
            <p>
              Dreams Virtual Academy may display advertisements served by Google AdSense and other trusted advertising networks. 
              We do not endorse any third-party products, services, or claims advertised through automated ad units.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Contact Information</h2>
            <p>
              For inquiries, feedback, or permissions, contact:
            </p>
            <ul>
              <li><strong>Academy:</strong> Dreams Virtual Academy</li>
              <li><strong>Support WhatsApp:</strong> +92 301 8183624</li>
              <li><strong>Domain:</strong> https://www.dreamsacademy.online</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}

