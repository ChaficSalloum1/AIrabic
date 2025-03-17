
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './Exercise.module.css';

interface Props {
  words: string[];
  correctAnswer: string;
  onCorrect: () => void;
}

export const SentenceArrangement: React.FC<Props> = ({ words, correctAnswer, onCorrect }) => {
  const [arrangedWords, setArrangedWords] = useState(words);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(arrangedWords);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setArrangedWords(items);
    checkAnswer(items);
  };

  const checkAnswer = (items: string[]) => {
    // For RTL, we need to join from right to left
    const currentAnswer = items.join(' ');
    if (currentAnswer === correctAnswer) {
      setIsCorrect(true);
      onCorrect();
    }
  };

  return (
    <div className={styles.exercise} dir="rtl">
      <h3 className={styles.prompt}>رتب الكلمات في الترتيب الصحيح:</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="words" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${styles.arrangementArea} ${isCorrect ? styles.correct : ''}`}
              dir="rtl"
            >
              {arrangedWords.map((word, index) => (
                <Draggable key={word} draggableId={word} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.draggableWord}
                      dir="rtl"
                    >
                      {word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
