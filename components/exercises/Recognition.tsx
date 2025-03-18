
import React, { useState } from 'react';
import styles from './Exercise.module.css';

interface Props {
  question: string;
  options: string[];
  correctAnswer: string;
  onCorrect: () => void;
}

export const Recognition: React.FC<Props> = ({ question, options, correctAnswer, onCorrect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      onCorrect();
    }
  };

  return (
    <div className={styles.exercise}>
      <h3 className={styles.question} dir="rtl">{question}</h3>
      <div className={styles.options}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`${styles.option} ${
              showFeedback && option === selectedAnswer
                ? isCorrect
                  ? styles.correct
                  : styles.incorrect
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correct : styles.incorrect}`}>
          {isCorrect ? '✅ Correct!' : '❌ Try again'}
        </div>
      )}
    </div>
  );
};
