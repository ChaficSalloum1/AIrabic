
import React, { useState } from 'react';
import { Exercise } from '../../data/exercises';
import { Button } from '../ui/Button';
import styles from './Exercise.module.css';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export const FillBlank: React.FC<Props> = ({ exercise, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    const correct = selectedOption === exercise.answer;
    if (correct) {
      onComplete(true);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const parts = exercise.prompt.split('___');

  return (
    <div className={styles.exercise}>
      <div className={styles.fillBlankPrompt} dir="rtl">
        {parts[0]}
        <select 
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={styles.select}
        >
          <option value="">Select...</option>
          {exercise.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {parts[1]}
      </div>
      <Button onClick={handleSubmit} fullWidth>
        Check Answer
      </Button>
      {showHint && exercise.hint && (
        <div className={styles.hint}>Hint: {exercise.hint}</div>
      )}
    </div>
  );
};
