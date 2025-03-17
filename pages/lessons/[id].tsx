
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  if (!lesson) return null;

  const isNextLessonUnlocked = lesson.nextLessonId 
    ? ProgressManager.isLessonCompleted(id as string)
    : false;

  return (
    <div className={styles.lessonContainer}>
      <MobileNav 
        title={lesson.title} 
        onBack={() => router.push('/')} 
      />
      
      <div className={styles.content}>
        <h1 className={styles.title}>{lesson.title}</h1>
        <p className={styles.description}>{lesson.description}</p>
        
        <div className={styles.mainContent}>
          <p>{lesson.content}</p>
          
          <div className={styles.examples}>
            <h2>Examples:</h2>
            {lesson.examples.map((example, index) => (
              <div key={index} className={styles.example}>
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          {lesson.nextLessonId && (
            <Button 
              onClick={handleNext}
              fullWidth 
              disabled={!isNextLessonUnlocked}
            >
              Next Lesson: {getLessonById(lesson.nextLessonId)?.title}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
