import React, { useState, useEffect } from "react";
import styles from "./Exercise.module.css";

interface SentenceArrangementProps {
  words: string[];
  correctAnswer: string;
  onCorrect: () => void;
}

const SentenceArrangement: React.FC<SentenceArrangementProps> = ({
  words,
  correctAnswer,
  onCorrect,
}) => {
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const handleSelectWord = (word: string) => {
    if (isCorrect) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));
    if ([...selectedWords, word].join(" ") === correctAnswer) {
      setIsCorrect(true);
      onCorrect();
    }
  };

  return (
    <div className={styles.exercise}>
      <h3 className="text-lg font-semibold mb-2 text-right">
        :Arrange the words
      </h3>
      <div className={styles.selectedWords}>{selectedWords.join(" ")}</div>
      <div className={styles.availableWords}>
        {availableWords.map((word, index) => (
          <button key={index} onClick={() => handleSelectWord(word)}>
            {word}
          </button>
        ))}
      </div>
      {isCorrect && <p className={styles.correct}>✅ Correct!</p>}
    </div>
  );
};

export default SentenceArrangement;
