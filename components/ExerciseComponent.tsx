// components/ExerciseComponent.tsx
import React from 'react';
import { Exercise } from '../lib/types';

// Let's use conditional imports to isolate the problem
let MultipleChoice = null;
let FillBlank = null;
let SentenceArrangement = null;
let SentenceConstruction = null;

try {
  // Try to import each component
  const MultipleChoiceModule = require('./exercises/MultipleChoice');
  MultipleChoice = MultipleChoiceModule.MultipleChoice || MultipleChoiceModule.default;

  const FillBlankModule = require('./exercises/FillBlank');
  FillBlank = FillBlankModule.FillBlank || FillBlankModule.default;

  const SentenceArrangementModule = require('./exercises/SentenceArrangement');
  SentenceArrangement = SentenceArrangementModule.SentenceArrangement || SentenceArrangementModule.default;

  const SentenceConstructionModule = require('./exercises/SentenceConstruction');
  SentenceConstruction = SentenceConstructionModule.SentenceConstruction || SentenceConstructionModule.default;
} catch (error) {
  console.error('Error importing exercise components:', error);
}

interface ExerciseComponentProps {
  exercise: Exercise;
  onComplete: () => void;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ 
  exercise, 
  onComplete 
}) => {
  // Add a safety check
  if (!exercise) {
    return <div>Error: Exercise data is missing</div>;
  }

  const handleComplete = () => {
    console.log(`Exercise ${exercise.id} completed!`);
    onComplete();
  };

  // Render a fallback component if we can't determine the exercise type
  if (!exercise.type) {
    return <div>Error: Exercise is missing type information</div>;
  }

  // Let's add debug information
  console.log('Rendering exercise:', exercise);
  console.log('Exercise type:', exercise.type);

  // Simple component to render when we're missing a required exercise component
  const MissingComponent = ({ name }) => (
    <div style={{ padding: '1rem', backgroundColor: '#ffecec', border: '1px solid #f56565', borderRadius: '0.375rem' }}>
      <h3 style={{ color: '#c53030', fontWeight: 'bold' }}>Component Missing</h3>
      <p>The {name} component could not be loaded.</p>
    </div>
  );

  // Use a simplified switch statement with safety checks
  switch (exercise.type) {
    case 'recognition':
      return MultipleChoice ? (
        <MultipleChoice
          exercise={exercise}
          onComplete={(correct) => {
            if (correct) handleComplete();
          }}
        />
      ) : (
        <MissingComponent name="MultipleChoice" />
      );

    case 'fillBlank':
      return FillBlank ? (
        <FillBlank
          prompt={exercise.prompt}
          answer={exercise.answer}
          hint={exercise.hint}
          onCorrect={handleComplete}
        />
      ) : (
        <MissingComponent name="FillBlank" />
      );

    case 'arrangement':
      return SentenceArrangement ? (
        <SentenceArrangement
          words={exercise.options || exercise.answer.split(' ')}
          correctAnswer={exercise.answer}
          onCorrect={handleComplete}
        />
      ) : (
        <MissingComponent name="SentenceArrangement" />
      );

    case 'construction':
      return SentenceConstruction ? (
        <SentenceConstruction
          words={exercise.options || exercise.answer.split(' ')}
          correctAnswer={exercise.answer}
          onCorrect={handleComplete}
          hint={exercise.hint}
        />
      ) : (
        <MissingComponent name="SentenceConstruction" />
      );

    default:
      return (
        <div style={{ padding: '1rem', backgroundColor: '#fffaf0', border: '1px solid #ed8936', borderRadius: '0.375rem' }}>
          <p style={{ color: '#9c4221' }}>Unsupported exercise type: {exercise.type}</p>
        </div>
      );
  }
};

// Make sure we export both ways
export { ExerciseComponent };
export default ExerciseComponent;