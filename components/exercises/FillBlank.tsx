
import React, { useState } from 'react';
import styles from './Exercise.module.css';

interface Props {
  prompt: string;
  options: string[];
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

export const FillBlank: React.FC<Props> = ({ prompt, options, answer, hint, onCorrect }) => {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts === 2) {
        setShowHint(true);
      } else if (newAttempts === 3) {
        setShowAnswer(true);
      }
    }
  };

  return (
    <div className={styles.exercise}>
      <div className={styles.fillBlankPrompt} dir="rtl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`${styles.input} ${isCorrect ? styles.correct : ''}`}
          placeholder="Type your answer..."
          disabled={isCorrect}
        />
        {prompt.replace('___', '')}
      </div>
      
      <button 
        onClick={handleSubmit}
        className={`${styles.button} ${isCorrect ? styles.correct : ''}`}
        disabled={isCorrect}
      >
        Check Answer
      </button>

      {showHint && hint && !isCorrect && (
        <div className={styles.hint}>Hint: {hint}</div>
      )}
      
      {showAnswer && !isCorrect && (
        <div className={styles.answer}>The correct answer is: {answer}</div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import styles from './Exercise.module.css';

interface Props {
  prompt: string;
  options: string[];
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

export const FillBlank: React.FC<Props> = ({ prompt, options, answer, hint, onCorrect }) => {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts === 2) {
        setShowHint(true);
      } else if (newAttempts === 3) {
        setShowAnswer(true);
      }
    }
  };

  return (
    <div className={styles.exercise}>
      <div className={styles.fillBlankPrompt} dir="rtl">
        {prompt.split('___').map((part, index, array) => (
          <React.Fragment key={index}>
            {part}
            {index < array.length - 1 && (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`${styles.input} ${isCorrect ? styles.correct : ''}`}
                placeholder="Type here..."
                disabled={isCorrect}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <button 
        onClick={handleSubmit}
        className={`${styles.button} ${isCorrect ? styles.correct : ''}`}
        disabled={isCorrect}
      >
        Check Answer
      </button>

      {showHint && hint && !isCorrect && (
        <div className={styles.hint}>Hint: {hint}</div>
      )}

      {showAnswer && !isCorrect && (
        <div className={styles.answer}>The correct answer is: {answer}</div>
      )}
    </div>
  );
};
