import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLessonById, Lesson } from "../../data/lessons";
import { Recognition } from "../../components/exercises/Recognition";
import { FillBlank } from "../../components/exercises/FillBlank";
import { SentenceArrangement } from "../../components/exercises/SentenceArrangement";
import { ProgressManager } from "../../lib/localStorage";

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [waitingForNext, setWaitingForNext] = useState(false); // ✅ Must be inside the component

  useEffect(() => {
    if (id) {
      const foundLesson = getLessonById(id as string);
      if (foundLesson) {
        setLesson(foundLesson);
        setCompletedExercises(
          ProgressManager.getCompletedExercises(foundLesson.id),
        );
      }
    }
  }, [id]);

  const handleExerciseComplete = (exerciseType: string) => {
    if (!completedExercises.includes(exerciseType)) {
      setWaitingForNext(true); // ✅ Show "Next" button before removing exercise
    }
  };

  const handleNext = (exerciseType: string) => {
    setWaitingForNext(false); // ✅ Reset the waiting state
    const newCompleted = [...completedExercises, exerciseType];
    setCompletedExercises(newCompleted);
    ProgressManager.saveCompletedExercise(lesson.id, exerciseType);
  };

  if (!lesson)
    return <p className="text-center text-red-500">Lesson not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-lg mb-4">{lesson.description}</p>
      <div className="prose mb-8">{lesson.content}</div>

      <div className="bg-gray-100 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">Examples:</h2>
        {lesson.examples.map((example, index) => (
          <p key={index} className="text-md italic mb-2" dir="rtl">
            {example}
          </p>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Practice Exercises</h2>
      {lesson.exercises.map((exercise, index) => {
        if (completedExercises.includes(exercise.type)) return null; // Hide completed exercises
        return (
          <div key={index} className="mb-6">
            {exercise.type === "Recognition" && (
              <Recognition
                question={exercise.prompt}
                options={exercise.options}
                correctAnswer={exercise.answer}
                onCorrect={() => handleExerciseComplete(exercise.type)}
              />
            )}
            {exercise.type === "FillBlank" && (
              <FillBlank
                prompt={exercise.prompt}
                options={exercise.options}
                answer={exercise.answer}
                hint={exercise.hint}
                onCorrect={() => handleExerciseComplete(exercise.type)}
              />
            )}
            {exercise.type === "SentenceArrangement" && (
              <SentenceArrangement
                words={exercise.options}
                correctAnswer={exercise.answer}
                onCorrect={() => handleExerciseComplete(exercise.type)}
              />
            )}

            {/* ✅ Show "Next" button when waitingForNext is true */}
            {waitingForNext && (
              <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                onClick={() => handleNext(exercise.type)}
              >
                Next →
              </button>
            )}
          </div>
        );
      })}

      {lesson.nextLessonId &&
        completedExercises.length === lesson.exercises.length && (
          <button
            className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700"
            onClick={() => router.push(`/lessons/${lesson.nextLessonId}`)}
          >
            Next Lesson →
          </button>
        )}
    </div>
  );
}
