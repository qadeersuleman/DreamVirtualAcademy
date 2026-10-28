'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Video, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { WhatsAppIcon, YoutubeIcon } from '@/components/Icons';
import CountUp from '@/components/CountUp';
import styles from './page.module.css';

const facultyMembers = [
  {
    name: 'Sir Dilshad Murtaza',
    sindhiName: 'سر دلشاد مرتضيٰ',
    role: 'Director & Lead Physics/Science Instructor',
    education: 'M.Sc Physics • Senior Educator',
    experience: '8+ Years Teaching STBB & STS Preparation',
    image: '/images/faculty/dilshad-murtaza.jpg',
    specialties: ['Physics (Class 9th-12th)', 'Human Biology & Excretory System', 'STS / JST Screening Prep'],
  },
  {
    name: 'Sir Sabbir Ali',
    sindhiName: 'سر صبير علي',
    role: 'English Mastery & Pedagogy Specialist',
    education: 'M.A English Linguistics & Literature',
    experience: '7+ Years Coaching Competitive Exams',
    image: '/images/faculty/sabbir-ali.jpg',
    specialties: ['English Grammar & Syntax', 'Pedagogy & Teaching Methodology', 'Vocabulary & Comprehension'],
  },
  {
    name: 'Sir Zaheer Ali',
    sindhiName: 'سر ظهير علي',
    role: 'Mathematics & Quantitative Aptitude Lead',
    education: 'B.E. (Bachelor of Engineering)',
    experience: '6+ Years Engineering Math & Aptitude',
    image: '/images/faculty/zaheer-ali.jpg',
    specialties: ['Algebra & Geometry', 'IBA Sukkur Quantitative Shortcuts', 'Analytical Reasoning'],
  },
  {
    name: 'Sir Imran Ali',
    sindhiName: 'سر عمران علي',
    role: 'Senior Chemistry Coach',
    education: 'M.Sc Organic Chemistry',
    experience: '6+ Years Board Coaching',
    image: '/images/faculty/imran-ali.jpg',
    specialties: ['Organic Reactions & Equations', 'Periodic Table & Stoichiometry', 'STBB Board Numerical MCQs'],
  },
];

const milestones = [
  { value: 15000, suffix: '+', label: 'Sindhi Students Guided' },
  { value: 85, suffix: '+', label: 'Full Syllabus Video Lessons' },
  { value: 100, suffix: '%', label: 'Free Open Educational Access' },
  { value: 4, suffix: ' Experts', label: 'Dedicated Subject Mentors' },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />

      <div className={styles.content}>
        {/* Navigation Breadcrumb */}
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Header */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <GraduationCap size={16} />
            ABOUT DREAMS VIRTUAL ACADEMY
          </div>
          <h1>Empowering Sindhi Students Through Science & Excellence</h1>
          <p className={styles.sindhiSubtitle}>
            ڊريمز ورچوئل اڪيڊمي بابت: سنڌي ٻوليءَ ۾ معياري سائنسي ۽ تعليمي سفر
          </p>
          <p className={styles.leadText}>
            Dreams Virtual Academy is Sindh&apos;s premier online learning initiative dedicated to making quality science, physics, chemistry, mathematics, and competitive exam preparation accessible to every student in easy Sindhi and English.
          </p>
        </header>

        {/* Quick Stats Grid */}
        <section className={styles.statsGrid}>
          {milestones.map((item, i) => (
            <div key={i} className={styles.statCard}>
              <h3>
                <CountUp end={item.value} suffix={item.suffix} duration={2.2} />
              </h3>
              <p>{item.label}</p>
            </div>
          ))}
        </section>

        {/* Mission & Vision Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <Sparkles size={14} />
              OUR MISSION & VISION
            </span>
            <h2>Why We Built Dreams Virtual Academy</h2>
          </div>
          <div className={styles.twoColumn}>
            <div>
              <p>
                Founded by Sir Dilshad Murtaza, Dreams Virtual Academy was established with a singular, clear vision: 
                <strong> to break linguistic and geographical barriers in STEM education</strong> for students across all districts of Sindh.
              </p>
              <p>
                Often, complex concepts in Physics, Human Anatomy, and Chemistry are explained in dense English or foreign terminology that disconnects young learners from core principles. 
                At Dreams Virtual Academy, we teach science in the student&apos;s mother tongue (Sindhi) combined with international scientific terminology, creating deep conceptual understanding rather than rote memorization.
              </p>
            </div>
            <div>
              <ul className={styles.checklist}>
                <li>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span><strong>Sindh Textbook Board (STBB) Aligned:</strong> Complete classes 8th, 9th, and 10th curricula mapped chapter-by-chapter.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span><strong>Competitive Job Test Prep:</strong> Specialized focus on STS IBA Sukkur (BPS-05 to 15), JST, PST, and Educator tests.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span><strong>Visual Diagram Learning:</strong> High-yield hand-drawn anatomical diagrams for Brain, Heart, Kidney, and Respiratory structures.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span><strong>Interactive Test Engine:</strong> Real-time automated MCQs practice with instant scoring and explanation reviews.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Faculty Mentors Grid */}
        <section className={styles.facultySection}>
          <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
            <span className={styles.sectionBadge} style={{ margin: '0 auto 0.75rem' }}>
              <Users size={14} />
              EXPERT TEACHING FACULTY
            </span>
            <h2>Meet Our Renowned Educators</h2>
            <p style={{ maxWidth: '650px', margin: '0.5rem auto 2.5rem', color: 'var(--text-light)' }}>
              Dedicated teachers with advanced degrees, years of board evaluation experience, and a shared passion for student mentorship.
            </p>
          </div>

          <div className={styles.facultyGrid}>
            {facultyMembers.map((teacher, idx) => (
              <div key={idx} className={styles.facultyCard}>
                <div className={styles.facultyImgWrapper}>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className={styles.facultyImg}
                  />
                  <div className={styles.facultyBadgeOverlay}>{teacher.experience}</div>
                </div>
                <div className={styles.facultyInfo}>
                  <div className={styles.facultySindhiName}>{teacher.sindhiName}</div>
                  <h3 className={styles.facultyName}>{teacher.name}</h3>
                  <div className={styles.facultyRole}>{teacher.role}</div>
                  <div className={styles.facultyEdu}>{teacher.education}</div>
                  <div className={styles.specialtiesList}>
                    {teacher.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className={styles.specialtyTag}>{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Support Section */}
        <section className={`${styles.sectionCard} ${styles.ctaSection}`}>
          <div className={styles.ctaContent}>
            <h2>Have Questions or Need Guidance?</h2>
            <p>
              Connect directly with our administration and faculty for admission assistance, batch schedules, or academic counseling.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20would%20like%20information%20about%20Dreams%20Virtual%20Academy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <WhatsAppIcon size={20} /> Chat on WhatsApp (0301-8183624)
              </a>
              <a
                href="https://youtube.com/@DreamsScienceAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeBtn}
              >
                <YoutubeIcon size={20} /> Watch on YouTube Channel
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

