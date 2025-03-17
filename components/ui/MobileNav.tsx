
import React from 'react';
import { useRouter } from 'next/router';
import styles from './MobileNav.module.css';

interface MobileNavProps {
  title: string;
  onBack?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ title, onBack }) => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      {onBack && (
        <button onClick={onBack} className={styles.backButton}>
          ←
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </nav>
  );
};
