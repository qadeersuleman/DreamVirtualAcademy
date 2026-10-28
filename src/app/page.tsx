'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  FileQuestion,
  BookOpen,
  Video,
  GraduationCap,
  Flame,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Play,
  ArrowRight,
  Microscope,
  Maximize2,
  Tag,
  Download,
  Share2,
  X,
  Languages,
} from 'lucide-react';
import { WhatsAppIcon, YoutubeIcon, FacebookIcon } from '@/components/Icons';
import styles from './page.module.css';

const facultyMembers = [
  {
    name: "Dilshad Murtaza",
    roleBadge: "CEO & FOUNDER",
    isCEO: true,
    title: "Science Teacher (Physics & Biology)",
    education: "Graduate",
    photo: "/images/faculty/dilshad-murtaza.jpg",
    subjects: ["Physics", "Biology", "STBB Science 7-10", "STS Pedagogy"],
    description: "Lead Educator & CEO of Dreams Virtual Academy. Transforming science & test preparation for Sindhi students.",
    whatsappMsg: "Salam Sir Dilshad! I want guidance on Science & Physics preparation.",
  },
  {
    name: "Sir Zaheer Ali",
    roleBadge: "MATHS LEAD",
    isCEO: false,
    title: "Mathematics Teacher",
    handle: "@ZaheerAliOfficials",
    education: "Graduate Engineer",
    photo: "/images/faculty/zaheer-ali.jpg",
    subjects: ["Mathematics", "Algebra", "Calculus", "STS Quant Tricks"],
    description: "Graduate Engineer helping students master mathematics & numerical problem-solving without fear.",
    whatsappMsg: "Salam Sir Zaheer Ali! I want guidance on Mathematics & Quantitative preparation.",
  },
  {
    name: "Sir Imran Ali",
    roleBadge: "CHEMISTRY SPECIALIST",
    isCEO: false,
    title: "Chemistry Teacher (9th - 12th)",
    education: "BS Chemistry",
    photo: "/images/faculty/imran-ali.jpg",
    subjects: ["Chemistry 9th", "Chemistry 10th", "Chemistry 11th", "Chemistry 12th"],
    description: "BS Chemistry expert with in-depth knowledge of Sindh Textbook Board chemical formulas & reactions.",
    whatsappMsg: "Salam Sir Imran Ali! I want guidance on Chemistry board exam coaching.",
  },
  {
    name: "Sir Sabbir Ali",
    roleBadge: "ENGLISH LEAD",
    isCEO: false,
    title: "English Teacher",
    education: "BS English",
    photo: "/images/faculty/sabbir-ali.jpg",
    subjects: ["English Mastery", "Grammar Rules", "Vocabulary", "Spoken English"],
    description: "BS English educator leading the English Mastery Course to build strong grammar & communication through Sindhi.",
    whatsappMsg: "Salam Sir Sabbir Ali! I want to enroll in the English Mastery Course.",
  },
];

type Diagram = {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  image: string;
  description: string;
  labels: string[];
};

