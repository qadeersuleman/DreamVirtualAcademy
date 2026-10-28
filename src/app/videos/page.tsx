'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { 
  Video as VideoIcon, 
  BookOpen, 
  Dna, 
  Zap, 
  FlaskConical, 
  Leaf, 
  FileCheck, 
  GraduationCap, 
  Play, 
  Search, 
  X 
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import AdBanner from '@/components/AdBanner';
import styles from './page.module.css';

type Video = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  thumbnail?: string;
};

// ─────────────────────────────────────────────
// All videos from Dreams Science Academy channel
// ─────────────────────────────────────────────
const ALL_VIDEOS: Video[] = [
  // ── PEDAGOGY ──────────────────────────────
  {
    id: 'VFVrHw5RR2o',
    title: 'Lecture #03 - Teaching Methodology | Lecture Method - JST Syllabus Based',
    category: 'Pedagogy',
    description: 'A complete explanation of the Lecture Method under Pedagogy for JST syllabus preparation.',
    tags: ['JST', 'Pedagogy', 'Teaching Method'],
  },
  {
    id: 'o7GIjpyL6qo',
    title: 'Teaching Methodology | Discussion Method | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Detailed explanation of the Discussion Method in teaching methodology for JST preparation.',
    tags: ['JST', 'Pedagogy', 'Discussion Method'],
  },
  {
    id: '8Jytg3kWzVw',
    title: 'Case Studies | Pedagogy | Teaching Methodology | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Understanding Case Studies as a teaching methodology for JST, STS, IBA, NTS, SPSC exams.',
    tags: ['JST', 'Pedagogy', 'Case Studies'],
  },
  {
    id: 'CSv-SWnjbBE',
    title: 'Team Teaching | Teaching Methodology | Pedagogy | JST Syllabus Based',
    category: 'Pedagogy',
    description: 'Comprehensive look at Team Teaching as part of the pedagogy portion for JST syllabus.',
    tags: ['JST', 'Pedagogy', 'Team Teaching'],
  },
  {
    id: 'YDS0zSJjap4',
    title: 'Assessment and Its Types | Pedagogy | JST Syllabus Preparation',
    category: 'Pedagogy',
    description: 'Types of assessment including formative and summative assessment explained for JST preparation.',
    tags: ['JST', 'Pedagogy', 'Assessment'],
  },

  // ── BIOLOGY ───────────────────────────────
  {
    id: 'DLZ6h4QwgeQ',
    title: 'Class 8th Science - Chapter #01 - About Brain | Its Structure',
    category: 'Biology',
    description: 'Detailed explanation of the human brain and its structure from Class 8 Science (STBB).',
    tags: ['Science 8', 'Biology', 'Brain', 'STBB'],
  },
  {
    id: '_Eu-ZH1AAwQ',
    title: 'Temporal Lobe of Brain Discussed in Simple | Science Class 8',
    category: 'Biology',
    description: 'Simple explanation of the Temporal Lobe of the brain for Class 8 Science.',
    tags: ['Science 8', 'Biology', 'Brain'],
  },
  {
    id: 'Ajwt1uDXHF8',
    title: "What's Peripheral Nervous System | All About Nerve Types | Simple",
    category: 'Biology',
    description: 'All about the Peripheral Nervous System and types of nerves explained simply.',
    tags: ['Science', 'Biology', 'Nervous System'],
  },
  {
    id: 'BfIFxPqyqdY',
    title: 'The Structure and Role of Kidney | Science 8th Book | STBB',
    category: 'Biology',
    description: 'Complete explanation of the kidney\'s structure and role from Class 8 Science STBB.',
    tags: ['Science 8', 'Biology', 'Kidney', 'STBB'],
  },
  {
    id: 'soazgsSAJME',
    title: 'The Human Excretory System | Explained in Simple | Science 8th | STBB',
    category: 'Biology',
    description: 'Human Excretory System explained in simple terms for Class 8 Science.',
    tags: ['Science 8', 'Biology', 'Excretory System'],
  },
  {
    id: 'XnQ_OJix-c0',
    title: 'Blood Vessels | Artery, Veins, Capillaries | Science 7 | JST Preparation',
    category: 'Biology',
    description: 'Explanation of blood vessels — arteries, veins, and capillaries — for Science 7.',
    tags: ['Science 7', 'Biology', 'Blood Vessels'],
  },
  {
    id: 'bB8_K7JoMg0',
    title: 'All About Tuberculosis | Vaccination Preparation | Vaccines Against Diseases',
    category: 'Biology',
    description: 'Everything about Tuberculosis and vaccination for science preparation.',
    tags: ['Science', 'Biology', 'Vaccines', 'TB'],
  },
  {
    id: 'HKUXrd2kKHc',
    title: 'Important Vaccines | NTS Vaccinators Preparation | BCG | OPV | MMR',
    category: 'Biology',
    description: 'Important vaccines including BCG, OPV, and MMR for NTS vaccinators preparation.',
    tags: ['Science', 'Biology', 'Vaccines', 'NTS'],
  },
  {
    id: 'HllMPDs-eiI',
    title: 'Hypertension Defined in Simple Terms',
    category: 'Biology',
    description: 'Hypertension (high blood pressure) explained in simple, easy-to-understand terms.',
    tags: ['Science', 'Biology', 'Health'],
  },
  {
    id: 'WYKUygCA6NM',
    title: 'Chronic Medical Condition | Hypertension | Blood Pressure | Science',
    category: 'Biology',
    description: 'Understanding hypertension as a chronic medical condition in the context of science.',
    tags: ['Science', 'Biology', 'Hypertension'],
  },

  // ── PHYSICS ───────────────────────────────
  {
    id: 'Oiql1GU2ttU',
    title: 'Refraction in Simple Words | Science 7th | STBB',
    category: 'Physics',
    description: 'Refraction of light explained in simple words for Class 7 Science (STBB).',
    tags: ['Science 7', 'Physics', 'Light', 'STBB'],
  },
  {
    id: 'bXvSG16rpXY',
    title: 'Critical Angle and Total Internal Reflection | Explained in Sindhi',
    category: 'Physics',
    description: 'Critical Angle and Total Internal Reflection explained in Sindhi for science preparation.',
    tags: ['Science', 'Physics', 'Light', 'Sindhi'],
  },
  {
    id: 'sp9uajg6OuM',
    title: 'Critical Angle - Total Internal Reflection | Refraction of Light | Demonstration',
    category: 'Physics',
    description: 'Live demonstration of Critical Angle and Total Internal Reflection concept.',
    tags: ['Science', 'Physics', 'Light'],
  },
  {
    id: '7zmMBCuYP98',
    title: 'Land and Sea Breeze | Science 7th Important Topic | Simple Explanation',
    category: 'Physics',
    description: 'Land and Sea Breeze explained simply as an important topic from Class 7 Science.',
    tags: ['Science 7', 'Physics', 'Weather'],
  },
  {
    id: 'id4i_nCv9zU',
    title: 'Radiation? - Mode of Heat Transfer | Science Preparation | Online',
    category: 'Physics',
    description: 'Radiation as a mode of heat transfer explained for science preparation.',
    tags: ['Science', 'Physics', 'Heat Transfer'],
  },

  // ── CHEMISTRY ─────────────────────────────
  {
    id: 'tfNyZX7-gf8',
    title: 'All About Acids | Science 8 | STBB',
    category: 'Chemistry',
    description: 'Complete explanation of acids from Class 8 Science (STBB) by Dilshad Murtaza.',
    tags: ['Science 8', 'Chemistry', 'Acids', 'STBB'],
  },
  {
    id: 'Z85XIhFwtl0',
    title: 'Types of Chemical Reactions MCQs | Solution Video | Jobs Test Preparation',
    category: 'Chemistry',
    description: 'Types of chemical reactions MCQs solved for science jobs test preparation.',
    tags: ['Chemistry', 'MCQs', 'Test Prep'],
  },
  {
    id: '6H2iV0rXUrs',
    title: 'Chemistry Related MCQs Solved with Explanation | Science Preparation',
    category: 'Chemistry',
    description: 'Chemistry MCQs solved with full explanations for science preparation.',
    tags: ['Chemistry', 'MCQs', 'Test Prep'],
  },
  {
    id: 'XjssLPNZYk0',
    title: 'Chemistry Related Important MCQs | Solved with Explanation | Science Preparation',
    category: 'Chemistry',
    description: 'Important chemistry MCQs solved with detailed explanation for science preparation.',
    tags: ['Chemistry', 'MCQs', 'Test Prep'],
  },

  // ── ECOLOGY & ENVIRONMENT ─────────────────
  {
    id: 'cgcot-tetgE',
    title: 'Science 7th | Chapter Four | STBB | Environment and Feeding Relationship',
    category: 'Ecology',
    description: 'Environment and Feeding Relationships from Chapter 4, Class 7 Science (STBB).',
    tags: ['Science 7', 'Ecology', 'Environment', 'STBB'],
  },
  {
    id: 'CBdVTTrCCKg',
    title: 'Types of Consumers | A Part of Lecture 68 | Summer Science Series',
    category: 'Ecology',
    description: 'Types of consumers in food chains explained as part of the Summer Science Series.',
    tags: ['Science', 'Ecology', 'Food Chain'],
  },
  {
    id: 'IRgz5H79SMs',
    title: 'Two Important Terms: Diurnal and Nocturnal | Animal Categories | Science 7',
    category: 'Ecology',
    description: 'Diurnal and Nocturnal animals explained as important terms from Class 7 Science.',
    tags: ['Science 7', 'Ecology', 'Animals'],
  },

  // ── TEST PREP / MCQs ──────────────────────
  {
    id: '2YOeCD4WaBA',
    title: 'Some Important Science MCQs - Solved with Explanation | General Test Prep | BSN | STS',
    category: 'Test Prep',
    description: 'Important Science MCQs solved with explanation for BSN, STS general test preparation.',
    tags: ['Science', 'MCQs', 'Test Prep', 'BSN'],
  },
  {
    id: 'RZlxeuBeFgY',
    title: 'Science 7th - MCQs Practice | Science Preparation | IBA Tests',
    category: 'Test Prep',
    description: 'MCQs practice for Science 7th to prepare for IBA and other competitive tests.',
    tags: ['Science 7', 'MCQs', 'IBA', 'Test Prep'],
  },
  {
    id: 'E-dI45-gjVA',
    title: 'Intermediate Test | Important Science MCQs',
    category: 'Test Prep',
    description: 'Important Science MCQs for intermediate test preparation.',
    tags: ['Science', 'MCQs', 'Test Prep'],
  },
  {
    id: 'l6r6_abUwrQ',
    title: 'Lect #07 | Part | 3 Important MCQs Solved - Science 4 New Book Science Preparation',
    category: 'Test Prep',
    description: 'Lecture 7 solving 3 important MCQs from the new Science 4 book for test preparation.',
    tags: ['Science 4', 'MCQs', 'Test Prep'],
  },

  // ── GENERAL ───────────────────────────────
  {
    id: 'JRi5lEVAqPU',
    title: 'The Conversation Starts Today - Dilshad Murtaza',
    category: 'General',
    description: 'An introductory/welcome video from Dilshad Murtaza to begin the learning journey.',
    tags: ['Introduction', 'General'],
  },
];

