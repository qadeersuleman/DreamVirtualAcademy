'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Smartphone,
  Languages,
  CreditCard,
  CheckCircle2,
  Clock,
  GraduationCap,
  AlertCircle,
  X,
  BookOpen,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import { dvaAlert, dvaToast } from '@/components/DvaToast';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

type Instructor = {
  name: string;
  role: string;
  education: string;
  photo: string;
  handle?: string;
};

type Course = {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  fee: string;
  duration: string;
  overview: string;
  features: string[];
  schedule: string;
  instructor: Instructor;
  isFeatured?: boolean;
};

const FACULTY: Instructor[] = [
  {
    name: 'Dilshad Murtaza (CEO)',
    role: 'Science Teacher (Physics, Biology)',
    education: 'Graduate',
    photo: '/images/faculty/dilshad-murtaza.jpg',
  },
  {
    name: 'Sir Zaheer Ali',
    role: 'Maths Teacher',
    education: 'Graduate Engineer',
    photo: '/images/faculty/zaheer-ali.jpg',
    handle: '@ZaheerAliOfficials',
  },
  {
    name: 'Sir Imran Ali',
    role: 'Chemistry Teacher (9th, 10th, 11th, 12th)',
    education: 'BS Chemistry',
    photo: '/images/faculty/imran-ali.jpg',
  },
  {
    name: 'Sir Sabbir Ali',
    role: 'English Teacher (English Mastery)',
    education: 'BS English',
    photo: '/images/faculty/sabbir-ali.jpg',
  },
];

const COURSES: Course[] = [
  {
    id: 'english-mastery',
    title: 'English Mastery Course (Grammar & Communication)',
    sindhiTitle: 'انگلش ماسٽري ڪورس: گرامر ۽ ڳالهائڻ جو مڪمل حل (سنڌي ذريعي)',
    category: 'Language Mastery',
    fee: 'Rs. 1,200',
    duration: '6 Weeks Comprehensive Course',
    overview: 'Specially designed by Sir Sabbir Ali for Sindhi medium students to conquer English grammar, sentence structures, vocabulary, and confident everyday communication.',
    features: [
      'Master English Grammar Rules from basic to advanced',
      'Tenses, Active / Passive Voice & Direct / Indirect Speech',
      'High-frequency vocabulary for STS, IBA Sukkur & SPSC exams',
      'Daily practical sentence building & voice note feedback',
      'Downloadable PDF study sheets & exercise solutions',
      'Private VIP WhatsApp practice group with Sir Sabbir Ali',
    ],
    schedule: 'Tue, Thu, Sat (7:00 PM - 8:00 PM)',
    instructor: FACULTY[3],
    isFeatured: true,
  },
  {
    id: 'sts-jst-prep',
    title: 'STS / IBA Sukkur & JST Preparation Master Batch',
    sindhiTitle: 'ايس ٽي ايس سکر آءِ بي اي ۽ جي ايس ٽي سپيشل آنلائن بيچ',
    category: 'Job Test Preparation',
    fee: 'Rs. 1,500',
    duration: 'Monthly / 2 Months Complete',
    overview: 'Targeted preparation for IBA Sukkur STS BPS-05 to 15, JST (Junior School Teacher), and SPSC educator exams with full Sindhi medium lectures and daily practice mock tests.',
    features: [
      'Complete Pedagogy & Teaching Methodology (Lecture, Discussion, Assessment)',
      'STBB Science Class 4th to 8th Concept Clearing',
      'Daily 20 MCQs Practice Test with Sindhi explanation',
      '500+ Solved Past Papers PDF & Notes included',
      'Private WhatsApp VIP Study Group access',
    ],
    schedule: 'Mon - Fri (8:30 PM - 9:30 PM)',
    instructor: FACULTY[0],
    isFeatured: true,
  },
  {
    id: 'chemistry-masterclass',
    title: 'Chemistry Masterclass (Classes 9th, 10th, 11th & 12th)',
    sindhiTitle: 'ڪيمسٽري مڪمل ڪورس: نائين کان ٻارهين ڪلاس تائين',
    category: 'Sindh Board (STBB)',
    fee: 'Rs. 1,200',
    duration: 'Monthly Subscription',
    overview: 'Complete chemistry coaching covering Sindh Board syllabus for Matriculation and Intermediate. Organic reactions, equation balancing, and board numericals made simple.',
    features: [
      'Classes 9, 10, 11 & 12 Chemistry complete textbook coverage',
      'Chemical equations, formulas, periodic table & organic reactions',
      'Handwritten Sindhi & English chapter notes with diagrams',
      'Past 10 years solved Sindh Board exam questions',
      'Direct WhatsApp voice note consultation with Sir Imran Ali',
    ],
    schedule: 'Mon, Wed, Fri (6:00 PM - 7:00 PM)',
    instructor: FACULTY[2],
  },
  {
    id: 'mathematics-engineering',
    title: 'Mathematics Foundation & Problem Solving (Engineering/General)',
    sindhiTitle: 'رياضي جو بنيادي ۽ ايڊوانس ڪورس (سنڌي ۾ آساني سان سِکو)',
    category: 'Mathematics & Aptitude',
    fee: 'Rs. 1,200',
    duration: 'Monthly Subscription',
    overview: 'Learn Mathematics without fear with Graduate Engineer Sir Zaheer Ali. Build strong fundamentals in Algebra, Geometry, Equations, and IBA Sukkur quantitative shortcuts.',
    features: [
      'Algebra, Equations, Geometry & Trigonometry from roots',
      'IBA Sukkur STS Quantitative Math tricks and quick methods',
      'Step-by-step solved textbook numericals and derivations',
      'Weekly speed practice tests with evaluation',
      'Direct guidance from Sir Zaheer Ali (@ZaheerAliOfficials)',
    ],
    schedule: 'Mon - Thu (4:00 PM - 5:00 PM)',
    instructor: FACULTY[1],
  },
  {
    id: 'matric-science-board',
    title: 'Sindh Board Class 9th & 10th Science (Physics & Biology)',
    sindhiTitle: 'سنڌ بورڊ ڪلاس نائون ۽ ڏهون: فزڪس ۽ حياتيات',
    category: 'School Board (STBB)',
    fee: 'Rs. 1,200',
    duration: 'Monthly Subscription',
    overview: 'Full coverage of Sindh Textbook Board syllabus for Matric students. Focus on Physics numericals, ray diagrams, and Biology organ systems explained in clear Sindhi.',
    features: [
      'Physics & Biology complete STBB syllabus',
      'Chapter-wise solved exercises and past model papers',
      'Weekly Quiz & Model Paper evaluations',
      'Handwritten Sindhi & English PDF Notes',
      'Direct Voice Note Q&A support with Sir Dilshad Murtaza',
    ],
    schedule: 'Mon - Thu (5:00 PM - 6:30 PM)',
    instructor: FACULTY[0],
  },
];

