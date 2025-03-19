import React, { useState } from 'react';
import { Exercise } from '../../lib/types';
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

  // Make sure options array exists
  const options = exercise.options || [];

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === exercise.answer;

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => onComplete(true), 1000); // Progress after a short delay
    } else {
      setFeedback('incorrect');
      setAttempts(prev => prev + 1);

      if (attempts + 1 >= 2) {
        setShowHint(true); // Show hint after 2 incorrect attempts
      }
    }
  };

  // Fallback styles if module CSS isn't working
  const baseOptionClass = "w-full p-3 mb-2 text-right rounded border border-gray-300 hover:bg-gray-100";
  const correctClass = "bg-green-100 border-green-500 text-green-700";
  const incorrectClass = "bg-red-100 border-red-500 text-red-700";

  return (
    <div className={styles.exercise || "exercise-container"}>
      <p className={styles.prompt || "text-xl mb-4 text-right"} dir="rtl">{exercise.prompt}</p>
      <div className={styles.options || "options-container"}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={!!feedback} // Prevent further clicking after selection
            className={`${styles.option || baseOptionClass} ${
              selectedAnswer === option
                ? feedback === 'correct'
                  ? styles.correct || correctClass
                  : feedback === 'incorrect'
                    ? styles.incorrect || incorrectClass
                    : ''
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showHint && exercise.hint && (
        <div className={styles.hint || "mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded"}>
          💡 Hint: {exercise.hint}
        </div>
      )}

      {feedback && (
        <div className={`${styles.feedback || "mt-4 p-3 rounded"} ${
          feedback === 'correct' 
            ? styles.correct || "bg-green-100 text-green-700 border border-green-200" 
            : styles.incorrect || "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Try again'}
        </div>
      )}
    </div>
  );
};