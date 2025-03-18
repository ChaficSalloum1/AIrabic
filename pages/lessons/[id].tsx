import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLessonById, Lesson } from "../../data/lessons";
import MultipleChoice from "../../components/exercises/MultipleChoice";
import { FillBlank } from "../../components/exercises/FillBlank";
import { SentenceArrangement } from "../../components/exercises/SentenceArrangement";
import { SentenceConstruction } from "../../components/exercises/SentenceConstruction";
import { SentenceTyping } from "../../components/exercises/SentenceTyping";
import { ProgressManager } from "../../lib/localStorage";

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundLesson = getLessonById(id as string);
      if (foundLesson) {
        setLesson(foundLesson);
        setCompletedExercises(ProgressManager.getCompletedExercises(foundLesson.id));
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleExerciseComplete = () => {
    setWaitingForNext(true);
  };

  const handleNext = () => {
    if (!lesson) return;

    setWaitingForNext(false);
    const currentExercise = lesson.exercises[currentExerciseIndex];
    setCompletedExercises(prev => [...prev, currentExercise.type]);
    ProgressManager.saveCompletedExercise(lesson.id, currentExercise.type);

    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (!lesson) return <p className="text-center text-red-500">Lesson not found</p>;

  const currentExercise = lesson.exercises[currentExerciseIndex];

  const renderExercise = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case "MultipleChoice":
        return <MultipleChoice {...currentExercise} onCorrect={handleExerciseComplete} />;

      case "FillBlank":
        return <FillBlank {...currentExercise} onCorrect={handleExerciseComplete} />;

      case "SentenceArrangement":
        return <SentenceArrangement {...currentExercise} onCorrect={handleExerciseComplete} />;

      case "SentenceConstruction":
        return <SentenceConstruction {...currentExercise} onCorrect={handleExerciseComplete} />;

      case "SentenceTyping":
        return <SentenceTyping {...currentExercise} onCorrect={handleExerciseComplete} />;

      default:
        return (
          <div className="text-center text-red-500 p-4">
            Unknown exercise type: {currentExercise.type}
          </div>
        );
    }
  };

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

      <div className="mb-6">
        {renderExercise()}

        {waitingForNext && (
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            onClick={handleNext}
          >
            Next →
          </button>
        )}
      </div>

      {lesson.nextLessonId && completedExercises.length === lesson.exercises.length && (
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