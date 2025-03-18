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

  // Autofocus input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    setIsAnimating(true);

    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      setAttempts(prev => prev + 1);

      // Shake animation effect
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);

      if (attempts >= 1) {
        setShowHint(true);
      } 
      if (attempts >= 2) {
        setShowAnswer(true);
      }
    }
  };

  // Handle Enter key for fast input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCorrect) {
      handleSubmit();
    }
  };

  return (
    <div className={styles.exercise}>
      <div className={styles.fillBlankCard}>
        <div className={styles.fillBlankPrompt} dir="rtl">
          {prompt.split("___").map((part, index, array) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < array.length - 1 && (
                <div className={styles.inputWrapper}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب هنا..."
                    disabled={isCorrect}
                    className={`${styles.fillBlankInput} ${isAnimating && !isCorrect ? styles.shake : ""} ${isCorrect ? styles.correct : ""}`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Feedback & Hint Section */}
        {showHint && hint && !isCorrect && (
          <div className={styles.hintBox}>
            <span className={styles.hintIcon}>💡</span> {hint}
          </div>
        )}
        {showAnswer && !isCorrect && (
          <div className={styles.answerBox}>
            <span className={styles.answerIcon}>✓</span> الصحيح هو: <strong>{answer}</strong>
          </div>
        )}

        {/* Button Section */}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            disabled={isCorrect || input.trim() === ""}
            className={`${styles.primaryButton} ${isCorrect ? styles.correctButton : ""}`}
          >
            {isCorrect ? "✔️ صحيح!" : "تحقق من الإجابة"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillBlank; // ✅ Ensure it's a default export
