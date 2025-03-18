import React, { useState } from 'react';
import { Exercise } from '../../data/exercises';
import { Button } from '../ui/Button';
import styles from './Exercise.module.css';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export const MultipleChoice: React.FC<Props> = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === exercise.answer;

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => onComplete(true), 1000); // ✅ Progress after a short delay
    } else {
      setFeedback('incorrect');
      setAttempts(prev => prev + 1);

      if (attempts + 1 >= 2) {
        setShowHint(true); // ✅ Show hint after 2 incorrect attempts
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
            className={`${styles.option} ${
              selectedAnswer === option
                ? feedback === 'correct'
                  ? styles.correct
                  : feedback === 'incorrect'
                    ? styles.incorrect
                    : ''
                : ''
            }`}
            disabled={!!feedback} // Prevent further clicking after selection
          >
            {option}
          </Button>
        ))}
      </div>

      {showHint && exercise.hint && (
        <div className={styles.hint}>💡 Hint: {exercise.hint}</div>
      )}

      {feedback && (
        <div className={`${styles.feedback} ${feedback === 'correct' ? styles.correct : styles.incorrect}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Try again'}
        </div>
      )}
    </div>
  );
};