const CATEGORIES = ['All', 'Pedagogy', 'Biology', 'Physics', 'Chemistry', 'Ecology', 'Test Prep', 'General'];

const getCategoryIcon = (cat: string, size = 16) => {
  switch (cat) {
    case 'Pedagogy': return <BookOpen size={size} />;
    case 'Biology': return <Dna size={size} />;
    case 'Physics': return <Zap size={size} />;
    case 'Chemistry': return <FlaskConical size={size} />;
    case 'Ecology': return <Leaf size={size} />;
    case 'Test Prep': return <FileCheck size={size} />;
    case 'General': return <GraduationCap size={size} />;
    default: return <VideoIcon size={size} />;
  }
};

const CATEGORY_COLORS: Record<string, string> = {
  All: '#7C5CFF',
  Pedagogy: '#7C5CFF',
  Biology: '#3DBE7A',
  Physics: '#FF8C42',
  Chemistry: '#FF6B9D',
  Ecology: '#2BBBA4',
  'Test Prep': '#F4C47F',
  General: '#A892FF',
};

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(ALL_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [youtubeVideos, setYoutubeVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoSourceNote, setVideoSourceNote] = useState('Loading YouTube library...');

  useEffect(() => {
    let isMounted = true;

    async function loadYouTubeVideos() {
      try {
        const response = await fetch('/api/youtube/videos');
        const data = (await response.json()) as { videos?: Video[]; error?: string };
        const liveVideos = data.videos ?? [];

        if (!isMounted) {
          return;
        }

        if (liveVideos.length > 0) {
          setYoutubeVideos(liveVideos);
          setActiveVideo(liveVideos[0]);
          setVideoSourceNote(`Showing ${liveVideos.length} videos loaded from YouTube.`);
        } else {
          setVideoSourceNote(data.error ? `${data.error} Showing saved videos for now.` : 'Showing saved videos for now.');
        }
      } catch {
        if (isMounted) {
          setVideoSourceNote('YouTube videos could not load. Showing saved videos for now.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingVideos(false);
        }
      }
    }

    loadYouTubeVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const videos = youtubeVideos.length > 0 ? youtubeVideos : ALL_VIDEOS;

  const filtered = videos.filter((v) => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const counts = useMemo(() => {
    const nextCounts: Record<string, number> = {};

    CATEGORIES.forEach((cat) => {
      nextCounts[cat] = cat === 'All' ? videos.length : videos.filter((v) => v.category === cat).length;
    });

    return nextCounts;
  }, [videos]);

  return (
    <div className={styles.container}>
      <div className="bg-mesh" />

      <div className={styles.content}>
        {/* ── HEADER ── */}
        <header className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img 
              src="/images/logo-title-light.png" 
              alt="Dreams Virtual Academy Lectures" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          <span className={styles.badge}>
            <VideoIcon size={14} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
            DREAMS SCIENCE ACADEMY
          </span>
          <h1>Video Lectures Library</h1>
          <p className={styles.sindhiSubtitle}>
            سنڌي ٻوليءَ ۾ سائنس، فزڪس، ڪيمسٽري ۽ ٽيسٽن جي تياري جا مڪمل وڊيو ليڪچرز
          </p>
          <p>Explore our complete library of {videos.length} educational video lectures — from Pedagogy to Physics, Biology, Chemistry and STS preparation.</p>
          <div className={styles.sourceNote} data-loading={isLoadingVideos ? 'true' : 'false'}>
            {videoSourceNote}
          </div>
        </header>

        {/* ── MAIN PLAYER ── */}
        <section className={styles.playerSection}>
          <div className={`${styles.playerCard} glass`}>
            <div className={styles.videoContainer}>
              <iframe
                key={activeVideo.id}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.id}?si=OZoD9ZrH9S1vfOJi`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={styles.iframe}
              />
            </div>
            <div className={styles.videoInfo}>
              <div className={styles.nowPlayingBadge}>
                <span className={styles.dot} />
                Now Playing
              </div>
              <h2>{activeVideo.title}</h2>
              <p className={styles.subtitle}>
                By <strong>Dreams Science Academy</strong> — {activeVideo.description}
              </p>
              <div className={styles.tagRow}>
                <span
                  className={styles.catTag}
                  style={{ background: CATEGORY_COLORS[activeVideo.category] + '22', color: CATEGORY_COLORS[activeVideo.category], border: `1px solid ${CATEGORY_COLORS[activeVideo.category]}44`, display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  {getCategoryIcon(activeVideo.category, 14)} {activeVideo.category}
                </span>
                {activeVideo.tags.map((tag) => (
                  <span key={tag} className={styles.smallTag}>{tag}</span>
                ))}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`*Dreams Science Academy Lecture*\n\n*${activeVideo.title}*\nWatch here: https://youtu.be/${activeVideo.id}\nWebsite: https://dreamsvirtualacademy.edu/videos`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#25D366',
                    color: 'white',
                    padding: '0.45rem 1rem',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 2px 10px rgba(37, 211, 102, 0.25)',
                  }}
                >
                  <WhatsAppIcon size={16} /> Share Video on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── GOOGLE ADSENSE BANNER ── */}
        <AdBanner slot="1029384756" />

        {/* ── SEARCH ── */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <input
              id="video-search"
              type="text"
              placeholder="Search videos by title, topic, or tag…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button className={styles.clearBtn} onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── CATEGORY FILTERS ── */}
        <div className={styles.filterSection}>
          <div className={styles.filterScroll}>
            {CATEGORIES.map((cat) => (
              <button
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                style={activeCategory === cat ? { background: CATEGORY_COLORS[cat], color: '#fff', borderColor: CATEGORY_COLORS[cat] } : {}}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{getCategoryIcon(cat, 15)}</span>
                <span>{cat}</span>
                <span className={styles.countBadge}>{counts[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── VIDEO GRID ── */}
        <section className={styles.gridSection}>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>
                <Search size={36} color="var(--primary)" />
              </div>
              <h3>No videos found</h3>
              <p>Try a different category or search term.</p>
            </div>
          ) : (
            <div className={styles.videoGrid}>
              {filtered.map((video) => (
                <button
                  id={`video-${video.id}`}
                  key={video.id}
                  className={`${styles.videoCard} ${activeVideo.id === video.id ? styles.videoCardActive : ''}`}
                  onClick={() => {
                    setActiveVideo(video);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {/* Thumbnail */}
                  <div className={styles.thumbWrapper}>
                    <img
                      src={video.thumbnail ?? `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className={styles.thumb}
                      loading="lazy"
                    />
                    <div className={styles.playOverlay}>
                      <div className={styles.playBtn}>
                        <Play size={20} fill="white" color="white" />
                      </div>
                    </div>
                    {activeVideo.id === video.id && (
                      <div className={styles.nowPlayingOverlay}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Play size={12} fill="currentColor" /> Playing
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <div
                      className={styles.categoryPill}
                      style={{ background: CATEGORY_COLORS[video.category] + '18', color: CATEGORY_COLORS[video.category], display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      {getCategoryIcon(video.category, 13)} {video.category}
                    </div>
                    <h3 className={styles.cardTitle}>{video.title}</h3>
                    <p className={styles.cardDesc}>{video.description}</p>
                    <div className={styles.cardTags}>
                      {video.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.cardTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── STATS ROW ── */}
        <section className={styles.statsRow}>
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
            <div
              key={cat}
              className={styles.statCard}
              style={{ borderTop: `3px solid ${CATEGORY_COLORS[cat]}` }}
              onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
            >
              <span className={styles.statIcon}>{getCategoryIcon(cat, 22)}</span>
              <span className={styles.statCount}>{counts[cat]}</span>
              <span className={styles.statLabel}>{cat}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
