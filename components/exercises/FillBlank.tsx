import React, { useState, useRef, useEffect } from "react";
import styles from './Exercise.module.css';

interface Props {
  prompt: string;
  answer: string;
  hint?: string;
  onCorrect: () => void;
}

export const FillBlank: React.FC<Props> = ({
  prompt,
  answer,
  hint,
  onCorrect,
}) => {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Define shakeClass for animation
  const shakeClass = isAnimating && !isCorrect ? styles.shake || "shake" : "";

  const handleSubmit = () => {
    setIsAnimating(true);

    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onCorrect();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // Remove shake effect after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);

      if (newAttempts === 2) {
        setShowHint(true);
      } else if (newAttempts === 3) {
        setShowAnswer(true);
      }
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCorrect) {
      handleSubmit();
    }
  };

  return (
    <div className={styles.exercise || "exercise-container"}>
      {/* Prompt section */}
      <div className={styles.fillBlankCard || "fill-blank-card"}>
        <div className={styles.fillBlankPrompt || "fill-blank-prompt"} dir="rtl">
          {prompt.split("___").map((part, index, array) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < array.length - 1 && (
                <div className={styles.inputWrapper || "input-wrapper"}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب هنا..."
                    disabled={isCorrect}
                    className={`${styles.fillBlankInput || "fill-blank-input"} ${shakeClass} ${isCorrect ? styles.correct || "correct" : ""}`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Feedback section */}
        <div className={`${styles.feedbackSection || "feedback-section"} ${(showHint && hint) || showAnswer ? styles.visible || "visible" : ""}`}>
          {showHint && hint && !isCorrect && (
            <div className={styles.hintBox || "hint-box"}>
              <span className={styles.hintIcon || "hint-icon"}>💡</span>
              <span>{hint}</span>
            </div>
          )}

          {showAnswer && !isCorrect && (
            <div className={styles.answerBox || "answer-box"}>
              <span className={styles.answerIcon || "answer-icon"}>✓</span>
              <span>The correct answer is: <strong>{answer}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Button section */}
      <div className={styles.buttonContainer || "button-container"}>
        <button
          onClick={handleSubmit}
          disabled={isCorrect || input.trim() === ""}
          className={`${styles.primaryButton || "primary-button"} ${isCorrect ? styles.correctButton || "correct-button" : ""} ${input.trim() === "" ? styles.disabledButton || "disabled-button" : ""}`}
        >
          {isCorrect ? "Correct! ✓" : "Check Answer"}
        </button>

        {attempts > 0 && !isCorrect && (
          <button
            onClick={() => {
              setInput(answer);
              setShowAnswer(true);
            }}
            className={styles.secondaryButton || "secondary-button"}
          >
            Show Answer
          </button>
        )}
      </div>

      {/* Success message */}
      {isCorrect && (
        <div className={styles.successMessage || "success-message"}>
          Great job! 🎉
        </div>
      )}
    </div>
  );
};

// Add default export
export default FillBlank;