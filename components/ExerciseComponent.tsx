
import React from 'react';
import { Exercise } from '../lib/types';
import { MultipleChoice } from './exercises/MultipleChoice';
import { FillBlank } from './exercises/FillBlank';
import { SentenceArrangement } from './exercises/SentenceArrangement';
import { SentenceConstruction } from './exercises/SentenceConstruction';

interface ExerciseComponentProps {
  exercise: Exercise;
  onComplete: () => void;
}

export const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ 
  exercise, 
  onComplete 
}) => {
  const handleComplete = () => {
    console.log(`Exercise ${exercise.id} completed!`);
    onComplete();
  };

  switch (exercise.type) {
    case 'recognition':
      return (
        <MultipleChoice
          exercise={exercise}
          onComplete={(correct) => {
            if (correct) handleComplete();
          }}
        />
      );
    
    case 'fillBlank':
      return (
        <FillBlank
          prompt={exercise.prompt}
          answer={exercise.answer}
          hint={exercise.hint}
          onCorrect={handleComplete}
        />
      );
    
    case 'arrangement':
      const arrangeWords = exercise.options || exercise.answer.split(' ');
      return (
        <SentenceArrangement
          words={arrangeWords}
          correctAnswer={exercise.answer}
          onCorrect={handleComplete}
        />
      );
    
    case 'construction':
      const constructionWords = exercise.options || exercise.answer.split(' ');
      return (
        <SentenceConstruction
          words={constructionWords}
          correctAnswer={exercise.answer}
          onCorrect={handleComplete}
          hint={exercise.hint}
        />
      );
    
    default:
      return (
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>Unsupported exercise type: {exercise.type}</p>
        </div>
      );
  }
};
