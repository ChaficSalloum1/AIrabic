
import React from 'react';
import { useRouter } from 'next/router';
import styles from './MobileNav.module.css';
import { useTouch } from '../../lib/useTouch';

interface MobileNavProps {
  title: string;
  onBack?: () => void;
  onNext?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ title, onBack, onNext }) => {
  const router = useRouter();
  const { swipeDirection } = useTouch();

  React.useEffect(() => {
    if (swipeDirection === 'right' && onBack) {
      onBack();
    } else if (swipeDirection === 'left' && onNext) {
      onNext();
    }
  }, [swipeDirection, onBack, onNext]);

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
