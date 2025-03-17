
import React, { useState } from 'react';
import { Exercise } from '../../data/exercises';
import { Button } from '../ui/Button';
import styles from './Exercise.module.css';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export const Arrangement: React.FC<Props> = ({ exercise, onComplete }) => {
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    exercise.options || []
  );
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleWordClick = (word: string, fromArranged: boolean) => {
    if (fromArranged) {
      setArrangedWords(arrangedWords.filter(w => w !== word));
      setAvailableWords([...availableWords, word]);
    } else {
      setAvailableWords(availableWords.filter(w => w !== word));
      setArrangedWords([...arrangedWords, word]);
    }
  };

  const handleCheck = () => {
    const correct = arrangedWords.join(' ') === exercise.answer;
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
      <div className={styles.arrangement}>
        <div className={styles.arrangedWords}>
          {arrangedWords.map((word, index) => (
            <Button
              key={index}
              onClick={() => handleWordClick(word, true)}
              className={styles.wordButton}
            >
              {word}
            </Button>
          ))}
        </div>
        <div className={styles.availableWords}>
          {availableWords.map((word, index) => (
            <Button
              key={index}
              onClick={() => handleWordClick(word, false)}
              className={styles.wordButton}
            >
              {word}
            </Button>
          ))}
        </div>
      </div>
      <Button onClick={handleCheck} fullWidth>
        Check Answer
      </Button>
      {showHint && exercise.hint && (
        <div className={styles.hint}>Hint: {exercise.hint}</div>
      )}
    </div>
  );
};
