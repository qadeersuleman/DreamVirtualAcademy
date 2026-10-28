'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Users,
  Video,
  FileText
} from 'lucide-react';
import { WhatsAppIcon, YoutubeIcon, FacebookIcon } from '@/components/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on pure auth screens for clean card presentation
  const isAuthPage = 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/forgot-password' || 
    pathname === '/reset-password';

  if (isAuthPage) return null;

  return (
    <footer className={styles.footer}>
      {/* Ambient Lighting Accents */}
      <div className={styles.footerGlowTop} />
      <div className={styles.ambientBlobLeft} />
      <div className={styles.ambientBlobRight} />

      {/* ─── Pre-Footer Community Action Bar ─── */}
      <div className={styles.preFooter}>
        <div className={styles.communityCard}>
          <div className={styles.communityContent}>
            <span className={styles.communityBadge}>
              <Sparkles size={12} />
              JOIN SINDH&apos;S BIGGEST VIRTUAL LEARNING MOVEMENT
            </span>
            <h3>
              <Users size={24} style={{ color: '#fbbf24' }} />
              10,000+ Students Learning Science in Sindhi
            </h3>
            <p>
              Get daily STS / JST test preparation MCQs, downloadable lecture slides, and live online batch announcements.
            </p>
          </div>

          <div className={styles.communityButtons}>
            <a
              href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20want%20to%20join%20Dreams%20Virtual%20Academy%20community"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappPill}
            >
              <WhatsAppIcon size={18} /> Join WhatsApp Group
            </a>
            <a
              href="https://youtube.com/@DreamsScienceAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtubePill}
            >
              <YoutubeIcon size={18} /> Subscribe YouTube
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Columns ─── */}
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Column 1: Brand & Sindhi Mission */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogoWrap}>
              <img
                src="/images/logo-title-light.png"
                alt="Dreams Virtual Academy"
                className={styles.brandLogoImg}
              />
            </Link>

            <div className={styles.sindhiMotto}>
              علم، تحقيق ۽ اعليٰ اخلاق ذريعي سنڌ جي شاگردن جي ڪاميابي
            </div>

            <p className={styles.brandBio}>
              Dreams Virtual Academy is Sindh&apos;s leading online educational platform. We deliver conceptually clear science, physics, and competitive exam coaching in simple Sindhi and English.
            </p>

            <div className={styles.socialRow}>
              <a
                href="https://wa.me/923018183624"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="WhatsApp Support"
              >
                <WhatsAppIcon size={20} />
              </a>
              <a
                href="https://youtube.com/@DreamsScienceAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Official YouTube Channel"
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Facebook Community"
              >
                <FacebookIcon size={20} />
              </a>
            </div>

            <div className={styles.trustBadges}>
              <span className={styles.trustBadgeItem}>
                <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                100% STBB Aligned
              </span>
              <span className={styles.trustBadgeItem}>
                <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                STS / JST Verified
              </span>
              <span className={styles.trustBadgeItem}>
                <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                Free Notes & Tests
              </span>
            </div>
          </div>

          {/* Column 2: Academic Subjects */}
          <div className={styles.navCol}>
            <h4>Academic Curricula</h4>
            <ul className={styles.navList}>
              <li>
                <Link href="/courses" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Live Online Batches 2026
                </Link>
              </li>
              <li>
                <Link href="/notes" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Class 10th Biology (STBB)
                </Link>
              </li>
              <li>
                <Link href="/videos" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Physics Numericals & Theory
                </Link>
              </li>
              <li>
                <Link href="/notes" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Human Anatomy Diagrams
                </Link>
              </li>
              <li>
                <Link href="/courses" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Chemistry Masterclass
                </Link>
              </li>
              <li>
                <Link href="/courses" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Mathematics Foundation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Exam Prep & Quick Links */}
          <div className={styles.navCol}>
            <h4>Exam Preparation</h4>
            <ul className={styles.navList}>
              <li>
                <Link href="/tests" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Online Mock Test Engine
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Daily Interactive Quizzes
                </Link>
              </li>
              <li>
                <Link href="/videos" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  STS IBA Sukkur (BPS 5-15)
                </Link>
              </li>
              <li>
                <Link href="/videos" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  JST & PST Pedagogy Lectures
                </Link>
              </li>
              <li>
                <Link href="/progress" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Student Progress Tracker
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.navLink}>
                  <span className={styles.linkDot} />
                  Faculty & Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Admission Hotline Desk */}
          <div className={styles.contactCol}>
            <h4>Admission & Support Desk</h4>
            <div className={styles.supportCard}>
              <div className={styles.statusIndicator}>
                <span className={styles.pulseDot} />
                Admissions Active (New Batch)
              </div>

              <div className={styles.directorRow}>
                <img
                  src="/images/faculty/dilshad-murtaza.jpg"
                  alt="Sir Dilshad Murtaza"
                  className={styles.directorAvatar}
                />
                <div className={styles.directorInfo}>
                  <h5>Sir Dilshad Murtaza</h5>
                  <p>Director & Lead Instructor</p>
                </div>
              </div>

              <div className={styles.feeDeskInfo}>
                <p style={{ margin: '0 0 0.4rem 0' }}>
                  Fee Verification via EasyPaisa / JazzCash:
                </p>
                <div className={styles.feeHighlight}>
                  0301-8183624 <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Dilshad Murtaza)</span>
                </div>
              </div>

              <a
                href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20want%20to%20enroll%20in%20Dreams%20Virtual%20Academy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.hotlineBtn}
              >
                <PhoneCall size={15} /> WhatsApp Admission Help
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Dreams Virtual Academy. Registered Academic Platform.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/about" className={styles.legalLink}>About Us</Link>
            <span className={styles.legalSep}>•</span>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.legalSep}>•</span>
            <Link href="/terms" className={styles.legalLink}>Terms & Conditions</Link>
          </div>

          <div className={styles.sindhPride}>
            <span>Made with</span>
            <Heart size={14} className={styles.heartIcon} />
            <span>for Sindh&apos;s Future Scholars (سنڌ شاگرد)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

