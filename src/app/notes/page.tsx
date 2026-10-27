'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Download, HardDrive, FileText, Cloud, X, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import styles from './page.module.css';

type NoteItem = {
  id: string;
  title: string;
  sindhiTitle: string;
  category: string;
  description: string;
  pages: number;
  size: string;
  downloads: number;
  downloadUrl: string;
  isHot?: boolean;
};

const NOTES_DATA: NoteItem[] = [
  // ── CLASS 10TH BIOLOGY (STBB REAL GOOGLE DRIVE BOOKS) ──
  {
    id: 'bio-10-ch1-gaseous-exchange',
    title: 'Class 10th Biology: Chapter 1 - Gaseous Exchange (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 1 - گئسن جي مٽاسٽا (ساهه کڻڻ جو سرشتو)',
    category: 'Class 10th Biology',
    description: 'Complete high-quality chapter covering human respiratory system, mechanism of breathing, respiratory disorders (Bronchitis, Emphysema, Pneumonia), and gaseous exchange in plants.',
    pages: 32,
    size: '34 MB',
    downloads: 2850,
    downloadUrl: 'https://drive.google.com/file/d/19aqz9WMDoJAgz2yp1Bxy5rXZVMmM-gUQ/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch2-homeostasis',
    title: 'Class 10th Biology: Chapter 2 - Homeostasis & Kidneys (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 2 - هوميوسٽاسس (جسماني توازن ۽ گردن جو ڪم)',
    category: 'Class 10th Biology',
    description: 'Detailed textbook chapter on osmoregulation, thermoregulation, human urinary system, nephron structure & functioning, kidney stones, and dialysis.',
    pages: 28,
    size: '36 MB',
    downloads: 3120,
    downloadUrl: 'https://drive.google.com/file/d/1wclBmnGIT6tnf-uh8ozudZX5Pe3PET2-/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch3-coordination-control',
    title: 'Class 10th Biology: Chapter 3 - Coordination and Control (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 3 - رابطو ۽ ضابطو (دماغ، نيورون ۽ هارمونز)',
    category: 'Class 10th Biology',
    description: 'Full chapter notes on human nervous system, neuron structure, reflex actions, brain & spinal cord divisions, and endocrine glands with hormonal functions.',
    pages: 36,
    size: '38 MB',
    downloads: 3450,
    downloadUrl: 'https://drive.google.com/file/d/1GWNvvt4196gLz40gIR8RMpEEajUhZss2/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch4-support-movement',
    title: 'Class 10th Biology: Chapter 4 - Support and Movement (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 4 - سھارو ۽ حرڪت (انساني ڍانچو ۽ جوڙ)',
    category: 'Class 10th Biology',
    description: 'Detailed coverage of human skeleton (axial & appendicular), joints types, cartilage & bone, and skeletal disorders (Arthritis & Osteoporosis).',
    pages: 30,
    size: '32 MB',
    downloads: 2190,
    downloadUrl: 'https://drive.google.com/file/d/1JRIr6tOKQdYcpT9Pm4UX413zIz6J1D7k/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch5-reproduction',
    title: 'Class 10th Biology: Chapter 5 - Reproduction in Plants & Animals',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 5 - پيدائشي عمل (ٻوٽن ۽ جانورن ۾ پيدائش)',
    category: 'Class 10th Biology',
    description: 'Asexual & sexual reproduction, pollination in plants, human reproductive systems, fertilization, and developmental stages in detail.',
    pages: 42,
    size: '41 MB',
    downloads: 2680,
    downloadUrl: 'https://drive.google.com/file/d/13fZBTzvcdrTifK4iC1ReXcC4S7gJWWb0/view?usp=sharing',
    isHot: true,
  },
  {
    id: 'bio-10-ch6-inheritance',
    title: 'Class 10th Biology: Chapter 6 - Inheritance and Genetics (STBB)',
    sindhiTitle: 'ڪلاس ڏهون حياتيات: باب 6 - وراثت ۽ جينيات (ڊي اين اي ۽ مينڊل جا قانون)',
    category: 'Class 10th Biology',
    description: 'Chromosomes, DNA structure and replication, Mendel’s laws of inheritance, genotypes, phenotypes, and genetic variations.',
    pages: 34,
    size: '35 MB',
    downloads: 3890,
    downloadUrl: 'https://drive.google.com/file/d/1EbJSRFcyE7jXH00DavNMTLcuYXsgGGTe/view?usp=sharing',
    isHot: true,
  },

  // ── STBB JUNIOR CLASSES & GENERAL PREP ──
  {
    id: 'stbb-8-brain',
    title: 'Class 8th Science: Human Brain & Nervous System (STBB)',
    sindhiTitle: 'ڪلاس اٺون: انساني دماغ ۽ اعصابي نظام جا مڪمل نوٽس',
    category: 'Class 8th STBB',
    description: 'Complete notes with diagrams on Cerebrum, Cerebellum, Brain Stem, and Peripheral Nervous System in easy Sindhi/English.',
    pages: 14,
    size: '2.4 MB',
    downloads: 1420,
    downloadUrl: '#',
    isHot: true,
  },
  {
    id: 'stbb-8-kidney',
    title: 'Class 8th Science: Kidney Structure & Excretory System',
    sindhiTitle: 'ڪلاس اٺون: گردا ۽ پيشاب وارو نظام تفصيلي وضاحت',
    category: 'Class 8th STBB',
    description: 'Detailed explanation of nephron structure, filtration process, kidney failure, and dialysis.',
    pages: 10,
    size: '1.8 MB',
    downloads: 980,
    downloadUrl: '#',
  },
  {
    id: 'stbb-7-light',
    title: 'Class 7th Science: Refraction & Total Internal Reflection',
    sindhiTitle: 'ڪلاس ستون: روشني جي موٽ ۽ مڪمل اندروني عڪس (سنڌي وضاحت)',
    category: 'Class 7th STBB',
    description: 'Laws of refraction, critical angle, and optical phenomenon explained with solved board questions.',
    pages: 12,
    size: '2.1 MB',
    downloads: 1150,
    downloadUrl: '#',
    isHot: true,
  },
  {
    id: 'sts-pedagogy-guide',
    title: 'Pedagogy & Teaching Methodology (JST / STS Syllabus)',
    sindhiTitle: 'تدريسي طريقا ۽ پيڊاگاجي: جي ايس ٽي / ايس ٽي ايس تياري نوٽس',
    category: 'STS / JST Prep',
    description: 'Comprehensive guide on Lecture Method, Discussion Method, Formative vs Summative Assessment, and Team Teaching.',
    pages: 28,
    size: '4.6 MB',
    downloads: 3200,
    downloadUrl: '#',
    isHot: true,
  },
  {
    id: 'sts-science-pastpapers',
    title: 'STS / IBA Sukkur Science 500 Solved MCQs with Explanations',
    sindhiTitle: 'ايس ٽي ايس سکر آءِ بي اي: 500 حل ٿيل سائنس ايم سي ڪيوز',
    category: 'STS / JST Prep',
    description: 'Past 5 years solved general science MCQs specifically asked in IBA Sukkur STS BPS-05 to 15 tests.',
    pages: 35,
    size: '5.2 MB',
    downloads: 4120,
    downloadUrl: '#',
    isHot: true,
  },
  {
    id: 'physics-motion-units',
    title: 'Physics Fundamentals: Laws of Motion, Vectors & SI Units',
    sindhiTitle: 'فزڪس جا بنيادي قانون: حرڪت جا قانون ۽ ايس آءِ يونٽس',
    category: 'Physics',
    description: 'Newton’s three laws, speed vs velocity, acceleration, and essential physics formulas cheat sheet.',
    pages: 16,
    size: '2.8 MB',
    downloads: 1640,
    downloadUrl: '#',
  },
  {
    id: 'chemistry-reactions-acids',
    title: 'Chemistry: All About Acids, Bases & Types of Chemical Reactions',
    sindhiTitle: 'ڪيمسٽري: تيزاب، ڪشار ۽ ڪيميائي ردعمل جا قسم',
    category: 'Chemistry',
    description: 'pH scale, everyday acid uses, neutralisation, exothermic and endothermic reactions summarized with STBB book references.',
    pages: 18,
    size: '3.1 MB',
    downloads: 1320,
    downloadUrl: '#',
  },
  {
    id: 'biology-vaccines-health',
    title: 'Biology & Health Science: Vaccines, TB & Hypertension Guide',
    sindhiTitle: 'حياتيات ۽ صحت: ويڪسينز، ٽي بي ۽ بلڊ پريشر جا نوٽس',
    category: 'Biology',
    description: 'Detailed review of BCG, OPV, MMR vaccines, chronic conditions, and immune system fundamentals.',
    pages: 15,
    size: '2.3 MB',
    downloads: 890,
    downloadUrl: '#',
  },
  {
    id: 'diagram-heart',
    title: 'Visual Diagram: Structure of Human Heart & Blood Circulation',
    sindhiTitle: 'انساني دل جي بناوٽ ۽ رت جو نظام (رنگين ليبل ٿيل خاڪو)',
    category: 'Visual Diagrams',
    description: 'High-resolution anatomical diagram illustrating right/left atriums, ventricles, vena cava, aorta, and heart valves.',
    pages: 1,
    size: '1.2 MB',
    downloads: 2340,
    downloadUrl: '/images/gallery/heart-structure.jpg',
    isHot: true,
  },
  {
    id: 'diagram-brain',
    title: 'Visual Diagram: Structure of Human Brain & Nervous Lobes (STBB)',
    sindhiTitle: 'انساني دماغ جي بناوٽ ۽ ان جا اهم حصا (رنگين خاڪو)',
    category: 'Visual Diagrams',
    description: 'Full-color notebook diagram with all 13 anatomical lobes and regions aligned with Class 8 Science Sindh Board.',
    pages: 1,
    size: '1.1 MB',
    downloads: 3120,
    downloadUrl: '/images/gallery/brain-structure.jpg',
    isHot: true,
  },
  {
    id: 'diagram-kidney',
    title: 'Visual Diagram: Internal Structure of Kidney & Nephron Flow',
    sindhiTitle: 'گردي جي اندروني بناوٽ ۽ نيفرون سرشتو (رنگين خاڪو)',
    category: 'Visual Diagrams',
    description: 'High-res illustration of renal cortex, medullary pyramids, pelvis, and ureter for quick exam revision.',
    pages: 1,
    size: '1.2 MB',
    downloads: 1890,
    downloadUrl: '/images/gallery/kidney-structure.jpg',
    isHot: true,
  },
  {
    id: 'diagram-lungs',
    title: 'Visual Diagram: Respiratory System, Lungs & Alveoli Gas Exchange',
    sindhiTitle: 'ڦڦڙن ۽ ساهه کڻڻ جو مڪمل سرشتو (رنگين خاڪو)',
    category: 'Visual Diagrams',
    description: 'Complete respiratory flow from larynx, trachea, bronchial branches to microscopic alveoli O2/CO2 gas diffusion.',
    pages: 1,
    size: '1.3 MB',
    downloads: 2150,
    downloadUrl: '/images/gallery/lungs-structure.jpg',
    isHot: true,
  },
];

