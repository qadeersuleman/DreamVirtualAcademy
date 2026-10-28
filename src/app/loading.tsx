import React from 'react';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.backdropGlow} />

      <div className={styles.loaderContent}>
        {/* Animated Double Ring Spinner */}
        <div className={styles.spinnerWrapper}>
          <div className={styles.outerRing} />
          <div className={styles.innerRing} />
          <div className={styles.logoCenter}>
            <img 
              src="/images/logo-yellow.png" 
              alt="Dreams Virtual Academy" 
              className={styles.centerLogoImg} 
            />
          </div>
        </div>

        {/* Brand & Loading Status */}
        <div className={styles.textWrapper}>
          <h2 className={styles.brandTitle}>Dreams Virtual Academy</h2>
          <div className={styles.statusPill}>
            <span className={styles.pulseDot} />
            <span>Loading Excellence</span>
            <span className={styles.ellipsis}>
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
          <div className={styles.sindhiLoading}>
            سکيا جو سفر جاري آهي، مهرباني ڪري انتظار ڪريو
          </div>
        </div>

        {/* Progress Shimmer Bar */}
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}