const SINDH_DISTRICTS = [
  'Sukkur',
  'Larkana',
  'Hyderabad',
  'Karachi',
  'Khairpur',
  'Nawabshah (Shaheed Benazirabad)',
  'Dadu',
  'Mirpurkhas',
  'Shikarpur',
  'Jacobabad',
  'Ghotki',
  'Kashmore',
  'Naushahro Feroze',
  'Sanghar',
  'Badin',
  'Thatta',
  'Sujawal',
  'Jamshoro',
  'Matiari',
  'Tando Allahyar',
  'Tando Muhammad Khan',
  'Umerkot',
  'Tharparkar (Mithi)',
  'Other',
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dva_name, setDvaName] = useState('');
  const [dva_phone, setDvaPhone] = useState('');
  const [dva_age, setDvaAge] = useState('');
  const [dva_district, setDvaDistrict] = useState(SINDH_DISTRICTS[0]);

  const handleOpenEnrollment = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    // Standardized DVA parameters with strict input sanitization
    const clean_name = dva_name.trim().replace(/[<>]/g, '');
    const clean_phone = dva_phone.trim().replace(/[^\d+-\s]/g, '');
    const clean_age = dva_age.trim().replace(/[^\d]/g, '');
    const clean_district = dva_district.replace(/[<>]/g, '');
    const dva_price = selectedCourse.fee;
    const dva_course_title = selectedCourse.title;

    const message = `*Dreams Virtual Academy - New Admission Request*
---------------------------------------
• Student Name (dva_name): ${clean_name || 'Not specified'}
• Age / Class (dva_age): ${clean_age ? `${clean_age} Years` : 'Not specified'}
• WhatsApp Number (dva_phone): ${clean_phone || 'Not specified'}
• District / City (dva_district): ${clean_district}
• Selected Course: ${dva_course_title}
• Instructor: ${selectedCourse.instructor.name}
• Course Fee (dva_price): ${dva_price} (${selectedCourse.duration})
---------------------------------------
Salam Sir! I want to join this batch. I am sending my EasyPaisa / JazzCash payment screenshot for confirmation.`;

    const url = `https://wa.me/923018183624?text=${encodeURIComponent(message)}`;
    
    // Save admission attempt backup to Supabase course_enrollments
    try {
      supabase.from('course_enrollments').insert({
        dva_name: clean_name || 'Anonymous Student',
        dva_phone: clean_phone || 'Not provided',
        dva_age: clean_age || null,
        dva_district: clean_district,
        dva_course_id: selectedCourse.id,
        dva_course_title: dva_course_title,
        dva_price: dva_price,
        payment_method: 'EasyPaisa / JazzCash',
        status: 'pending',
      }).then(() => {});
    } catch {
      // Non-blocking save
    }

    dvaToast.success('Admission request generated successfully!');
    dvaAlert.fire({
      title: 'Admission Request Ready! 🎉',
      text: `Salam ${clean_name || 'Student'}! Aapka admission details tayyar hai. "Send on WhatsApp" dabayein aur fees screenshot send karein.`,
      icon: 'success',
      confirmButtonText: 'Send on WhatsApp',
      showCancelButton: true,
      cancelButtonText: 'Close',
      onConfirm: () => {
        window.open(url, '_blank');
      },
    });

    setSelectedCourse(null);
  };

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />

      <div className={styles.content}>
        {/* Header */}
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img 
              src="/images/logo-light.png" 
              alt="Dreams Virtual Academy" 
              style={{ height: '76px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          <span className={`${styles.badge} animate-pulse-glow`}>
            <Sparkles size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem', color: 'var(--accent)' }} />
            ADMISSIONS OPEN 2026
          </span>
          <h1 className={styles.title}>Live Online Batches & Courses</h1>
          <p className={styles.sindhiSubtitle}>
            سنڌي ٻوليءَ ۾ آسان ترين تعليم — اڄ ئي پنهنجي داخلا جي تصديق ڪريو
          </p>
          <p className={styles.subtitle}>
            Learn from expert teachers in Science, English Mastery, Chemistry, and Mathematics. Interactive live batches, recorded backups, and chapter notes.
          </p>
        </motion.header>

        {/* Info Highlights */}
        <motion.div 
          className={styles.infoBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Smartphone size={24} color="var(--accent)" />
            </div>
            <div className={styles.infoText}>
              <h4>Mobile-Friendly Classes</h4>
              <p>Attend directly from your phone with low internet data usage</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Languages size={24} color="var(--accent)" />
            </div>
            <div className={styles.infoText}>
              <h4>Sindhi & English Medium</h4>
              <p>Concepts taught in your native tongue for 100% clarity</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <CreditCard size={24} color="var(--accent)" />
            </div>
            <div className={styles.infoText}>
              <h4>EasyPaisa & JazzCash</h4>
              <p>Simple 1-click mobile fee payment without bank visits</p>
            </div>
          </div>
        </motion.div>

        {/* Courses Cards */}
        <div className={styles.coursesGrid}>
          {COURSES.map((course, idx) => (
            <motion.div
              key={course.id}
              className={`${styles.courseCard} ${course.isFeatured ? styles.featuredCard : ''}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.topPills}>
                    <span
                      className={styles.categoryBadge}
                      style={{
                        background: course.isFeatured ? 'rgba(124, 92, 255, 0.15)' : '#EEE',
                        color: course.isFeatured ? 'var(--accent)' : 'var(--text-dark)',
                      }}
                    >
                      {course.category}
                    </span>
                    <span className={styles.statusBadge}>
                      <span style={{ color: '#3DBE7A', fontWeight: 800 }}>•</span> Admissions Open
                    </span>
                  </div>

                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <div className={styles.sindhiCourseTitle}>{course.sindhiTitle}</div>

                  {/* Instructor Bar */}
                  <div className={styles.instructorBar}>
                    <img
                      src={course.instructor.photo}
                      alt={course.instructor.name}
                      className={styles.instructorImg}
                    />
                    <div className={styles.instructorDetails}>
                      <h5>{course.instructor.name}</h5>
                      <p>
                        {course.instructor.education} • {course.instructor.role}
                      </p>
                    </div>
                  </div>

                  <div className={styles.priceBox}>
                    <span className={styles.feeAmount}>{course.fee}</span>
                    <span className={styles.feeDuration}>/ {course.duration}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.courseOverview}>{course.overview}</p>

                  <ul className={styles.featuresList}>
                    {course.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <CheckCircle2 size={16} color="#3DBE7A" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.timingRow}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={15} color="var(--accent)" />
                      Batch Timing:
                    </span>
                    <strong>{course.schedule}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button
                  onClick={() => handleOpenEnrollment(course)}
                  className={styles.enrollBtn}
                >
                  <WhatsAppIcon size={20} />
                  <span>Enroll via WhatsApp (داخل وٺو)</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Faculty Showcase */}
        <section className={styles.facultyShowcaseSection}>
          <div className={styles.facultySectionHeader}>
            <span className={styles.badge}>
              <GraduationCap size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem', color: 'var(--accent)' }} />
              QUALIFIED TEACHERS
            </span>
            <h2>Our Respected Teaching Faculty</h2>
            <p className={styles.facultySindhiSub}>
              اسان جي تجربيڪار ۽ مخلص استادن جي ٽيم
            </p>
            <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto' }}>
              Qualified engineers and subject specialists committed to mentoring Sindhi students for board exams and competitive job tests.
            </p>
          </div>

          <div className={styles.facultyGridSimple}>
            {FACULTY.map((teacher, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid var(--card-border)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(74, 59, 47, 0.04)',
                }}
              >
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1rem',
                    border: '3px solid var(--primary)',
                  }}
                />
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                  {teacher.name}
                </h4>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    background: 'rgba(124, 92, 255, 0.08)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '99px',
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {teacher.education}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>
                  {teacher.role}
                </p>
                {teacher.handle && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '0.3rem', fontFamily: 'monospace' }}>
                    {teacher.handle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Enrollment Modal */}
        {selectedCourse && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <img 
                    src="/images/logo-title-light.png" 
                    alt="Dreams Virtual Academy" 
                    style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>
                <h2>Admission Form / داخلا فارم</h2>
                <p>
                  Course: <strong>{selectedCourse.title}</strong>
                  <br />
                  Instructor: <strong>{selectedCourse.instructor.name}</strong> ({selectedCourse.fee})
                </p>
              </div>

              {/* Payment Details */}
              <div className={styles.paymentGuide}>
                <h4>
                  <CreditCard size={18} color="var(--accent)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Fee Payment Details (في ادا ڪرڻ جو طريقو):
                </h4>
                <div className={styles.paymentMethods}>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentName}>EasyPaisa</div>
                    <div className={styles.accountNumber}>0301-8183624</div>
                    <div className={styles.accountTitle}>Title: Dilshad Murtaza</div>
                  </div>
                  <div className={styles.paymentCard}>
                    <div className={styles.paymentName}>JazzCash</div>
                    <div className={styles.accountNumber}>0301-8183624</div>
                    <div className={styles.accountTitle}>Title: Dilshad Murtaza</div>
                  </div>
                </div>
                <p className={styles.paymentNote}>
                  <AlertCircle size={15} color="var(--accent)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                  <strong>طريقو:</strong> مٿئين نمبر تي في موڪلي، فارم مڪمل ڪري &quot;Confirm on WhatsApp&quot; بٽڻ دٻايو ۽ واٽس ايپ تي پنهنجي في جي سلپ/اسڪرين شاٽ موڪليو.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleWhatsAppSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Full Name (پنهنجو پورو نالو)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ali / زاهد حسين"
                    value={dva_name}
                    onChange={(e) => setDvaName(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Age or Class (عمر يا ڪلاس)</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 / Class 10th / Graduate"
                    value={dva_age}
                    onChange={(e) => setDvaAge(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>WhatsApp Mobile Number (واٽس ايپ نمبر)</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={dva_phone}
                    onChange={(e) => setDvaPhone(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City / District (ضلعو يا شهر)</label>
                  <select
                    value={dva_district}
                    onChange={(e) => setDvaDistrict(e.target.value)}
                    className={styles.formInput}
                  >
                    {SINDH_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className={styles.submitWhatsAppBtn}>
                  <WhatsAppIcon size={20} />
                  <span>Confirm Admission on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
