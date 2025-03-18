import React, { useState } from "react";
import styles from "./Exercise.module.css";

interface MultipleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onCorrect: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  options,
  correctAnswer,
  onCorrect,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (option: string) => {
    setSelected(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    if (correct) onCorrect();
  };

  return (
    <div className={styles.exercise}>
      <h3 className={styles.question} dir="rtl">
        {question}
      </h3>
      <div className={styles.options}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={styles.option}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <p className={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect ? "✅ Correct!" : "❌ Try again"}
        </p>
      )}
    </div>
  );
};

export default MultipleChoice;
