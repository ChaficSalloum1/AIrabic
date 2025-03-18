import React, { useState, useRef, useEffect } from "react";
import styles from "./Exercise.module.css";

interface FillBlankProps {
  prompt: string;
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

const FillBlank: React.FC<FillBlankProps> = ({ prompt, answer, hint, onCorrect }) => {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    setIsAnimating(true);

    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      setAttempts((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 600);
      if (attempts === 2) setShowHint(true);
      if (attempts === 3) setShowAnswer(true);
    }
  };

  return (
    <div className={styles.exercise}>
      <div className={styles.fillBlankCard}>
        <div className={styles.fillBlankPrompt} dir="rtl">
          {prompt.split("___").map((part, index) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < prompt.split("___").length - 1 && (
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={`${styles.fillBlankInput} ${isCorrect ? styles.correct : ""}`}
                  placeholder="اكتب هنا..."
                  disabled={isCorrect}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className={styles.primaryButton} disabled={isCorrect}>
        {isCorrect ? "Correct! ✓" : "Check Answer"}
      </button>

      {showHint && hint && <div className={styles.hintBox}>💡 {hint}</div>}
      {showAnswer && <div className={styles.answerBox}>Correct answer: {answer}</div>}
    </div>
  );
};

export default FillBlank;
