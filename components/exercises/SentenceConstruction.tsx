
import React, { useState, useEffect } from 'react';
import styles from './Exercise.module.css';

interface Props {
  words: string[];
  correctAnswer: string;
  onCorrect: () => void;
  hint?: string;
}

export const SentenceConstruction: React.FC<Props> = ({
  words,
  correctAnswer,
  onCorrect,
  hint
}) => {
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const handleWordSelect = (word: string, index: number) => {
    if (isCorrect) return;
    
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords([...selectedWords, word]);

    if (selectedWords.length + 1 === words.length) {
      const sentence = [...selectedWords, word].join(' ');
      if (sentence === correctAnswer) {
        setIsCorrect(true);
        onCorrect();
      } else {
        setAttempts(prev => prev + 1);
        if (attempts + 1 >= 2) {
          setShowHint(true);
        }
        // Reset the attempt
        setTimeout(() => {
          setSelectedWords([]);
          setAvailableWords([...words].sort(() => Math.random() - 0.5));
        }, 1000);
      }
    }
  };

  const handleWordRemove = (word: string, index: number) => {
    if (isCorrect) return;
    
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  return (
    <div className={styles.exercise} dir="rtl">
      <div className={styles.constructionContainer}>
        <div className={styles.wordBank}>
          {availableWords.map((word, index) => (
            <button
              key={`available-${index}`}
              className={styles.wordTile}
              onClick={() => handleWordSelect(word, index)}
            >
              {word}
            </button>
          ))}
        </div>
        <div className={styles.constructedSentence}>
          {selectedWords.map((word, index) => (
            <button
              key={`selected-${index}`}
              className={`${styles.wordTile} ${isCorrect ? styles.correct : ''}`}
              onClick={() => handleWordRemove(word, index)}
            >
              {word}
            </button>
          ))}
        </div>
        {showHint && hint && (
          <div className={styles.hint}>{hint}</div>
        )}
      </div>
    </div>
  );
};
