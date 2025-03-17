import React, { useState } from "react";
import styles from "./Exercise.module.css";

interface Props {
  words: string[];
  correctAnswer: string[]; // Corrected to array
  onCorrect: () => void;
}

//interface DragResult { // Unused interface removed
//  destination?: {
//    index: number;
//  };
//  source: {
//    index: number;
//  };
//}

export const SentenceArrangement: React.FC<Props> = ({ words, correctAnswer, onCorrect }) => {
  const [currentOrder, setCurrentOrder] = useState([...words.reverse()]); // Start RTL

  const handleDrag = (index: number) => {
    const newOrder = [...currentOrder];
    const draggedWord = newOrder.splice(index, 1)[0];
    newOrder.unshift(draggedWord); // Move word to the right (RTL logic)
    setCurrentOrder(newOrder);
  };

  const checkAnswer = () => {
    // Correct comparison logic: Join array elements into a string for comparison.
    if (currentOrder.join(" ") === correctAnswer.join(" ")) { 
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