const CATEGORIES = [
  'All',
  'Class 10th Biology',
  'Visual Diagrams',
  'STS / JST Prep',
  'Class 8th STBB',
  'Class 7th STBB',
  'Physics',
  'Chemistry',
  'Biology',
];

const CATEGORY_COLORS: Record<string, string> = {
  All: '#7C5CFF',
  'Class 10th Biology': '#0284C7',
  'Visual Diagrams': '#3DBE7A',
  'STS / JST Prep': '#F4C47F',
  'Class 8th STBB': '#3DBE7A',
  'Class 7th STBB': '#2BBBA4',
  Physics: '#FF8C42',
  Chemistry: '#FF6B9D',
  Biology: '#3DBE7A',
};

export default function NotesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadAlert, setDownloadAlert] = useState<string | null>(null);

  const filteredNotes = useMemo(() => {
    return NOTES_DATA.filter((note) => {
      const matchCat = activeCategory === 'All' || note.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchSearch =
        query === '' ||
        note.title.toLowerCase().includes(query) ||
        note.sindhiTitle.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: NOTES_DATA.length };
    CATEGORIES.forEach((c) => {
      if (c !== 'All') {
        map[c] = NOTES_DATA.filter((n) => n.category === c).length;
      }
    });
    return map;
  }, []);

  const handleDownload = (note: NoteItem) => {
    if (note.downloadUrl && note.downloadUrl !== '#') {
      window.open(note.downloadUrl, '_blank');
      setDownloadAlert(`Opening in Google Drive / PDF: ${note.title}`);
      setTimeout(() => {
        setDownloadAlert(null);
      }, 4000);
      return;
    }

    setDownloadAlert(`Requesting: ${note.title}`);
    setTimeout(() => {
      setDownloadAlert(null);
    }, 3500);

    // Open WhatsApp support if user wants direct PDF file sent
    const text = encodeURIComponent(
      `Salam Sir Dilshad! Please send me the complete PDF for: "${note.title}".`
    );
    window.open(`https://wa.me/923018183624?text=${text}`, '_blank');
  };

  const getWhatsAppShareUrl = (note: NoteItem) => {
    const directLink = note.downloadUrl && note.downloadUrl !== '#' ? `\nLink: ${note.downloadUrl}` : '';
    const text = encodeURIComponent(
      `*Dreams Virtual Academy - Study Notes*\n\n*${note.title}*\n${note.sindhiTitle}\nSize: ${note.size} • ${note.pages} Pages${directLink}\n\nAvailable on Dreams Virtual Academy Library:\nhttps://dreamsvirtualacademy.edu/notes`
    );
    return `https://wa.me/?text=${text}`;
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
              src="/images/logo-variants/07_horizontal_color_light.png" 
              alt="Dreams Virtual Academy Notes" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
            />
          </div>
          <span className={`${styles.badge} animate-pulse-glow`}>
            <BookOpen size={14} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
            STBB & TEST PREPARATION NOTES
          </span>
          <h1 className={styles.title}>Smart Study Notes Library</h1>
          <p className={styles.sindhiSubtitle}>
            سنڌ ٽيڪسٽ بڪ بورڊ ۽ آءِ بي اي ايس ٽي ايس ٽيسٽ جا مڪمل پي ڊي ايف نوٽس
          </p>
          <p className={styles.subtitle}>
            Chapter-wise summaries, solved exercises, diagrams, and past exam formulas prepared by Sir Dilshad Murtaza in simple Sindhi and English.
          </p>
        </motion.header>

        {/* Download notification banner */}
        {downloadAlert && (
          <div
            style={{
              maxWidth: '650px',
              margin: '0 auto 1.5rem',
              padding: '0.8rem 1.2rem',
              background: '#3DBE7A',
              color: 'white',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(61, 190, 122, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <CheckCircle2 size={18} />
            <span>{downloadAlert} — Opening WhatsApp for direct instant file!</span>
          </div>
        )}

        {/* Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search notes by topic, STBB class, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className={styles.filterScroll}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{cat}</span>
              <span className={styles.countBadge}>{counts[cat] || 0}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredNotes.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Search size={36} color="var(--primary)" />
            </div>
            <h3>No study notes matched your search</h3>
            <p>Try searching for STBB, Science, Brain, Physics, or STS.</p>
          </div>
        ) : (
          <div className={styles.notesGrid}>
            {filteredNotes.map((note, idx) => (
              <motion.div 
                key={note.id} 
                className={styles.noteCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.08, 0.5), duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.015 }}
              >
                <div>
                  <div className={styles.cardTop}>
                    <span
                      className={styles.categoryTag}
                      style={{
                        background: (CATEGORY_COLORS[note.category] || '#7C5CFF') + '1A',
                        color: CATEGORY_COLORS[note.category] || '#7C5CFF',
                        border: `1px solid ${(CATEGORY_COLORS[note.category] || '#7C5CFF')}33`,
                      }}
                    >
                      {note.category}
                    </span>
                    <span
                      className={styles.pdfBadge}
                      style={
                        note.downloadUrl.includes('drive.google.com')
                          ? { background: 'rgba(2, 132, 199, 0.12)', color: '#0284C7' }
                          : {}
                      }
                    >
                      {note.downloadUrl.includes('drive.google.com') ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Cloud size={13} /> Google Drive
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FileText size={13} /> PDF Document
                        </span>
                      )}
                    </span>
                  </div>

                  <h3 className={styles.noteTitle}>{note.title}</h3>
                  <div className={styles.sindhiTitle}>{note.sindhiTitle}</div>
                  <p className={styles.noteDesc}>{note.description}</p>
                </div>

                <div>
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <FileText size={14} color="#6B7280" /> {note.pages} Pages
                    </div>
                    <div className={styles.metaItem}>
                      <HardDrive size={14} color="#6B7280" /> {note.size}
                    </div>
                    <div className={styles.metaItem}>
                      <Download size={14} color="#6B7280" /> {note.downloads.toLocaleString()} Downloads
                    </div>
                  </div>

                  <div className={styles.actionRow}>
                    <button
                      onClick={() => handleDownload(note)}
                      className={styles.downloadBtn}
                      style={
                        note.downloadUrl.includes('drive.google.com')
                          ? { background: '#0284C7' }
                          : {}
                      }
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {note.downloadUrl.includes('drive.google.com') ? (
                          <>
                            <BookOpen size={16} /> Read / Download (Drive)
                          </>
                        ) : (
                          <>
                            <Download size={16} /> Download PDF
                          </>
                        )}
                      </span>
                    </button>
                    <a
                      href={getWhatsAppShareUrl(note)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappShareBtn}
                      title="Share with friends on WhatsApp"
                      aria-label="Share on WhatsApp"
                    >
                      <WhatsAppIcon size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Request Notice Banner */}
        <section className={styles.whatsappRequestBanner}>
          <div className={styles.bannerText}>
            <h3>ڪنهن به ڪتاب يا چيپٽر جا نوٽس گهرجن؟ (Need Specific Notes?)</h3>
            <p>
              If you need specific past papers, Sindh Board solved exercises, or test series notes not listed here, message Sir Dilshad directly on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad,%20I%20need%20custom%20notes%20for..."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bannerBtn}
          >
            <WhatsAppIcon size={18} />
            <span>Request on WhatsApp</span>
          </a>
        </section>
      </div>
    </div>
  );
}

