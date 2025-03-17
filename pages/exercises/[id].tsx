
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MobileNav } from '../../components/ui/MobileNav';
import { MultipleChoice } from '../../components/exercises/MultipleChoice';
import { FillBlank } from '../../components/exercises/FillBlank';
import { getExerciseById } from '../../data/exercises';
import { ProgressManager } from '../../lib/localStorage';
import styles from '../../styles/Exercise.module.css';

const ExercisePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const exercise = id ? getExerciseById(id as string) : null;

  const handleComplete = (correct: boolean) => {
    if (correct && exercise) {
      ProgressManager.saveProgress(exercise.lessonId, 100);
      router.push(`/lessons/${exercise.lessonId}`);
    }
  };

  if (!exercise) return null;

  return (
    <div className={styles.container}>
      <MobileNav 
        title="Exercise" 
        onBack={() => router.push(`/lessons/${exercise.lessonId}`)} 
      />
      
      <div className={styles.content}>
        {exercise.type === 'multipleChoice' && (
          <MultipleChoice exercise={exercise} onComplete={handleComplete} />
        )}
        {exercise.type === 'fillBlank' && (
          <FillBlank exercise={exercise} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