const scienceDiagrams: Diagram[] = [
  {
    id: "heart",
    title: "Structure of Human Heart",
    sindhiTitle: "انساني دل جي بناوٽ ۽ رت جي گردش جو سرشتو",
    category: "Biology & Human Anatomy",
    image: "/images/gallery/heart-structure.jpg",
    description: "Detailed hand-drawn anatomical illustration showing atriums, ventricles, major vessels, and one-way valves regulating human blood circulation.",
    labels: [
      "Superior Vena Cava", "Aorta", "Pulmonary Artery", "Pulmonary Veins", 
      "Right Atrium", "Left Atrium", "Tricuspid Valve", "Mitral Valve", 
      "Right Ventricle", "Left Ventricle", "Pulmonary Valve", "Aortic Valve"
    ]
  },
  {
    id: "brain",
    title: "Structure of Human Brain",
    sindhiTitle: "انساني دماغ جي بناوٽ ۽ ان جا اهم حصا",
    category: "Class 8th STBB Science",
    image: "/images/gallery/brain-structure.jpg",
    description: "Color-coded diagram of the human brain lobes and internal nervous system structures aligned with Sindh Textbook Board curriculum.",
    labels: [
      "Frontal Lobe", "Parietal Lobe", "Occipital Lobe", "Temporal Lobe", 
      "Cerebellum", "Spinal Cord", "Medulla Oblongata", "Pons", 
      "Midbrain", "Corpus Callosum", "Thalamus", "Hypothalamus", "Pituitary Gland"
    ]
  },
  {
    id: "kidney",
    title: "Structure of Human Kidney",
    sindhiTitle: "گردي جي اندروني بناوٽ ۽ نيفرون سرشتو",
    category: "Class 8th STBB Science",
    image: "/images/gallery/kidney-structure.jpg",
    description: "Cross-section notebook diagram of the kidney explaining filtration, renal cortex, medullary pyramids, and urine passage into the ureter.",
    labels: [
      "Renal Cortex", "Renal Medulla", "Renal Pyramid", "Minor Calyx", 
      "Major Calyx", "Renal Pelvis", "Ureter", "Renal Capsule", 
      "Renal Hilum", "Renal Artery", "Renal Vein"
    ]
  },
  {
    id: "lungs",
    title: "Structure of Human Lungs & Alveoli",
    sindhiTitle: "ڦڦڙن ۽ ساهه کڻڻ جو مڪمل سرشتو",
    category: "Biology & Respiration",
    image: "/images/gallery/lungs-structure.jpg",
    description: "Complete respiratory pathway illustration including trachea, bronchial tree, lung lobes, and microscopic alveolus gas exchange (O2 & CO2).",
    labels: [
      "Larynx (Voice Box)", "Trachea (Windpipe)", "Right Bronchus", "Left Bronchus", 
      "Right Lung (3 Lobes)", "Left Lung (2 Lobes)", "Diaphragm", "Bronchiole", 
      "Alveoli (Air Sacs)", "Capillary Network", "Gas Exchange"
    ]
  }
];

const popularPlaylists = [
  {
    category: "STS / JST Prep",
    title: "Pedagogy & Teaching Methodology Complete Series",
    videos: 12,
    hours: 8,
    link: "/videos",
    thumbnail: "https://img.youtube.com/vi/VFVrHw5RR2o/hqdefault.jpg",
  },
  {
    category: "Science 8th (STBB)",
    title: "Human Brain, Kidney & Nervous System in Sindhi",
    videos: 15,
    hours: 10,
    link: "/videos",
    thumbnail: "https://img.youtube.com/vi/DLZ6h4QwgeQ/hqdefault.jpg",
  },
  {
    category: "Physics",
    title: "Refraction, Critical Angle & Laws of Motion",
    videos: 14,
    hours: 7,
    link: "/videos",
    thumbnail: "https://img.youtube.com/vi/bXvSG16rpXY/hqdefault.jpg",
  },
  {
    category: "Chemistry",
    title: "Acids, Chemical Reactions & Solved MCQs",
    videos: 10,
    hours: 6,
    link: "/videos",
    thumbnail: "https://img.youtube.com/vi/tfNyZX7-gf8/hqdefault.jpg",
  },
];

