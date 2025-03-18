
import React, { useState } from 'react';
import { Exercise } from '../../data/exercises';
import { Button } from '../ui/Button';
import styles from './Exercise.module.css';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export const MultipleChoice: React.FC<Props> = ({ exercise, onComplete }) => {
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (option: string) => {
    const correct = option === exercise.answer;
    if (correct) {
      onComplete(true);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  return (
    <div className={styles.exercise}>
      <p className={styles.prompt} dir="rtl">{exercise.prompt}</p>
      <div className={styles.options}>
        {exercise.options?.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            fullWidth
            className={styles.option}
          >
            {option}
          </Button>
        ))}
      </div>
      {showHint && exercise.hint && (
        <div className={styles.hint}>Hint: {exercise.hint}</div>
      )}
    </div>
  );
};
