import React, { useState, useRef, useEffect } from "react";
import styles from "./Exercise.module.css";

interface Props {
  prompt: string;
  answer: string;
  hint?: string;
  onCorrect: () => void;
  showProgressBar?: boolean;
  totalProgress?: number;
  currentProgress?: number;
}

export const FillBlank: React.FC<Props> = ({
  prompt,
  answer,
  hint,
  onCorrect,
  showProgressBar = false,
  totalProgress = 1,
  currentProgress = 0,
}) => {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Motivational messages based on attempts
  const motivationalMessages = [
    "أنت قريب! You're close!",
    "استمر! Keep going!",
    "!مع الممارسة تأتي المهارة Practice makes perfect!",
  ];

  // Shake animation class
  const shakeClass = isAnimating && !isCorrect ? styles.shake : "";

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

      // Set motivational message
      if (newAttempts <= motivationalMessages.length) {
        setMotivationalMessage(motivationalMessages[newAttempts - 1]);
      }

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

  // Create audio feedback for correct/incorrect answers
  const playFeedbackSound = (correct: boolean) => {
    // This is just a placeholder - in a real app, you would implement actual audio
    console.log(`Playing ${correct ? 'correct' : 'incorrect'} sound`);
  };

  return (
    <div className={styles.exercise}>
      {/* Progress bar if enabled */}
      {showProgressBar && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentProgress / totalProgress) * 100}%` }}
          />
        </div>
      )}

      {/* Prompt section */}
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
                    className={`${styles.fillBlankInput} ${shakeClass} ${isCorrect ? styles.correct : ""}`}
                    aria-label="Fill in the blank"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Feedback section */}
        <div className={`${styles.feedbackSection} ${(showHint && hint) || showAnswer ? styles.visible : ""}`}>
          {showHint && hint && !isCorrect && (
            <div className={styles.hintBox}>
              <span className={styles.hintIcon}>💡</span>
              <span>{hint}</span>
            </div>
          )}

          {showAnswer && !isCorrect && (
            <div className={styles.answerBox}>
              <span className={styles.hintIcon}>✓</span>
              <span>The correct answer is: <strong>{answer}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Motivational message */}
      {motivationalMessage && !isCorrect && (
        <div className={styles.motivationMessage}>
          {motivationalMessage}
        </div>
      )}

      {/* Button section */}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleSubmit}
          disabled={isCorrect || input.trim() === ""}
          className={`${styles.primaryButton} ${isCorrect ? styles.correctButton : ""} ${input.trim() === "" ? styles.disabledButton : ""}`}
          aria-label={isCorrect ? "Correct answer" : "Check answer"}
        >
          {isCorrect ? "Correct! ✓" : "Check Answer"}
        </button>

        {attempts > 0 && !isCorrect && (
          <button
            onClick={() => {
              setInput(answer);
              setShowAnswer(true);
            }}
            className={styles.secondaryButton}
            aria-label="Show answer"
          >
            Show Answer
          </button>
        )}
      </div>

      {/* Success message */}
      {isCorrect && (
        <div className={styles.successMessage}>
          Great job! 🎉
        </div>
      )}
    </div>
  );
};