const testimonials = [
  {
    name: "Naveed Ali Soomro",
    role: "STS IBA Aspirant (Larkana)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    text: "Sir Dilshad's pedagogy lectures and science MCQs helped me clear the STS screening test with 78 marks. The explanation in Sindhi makes concepts crystal clear!",
  },
  {
    name: "Dua Baloch",
    role: "Matric Science Student (Hyderabad)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    text: "Physics was very difficult for me until I started watching Dreams Academy videos. Chapter-wise STBB notes and formulas saved my board exams.",
  },
  {
    name: "Farhan Jamali",
    role: "JST Candidate (Khairpur)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    text: "The combination of live WhatsApp batch classes and daily quizzes on this website is unmatched in Sindh. Truly thankful to Sir Dilshad!",
  },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/videos?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Mesh */}
      <div className="bg-mesh" />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Main Content Area */}
          <div className={styles.heroMain}>
            {/* Left Column: Text */}
            <motion.div 
              className={styles.heroText}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.badge}>
                <img 
                  src="/images/logo-yellow.png" 
                  alt="Dreams Academy Badge" 
                  style={{ width: 18, height: 18, borderRadius: 4, display: 'inline-block', verticalAlign: 'middle', marginRight: '0.45rem' }} 
                />
                #1 Virtual Science Academy in Sindh
              </span>

              <h1 className={styles.title}>
                Dreams Virtual <span className="gradient-text-animated">Academy</span>
              </h1>

              <div className={styles.sindhiHero}>
                سنڌي شاگردن لاءِ سائنس، فزڪس ۽ نوڪرين جي ٽيسٽن جي تياري
              </div>

              <p className={styles.subtitle}>
                Master Science, Physics, Chemistry, and Mathematics in simple Sindhi. Prepare for Sindh Board exams, STS / IBA Sukkur, and JST tests with expert guidance from Sir Dilshad Murtaza.
              </p>

              <div className={styles.ctaGroup}>
                <Link href="/courses" className={`${styles.whatsappHeroBtn} shimmer-hover`}>
                  <WhatsAppIcon size={20} />
                  <span>Join Batches (داخلا وٺو)</span>
                </Link>
                <Link href="/videos" className={styles.secondaryBtn}>
                  Watch Free Lectures
                </Link>
                <Link href="/notes" className={styles.secondaryBtn}>
                  PDF Notes
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Illustration with Floating Badges */}
            <motion.div 
              className={styles.heroImage}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {/* Floating Chip Top Left */}
              <motion.div 
                className={`${styles.floatingChip} ${styles.chipTopLeft}`}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              >
                <span style={{ fontSize: '1rem' }}>⭐</span>
                <span>15,000+ Active Students</span>
              </motion.div>

              {/* Floating Chip Bottom Right */}
              <motion.div 
                className={`${styles.floatingChip} ${styles.chipBottomRight}`}
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
                <span>Live STBB Batches Active</span>
              </motion.div>

              <motion.img
                src="/illustration-hero.png"
                alt="Student Learning Illustration"
                className={styles.illustration}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* District Coverage Strip */}
          <motion.div 
            className={styles.districtStrip}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <GraduationCap size={18} color="var(--accent)" />
              <span className={styles.districtTitle}>Trusted by Students across Sindh:</span>
            </div>
            <span>Sukkur</span> <span className={styles.districtDot}>•</span>
            <span>Larkana</span> <span className={styles.districtDot}>•</span>
            <span>Hyderabad</span> <span className={styles.districtDot}>•</span>
            <span>Khairpur</span> <span className={styles.districtDot}>•</span>
            <span>Nawabshah</span> <span className={styles.districtDot}>•</span>
            <span>Dadu</span> <span className={styles.districtDot}>•</span>
            <span>Mirpurkhas</span> <span className={styles.districtDot}>•</span>
            <span>Karachi</span>
          </motion.div>

          {/* Search Bar Section */}
          <div className={styles.searchSection}>
            <form onSubmit={handleSearch} className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <Search size={20} color="var(--text-light)" />
              </span>
              <input
                type="text"
                placeholder="Search STBB Notes, STS Science MCQs, Physics Videos, Quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* Top Features Section */}
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.sectionHeader}>
          <h2>Everything You Need for Academic Success</h2>
          <p>Designed specially to make quality education accessible and simple for every Sindhi student.</p>
        </div>

        <div className={styles.grid}>
          <Link href="/tests" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              className={`${styles.card} glass shimmer-hover`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper}>
                <FileQuestion size={28} color="var(--accent)" />
              </div>
              <h3>Online Mock Tests</h3>
              <p>Practice chapter-wise and job test MCQs with instant results, scorecards, and time limit practice.</p>
            </motion.div>
          </Link>

          <Link href="/notes" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              className={`${styles.card} glass shimmer-hover`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper}>
                <BookOpen size={28} color="var(--accent)" />
              </div>
              <h3>Smart STBB Notes</h3>
              <p>Download free chapter summaries, diagrams, and past paper solved questions in PDF format.</p>
            </motion.div>
          </Link>

          <Link href="/videos" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              className={`${styles.card} glass shimmer-hover`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper}>
                <Video size={28} color="var(--accent)" />
              </div>
              <h3>Sindhi Video Lectures</h3>
              <p>Watch recorded and live video lessons explaining complex science and math topics in easy Sindhi.</p>
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* Teacher Spotlight Section (Sir Dilshad Murtaza) */}
      <motion.section 
        style={{ padding: '0 1.5rem' }}
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.teacherSection}>
          <div className={styles.teacherAvatarWrap}>
            <img
              src="/images/faculty/dilshad-murtaza.jpg"
              alt="Sir Dilshad Murtaza"
              className={styles.teacherPhoto}
            />
            <div>
              <span className={styles.teacherBadge}>CEO & LEAD EDUCATOR</span>
            </div>
          </div>

          <div className={styles.teacherBio}>
            <h2 className={styles.teacherName}>Dilshad Murtaza (CEO)</h2>
            <div className={styles.teacherRole}>
              Science Teacher (Physics & Biology) • Graduate • Mentor for 15,000+ Students
            </div>

            <div className={styles.teacherSindhiQuote}>
              "منهنجو خواب آهي ته سنڌ جي هر نياڻي ۽ نوجوان تائين سائنس، فزڪس ۽ ٽيسٽن جي تياري سڀ کان آسان انداز ۾ سندن مادري ٻوليءَ ۾ پهچائي سگهجي."
            </div>

            <p className={styles.teacherText}>
              Lead Educator and CEO of Dreams Virtual Academy. Specializing in STBB (Sindh Textbook Board) syllabus from Class 7th to Matriculation and competitive job exams (IBA Sukkur STS, JST, PST, SPSC). Renowned for breaking down tough scientific concepts into simple, visual demonstrations.
            </p>

            <div className={styles.teacherStatsRow}>
              <div className={styles.tStat}>
                <strong>50+</strong>
                <span>Free Video Lectures</span>
              </div>
              <div className={styles.tStat}>
                <strong>15,000+</strong>
                <span>Learners Reached</span>
              </div>
              <div className={styles.tStat}>
                <strong>98%</strong>
                <span>Student Satisfaction</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20have%20a%20question%20regarding%20classes"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappHeroBtn}
              >
                <WhatsAppIcon size={20} />
                <span>Message Sir Dilshad on WhatsApp</span>
              </a>
              <Link href="/courses" className={styles.secondaryBtn}>
                View Active Batches
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Respected Faculty Grid Section */}
      <motion.section 
        className={styles.facultySection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.facultyHeader}>
          <span className={styles.badge}>
            <GraduationCap size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem', color: 'var(--accent)' }} />
            EXPERIENCED TEACHING TEAM
          </span>
          <h2>Meet Our Expert Faculty</h2>
          <div className={styles.facultySindhiSubtitle}>
            اسان جي لائق ۽ محنتي استادن جي پينل سان ملو
          </div>
          <p>
            Qualified engineers and subject specialists providing quality education in Science, Mathematics, Chemistry, and English for Sindh Board & competitive exams.
          </p>
        </div>

        <div className={styles.facultyGrid}>
          {facultyMembers.map((member, idx) => (
            <motion.div 
              key={idx} 
              className={styles.facultyCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={styles.facultyImgWrap}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.facultyImg}
                />
                <span className={`${styles.facultyRoleBadge} ${member.isCEO ? styles.ceoBadge : ''}`}>
                  {member.roleBadge}
                </span>
              </div>

              <div className={styles.facultyInfo}>
                <div>
                  <h3 className={styles.facultyName}>{member.name}</h3>
                  <div className={styles.facultyTitle}>{member.title}</div>

                  {member.handle && (
                    <div className={styles.facultyHandle}>{member.handle}</div>
                  )}

                  <div className={styles.facultyEduBadge}>
                    <GraduationCap size={14} color="var(--text-dark)" />
                    <span>{member.education}</span>
                  </div>

                  <div className={styles.facultySubjects}>
                    {member.subjects.map((sub, sIdx) => (
                      <span key={sIdx} className={styles.subjectPill}>{sub}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.facultyCardFooter}>
                  <a
                    href={`https://wa.me/923018183624?text=${encodeURIComponent(member.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.facultyWhatsAppBtn}
                  >
                    <WhatsAppIcon size={16} />
                    <span>WhatsApp Guidance</span>
                  </a>
                  <Link href="/courses" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Batches</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Daily Quiz & Batch Enrollment Highlight */}
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.dualGrid}>
          {/* Daily Quiz Card */}
          <motion.div 
            className={`${styles.featureCard} ${styles.quizCard} shimmer-hover`}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.cardTag}>NEW</div>
            <h2>Daily Science Quiz</h2>
            <p>Solve 10 curated MCQs every day to sharpen your memory and test readiness.</p>
            <div className={styles.quizStats}>
              <div className={styles.stat}>
                <Flame size={16} color="#FF6B6B" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                Free Daily Test
              </div>
              <div className={styles.stat}>
                <CheckCircle2 size={16} color="#3DBE7A" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                Instant Answer Review
              </div>
            </div>
            <Link href="/quizzes" style={{ textDecoration: 'none' }}>
              <button className={`${styles.quizBtn} shimmer-hover`}>Start Today&apos;s Quiz Now</button>
            </Link>
          </motion.div>

          {/* Batch Enrollment Highlight */}
          <motion.div 
            className={`${styles.featureCard} ${styles.progressCard} shimmer-hover`}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.cardTag} style={{ background: '#3DBE7A' }}>OPEN</div>
            <h2>New Online Batch (داخلا جاري)</h2>
            <p>Admissions are live for STS / IBA Sukkur & JST preparation batches. Limited seats with direct teacher guidance.</p>
            <div className={styles.quizStats}>
              <div className={styles.stat}>
                <CreditCard size={16} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                EasyPaisa & JazzCash
              </div>
              <div className={styles.stat}>
                <Smartphone size={16} color="#25D366" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                Mobile Friendly
              </div>
            </div>
            <Link href="/courses" style={{ textDecoration: 'none' }}>
              <button className={`${styles.quizBtn} shimmer-hover`} style={{ background: 'var(--accent)' }}>
                View Fees & Enroll →
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Popular Playlists */}
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.sectionHeader}>
          <h2>Featured Lecture Series</h2>
          <p>Watch our most popular and high-yield video courses in Sindhi & English.</p>
        </div>
        <div className={styles.grid}>
          {popularPlaylists.map((playlist, idx) => (
            <Link
              key={idx}
              href={playlist.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <motion.div 
                className={styles.playlistCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={styles.playImage}>
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className={styles.playThumb}
                    loading="lazy"
                  />
                  <div className={styles.playOverlay}>
                    <div className={styles.playBtnBadge}>
                      <Play size={20} color="white" fill="white" />
                    </div>
                  </div>
                  <span className={styles.videoDurationBadge}>
                    {playlist.hours}h • {playlist.videos} Videos
                  </span>
                </div>
                <div className={styles.playInfo}>
                  <span className={styles.category}>{playlist.category}</span>
                  <h4>{playlist.title}</h4>
                  <p>{playlist.videos} Videos • {playlist.hours} Hours</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Visual Science Diagram Gallery Section */}
      <motion.section 
        className={styles.gallerySection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.galleryHeader}>
          <span className={styles.badge}>
            <Microscope size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem', color: 'var(--accent)' }} />
            VISUAL SCIENCE DIAGRAMS & FLOW
          </span>
          <h2>Anatomical Structures & Science Flowcharts</h2>
          <div className={styles.gallerySindhiSub}>
            سائنسي خاڪا: تصويرن ۽ فلو چارٽ ذريعي آسان سکيا
          </div>
          <p>
            Hand-drawn notebook study diagrams specially prepared for Sindh Textbook Board (STBB) Science & Biology exams. Click any diagram to examine labels in full resolution or save for revision.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {scienceDiagrams.map((diagram) => (
            <motion.div
              key={diagram.id}
              className={styles.galleryCard}
              onClick={() => setSelectedDiagram(diagram)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.galleryImgWrap}>
                <img
                  src={diagram.image}
                  alt={diagram.title}
                  className={styles.galleryImg}
                  loading="lazy"
                />
                <div className={styles.galleryCardOverlay}>
                  <div className={styles.zoomPill}>
                    <Maximize2 size={16} />
                    <span>View Full Diagram</span>
                  </div>
                </div>
              </div>

              <div className={styles.galleryCardInfo}>
                <div>
                  <span className={styles.galleryBadge}>{diagram.category}</span>
                  <h3 className={styles.galleryTitle}>{diagram.title}</h3>
                  <div className={styles.gallerySindhiTitle}>{diagram.sindhiTitle}</div>
                </div>

                <div className={styles.galleryCardAction}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Tag size={13} color="var(--text-light)" />
                    {diagram.labels.length} Anatomical Labels
                  </span>
                  <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    Zoom <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox Modal for Diagrams */}
      <AnimatePresence>
        {selectedDiagram && (
          <motion.div
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedDiagram(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.lightboxBox}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className={styles.lightboxClose}
                onClick={() => setSelectedDiagram(null)}
                aria-label="Close Diagram View"
              >
                <X size={20} />
              </button>

              <div className={styles.lightboxImgWrap}>
                <img
                  src={selectedDiagram.image}
                  alt={selectedDiagram.title}
                  className={styles.lightboxImg}
                />
              </div>

              <div className={styles.lightboxDetails}>
                <div>
                  <span className={styles.galleryBadge}>{selectedDiagram.category}</span>
                  <h2 className={styles.lightboxTitle}>{selectedDiagram.title}</h2>
                  <div className={styles.lightboxSindhi}>{selectedDiagram.sindhiTitle}</div>
                  <p className={styles.lightboxDesc}>{selectedDiagram.description}</p>

                  <div className={styles.labelsList}>
                    <h5>Key Anatomical Parts & Labels (اهم حصا ۽ ليبلز):</h5>
                    <div className={styles.labelChips}>
                      {selectedDiagram.labels.map((lbl, idx) => (
                        <span key={idx} className={styles.labelChip}>
                          {lbl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.lightboxActions}>
                  <a
                    href={selectedDiagram.image}
                    download={`${selectedDiagram.id}-diagram.jpg`}
                    className={styles.downloadDiagramBtn}
                  >
                    <Download size={18} />
                    <span>Download High-Res Diagram</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`*Dreams Academy Science Diagram*\n\n*${selectedDiagram.title}*\n${selectedDiagram.sindhiTitle}\nCheck this clear notebook illustration on Dreams Virtual Academy:\nhttps://dreamsvirtualacademy.edu`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareDiagramWhatsApp}
                  >
                    <WhatsAppIcon size={18} />
                    <span>Share</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Official Academy Brand & Campus Identity Showcase */}
      <motion.section 
        style={{ maxWidth: '1200px', margin: '4rem auto 1rem', padding: '0 1.5rem' }}
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <img 
                src="/images/logo-dark.png" 
                alt="Dreams Gold Seal" 
                style={{ height: '34px', width: 'auto', borderRadius: '6px' }} 
              />
              <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Official Virtual Academy Portal
              </span>
            </div>
            <h2 style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
              Sindh&apos;s Dedicated Virtual Learning Academy
            </h2>
            <div style={{ color: '#FCD34D', fontSize: '1.05rem', marginBottom: '1.25rem', fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              سنڌ جي نياڻين ۽ نوجوانن جي روشن مستقبل لاءِ اعليٰ معيار جي تعليم
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Specializing in Class 7th to 12th Sindh Board (STBB) science coaching and IBA Sukkur STS / JST competitive test preparation with complete Sindhi medium support.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/courses" className={styles.whatsappHeroBtn} style={{ background: '#F59E0B' }}>
                View All Batches
              </Link>
              <Link href="/tests" className={styles.secondaryBtn} style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                Free Mock Tests
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <img 
              src="/images/logo-yellow.png" 
              alt="Dreams Virtual Academy Signage" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </motion.section>

      {/* Testimonials with Realistic Images */}
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.sectionHeader}>
          <h2>Sindhi Community Feedback</h2>
          <p>Real words from students across Sindh who transformed their results with Dreams Academy.</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              className={`${styles.testimonial} glass shimmer-hover`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={styles.user}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
                />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
              <p>"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <img
                src="/images/logo-title-light.png"
                alt="Dreams Virtual Academy"
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p>
              Dedicated to empowering Sindhi students with modern science, physics, mathematics, and competitive exam education.
            </p>
            <div className={styles.socials}>
              <a
                href="https://wa.me/923018183624"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Support"
              >
                <WhatsAppIcon size={22} />
              </a>
              <a
                href="https://youtube.com/@DreamsScienceAcademy"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Channel"
              >
                <YoutubeIcon size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
              >
                <FacebookIcon size={22} />
              </a>
            </div>
          </div>

          <div className={styles.footerNav}>
            <h4>Quick Navigation</h4>
            <Link href="/courses">Live Batches</Link>
            <Link href="/videos">Video Lectures</Link>
            <Link href="/notes">PDF Study Notes</Link>
            <Link href="/tests">Online Mock Tests</Link>
            <Link href="/quizzes">Daily Quiz</Link>
          </div>

          <div className={styles.footerNav}>
            <h4>Support & Admission</h4>
            <a
              href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20need%20help%20with%20admissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: 0301-8183624
            </a>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Fee via EasyPaisa / JazzCash:
              <br />
              <strong>0301-8183624</strong> (Dilshad Murtaza)
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 Dreams Virtual Academy. Serving the Sindhi Student Community with Excellence.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.6rem', fontSize: '0.85rem' }}>
            <Link href="/privacy-policy" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Privacy Policy</Link>
            <span style={{ color: 'var(--card-border)' }}>•</span>
            <Link href="/terms" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
