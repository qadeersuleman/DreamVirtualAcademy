'use client';

import React from 'react';
import styles from './page.module.css';

export default function VideosPage() {
  return (
    <div className={styles.container}>
      <div className="bg-mesh" />
      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerText}>
             <span className={styles.badge}>FEATURED LECTURES</span>
             <h1>Videos & Lessons</h1>
             <p>Watch and learn from our curated collection of educational video lessons.</p>
          </div>
        </header>

        {/* Video Player Section */}
        <section className={styles.playerSection}>
          <div className={`${styles.playerCard} glass`}>
            <div className={styles.videoContainer}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/VFVrHw5RR2o?si=OZoD9ZrH9S1vfOJi" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className={styles.iframe}
              />
            </div>
            
            <div className={styles.videoInfo}>
              <span className={styles.category}>Physics & Chemistry</span>
              <h2>Introduction to Advanced Science Concepts</h2>
              <p>
                In this video session, we dive deep into the fundamental building blocks of modern science. 
                Learn how physics and chemistry connect to solve complex engineering problems and shape our understanding of the universe.
              </p>
              
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👤</span>
                  <div>
                    <strong>Dreams Academy</strong>
                    <span>Senior Educator</span>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>⏱️</span>
                  <div>
                    <strong>Video Duration</strong>
                    <span>Featured Video</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Playlist Grid */}
        <section className={styles.playlistSection}>
          <h2>Upcoming Lessons & Playlists</h2>
          <div className={styles.playlistGrid}>
            <div className={`${styles.playlistCard} glass`}>
              <div className={styles.thumbnailPlaceholder}>
                <span className={styles.playIcon}>▶</span>
              </div>
              <div className={styles.playlistInfo}>
                <span className={styles.tag}>MATHEMATICS</span>
                <h3>Calculus & Analytical Geometry</h3>
                <p>Learn limits, integration, and derivatives step-by-step.</p>
              </div>
            </div>

            <div className={`${styles.playlistCard} glass`}>
              <div className={styles.thumbnailPlaceholder}>
                <span className={styles.playIcon}>▶</span>
              </div>
              <div className={styles.playlistInfo}>
                <span className={styles.tag}>BIOLOGY</span>
                <h3>Cellular Structures & Genetics</h3>
                <p>Explore DNA replication, gene splicing, and cellular mitosis.</p>
              </div>
            </div>

            <div className={`${styles.playlistCard} glass`}>
              <div className={styles.thumbnailPlaceholder}>
                <span className={styles.playIcon}>▶</span>
              </div>
              <div className={styles.playlistInfo}>
                <span className={styles.tag}>CHEMISTRY</span>
                <h3>Organic Reaction Mechanisms</h3>
                <p>Master carbon chemistry bonds, synthesis, and molecular geometry.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
