import React from 'react';
import styles from './StatsBar.module.css'; 

const StatsBar = ({ label, value, maxValue }) => {
  const barFillHeight = `${(value / maxValue) * 100}%`;

  return (
    <div className={styles.statsBar}>
      <div className={styles.statsBar__inner}>
        <div className={styles.statsBar__fill} style={{ height: barFillHeight }}></div>
      </div>
      <div className={styles.statsBar__label}>{label}</div>
    </div>
  );
};

export default StatsBar;
