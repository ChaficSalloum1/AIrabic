import React, { useState } from "react";
import styles from "./Exercise.module.css";

interface Props {
  words: string[];
  correctOrder: string[];
  onCorrect: () => void;
}

export const SentenceArrangement: React.FC<Props> = ({ words, correctOrder, onCorrect }) => {
  const [currentOrder, setCurrentOrder] = useState([...words.reverse()]); // Start RTL

  const handleDrag = (index: number) => {
    const newOrder = [...currentOrder];
    const draggedWord = newOrder.splice(index, 1)[0];
    newOrder.unshift(draggedWord); // Move word to the right (RTL logic)
    setCurrentOrder(newOrder);
  };

  const checkAnswer = () => {
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
      onCorrect();
    }
  };

  return (
    <div className={styles.exercise} dir="rtl">
      <h3>Arrange the words in the correct order:</h3>
      <div className={styles.sentenceArrangement}>
        {currentOrder.map((word, index) => (
          <span key={index} draggable onDragEnd={() => handleDrag(index)} className={styles.word}>
            {word}
          </span>
        ))}
      </div>
      <button onClick={checkAnswer} className={styles.button}>
        Check Answer
      </button>
    </div>
  );
};
