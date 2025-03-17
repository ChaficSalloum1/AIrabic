
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MobileNav } from '../../components/ui/MobileNav';
import { MultipleChoice } from '../../components/exercises/MultipleChoice';
import { FillBlank } from '../../components/exercises/FillBlank';
import { Arrangement } from '../../components/exercises/Arrangement';
import { getExerciseById, getExercisesByLessonId } from '../../data/exercises';
import { ProgressManager } from '../../lib/localStorage';
import styles from '../../styles/Exercise.module.css';

const ExercisePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [attempts, setAttempts] = useState(0);
  const [showReinforcement, setShowReinforcement] = useState(false);
  const exercise = id ? getExerciseById(id as string) : null;

  useEffect(() => {
    if (exercise) {
      const canAccess = ProgressManager.canAccessExercise(exercise.id);
      if (!canAccess) {
        router.push(`/lessons/${exercise.lessonId}`);
      }
    }
  }, [exercise, router]);

  const handleComplete = (correct: boolean) => {
    if (correct && exercise) {
      ProgressManager.saveExerciseProgress(exercise.lessonId, exercise.id);
      const nextExercise = getExercisesByLessonId(exercise.lessonId)
        .find(e => !ProgressManager.isExerciseCompleted(e.id));
      
      if (nextExercise) {
        router.push(`/exercises/${nextExercise.id}`);
      } else {
        router.push(`/lessons/${exercise.lessonId}`);
      }
    } else {
      setAttempts(prev => {
        if (prev + 1 >= 3) {
          setShowReinforcement(true);
        }
        return prev + 1;
      });
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
        {exercise.type === 'recognition' && (
          <MultipleChoice exercise={exercise} onComplete={handleComplete} />
        )}
        {exercise.type === 'fillBlank' && (
          <FillBlank exercise={exercise} onComplete={handleComplete} />
        )}
        {exercise.type === 'arrangement' && (
          <Arrangement exercise={exercise} onComplete={handleComplete} />
        )}
        {showReinforcement && exercise.reinforcement && (
          <div className={styles.reinforcement}>
            <h3>Let's practice this concept again:</h3>
            <p>{exercise.reinforcement}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
