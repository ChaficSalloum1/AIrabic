
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { useTouch } from '../../lib/useTouch';
import { ProgressManager } from '../../lib/localStorage';
import styles from '../../styles/Lesson.module.css';

const LessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { swipeDirection } = useTouch();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (swipeDirection === 'left') {
      handleNext();
    }
  }, [swipeDirection]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      ProgressManager.saveProgress(id as string, 100);
      router.push('/mobile/lessons');
    }
  };

  return (
    <div className={styles.lessonContainer}>
      <div className={styles.content} dir="rtl">
        {/* Example lesson content */}
        <h1>درس {id}</h1>
        <p>مرحبا! كيف حالك؟</p>
      </div>
      <div className={styles.controls}>
        <Button onClick={handleNext} fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
