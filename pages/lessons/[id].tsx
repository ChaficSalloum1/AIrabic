
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MobileNav } from '../../components/ui/MobileNav';
import { Button } from '../../components/ui/Button';
import { useTouch } from '../../lib/useTouch';
import { ProgressManager } from '../../lib/localStorage';
import { getLessonById } from '../../data/lessons';
import styles from '../../styles/Lesson.module.css';

const LessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { swipeDirection } = useTouch();
  const lesson = id ? getLessonById(id as string) : null;
  
  useEffect(() => {
    if (swipeDirection === 'left' && lesson?.nextLessonId) {
      handleNext();
    }
  }, [swipeDirection]);

  const handleNext = () => {
    if (lesson?.nextLessonId) {
      ProgressManager.saveProgress(id as string, 100);
      router.push(`/lessons/${lesson.nextLessonId}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!lesson) return null;

  return (
    <div className={styles.lessonContainer}>
      <MobileNav title={lesson.title} onBack={handleBack} />
      
      <div className={styles.content} dir="rtl">
        <p className={styles.explanation}>{lesson.explanation}</p>
        <div className={styles.example}>{lesson.example}</div>
      </div>

      <div className={styles.controls}>
        <Button 
          onClick={handleNext} 
          fullWidth 
          disabled={!ProgressManager.isLessonCompleted(id as string)}
        >
          Next Lesson
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
