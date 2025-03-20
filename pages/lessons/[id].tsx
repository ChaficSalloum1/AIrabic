import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getExercisesByLessonId } from "../../data/exercises";
import ExerciseComponent from "../../components/ExerciseComponent";
import { Exercise } from "../../lib/types";

const LessonPage: React.FC = () => {
  const router = useRouter();
  const { id: lessonId } = router.query;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lessonId && typeof lessonId === "string") {
      // Fetch exercises for this lesson
      const lessonExercises = getExercisesByLessonId(lessonId);
      setExercises(lessonExercises);
      setCurrentExerciseIndex(0);
      setCompleted([]);
      setIsLoading(false);
    }
  }, [lessonId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>No exercises found for this lesson.</p>
        </div>
        <button
          onClick={() => router.push("/lessons")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  const handleComplete = () => {
    setCompleted([...completed, currentExercise.id]);

    // Move to next exercise or finish lesson
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // All exercises completed
      router.push(`/lessons/${lessonId}/complete`);
    }
  };

  const progress = ((completed.length / exercises.length) * 100).toFixed(0);

  // In your render method of LessonPage
  return (
    <div className="container mx-auto p-4">
      {/* Simplify to isolate the error */}
      <h2 className="text-xl font-bold mb-6">
        {currentExercise ? currentExercise.title : "No exercise title"}
      </h2>

      {/* Render the exercise component with a safety check */}
      {currentExercise ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <ExerciseComponent
            exercise={currentExercise}
            onComplete={handleComplete}
          />
        </div>
      ) : (
        <div>No exercise data available</div>
      )}
    </div>
  );
};

export default LessonPage;
