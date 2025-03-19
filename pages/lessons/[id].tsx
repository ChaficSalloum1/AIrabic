import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLessonById, Lesson } from "../../data/lessons";
import MultipleChoice from "../../components/exercises/MultipleChoice";
import FillBlank from "../../components/exercises/FillBlank";
import SentenceArrangement from "../../components/exercises/SentenceArrangement";
import SentenceConstruction from "../../components/exercises/SentenceConstruction";
import SentenceTyping from "../../components/exercises/SentenceTyping";
import { ProgressManager } from "../../lib/localStorage";

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load lesson data when the ID changes
  useEffect(() => {
    if (id) {
      const foundLesson = getLessonById(id as string);
      if (foundLesson) {
        setLesson(foundLesson);
        setCompletedExercises(
          ProgressManager.getCompletedExercises(foundLesson.id) || [],
        );
      }
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) return <div className="text-center p-4">جار التحميل...</div>;
  if (!lesson)
    return <p className="text-center text-red-500">لم يتم العثور على الدرس</p>;

  // ✅ Handle exercise completion
  const handleExerciseComplete = () => {
    setWaitingForNext(true);
  };

  // ✅ Move to the next exercise
  const handleNext = () => {
    setWaitingForNext(false);
    setCompletedExercises([
      ...completedExercises,
      lesson.exercises[currentExerciseIndex].type,
    ]);
    ProgressManager.saveCompletedExercise(
      lesson.id,
      lesson.exercises[currentExerciseIndex].type,
    );

    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-lg mb-4">{lesson.description}</p>
      <div className="prose mb-8">{lesson.content}</div>

      <div className="bg-gray-100 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">أمثلة:</h2>
        {lesson.examples.map((example, index) => (
          <p key={index} className="text-md italic mb-2" dir="rtl">
            {example}
          </p>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">تمارين</h2>

      {/* ✅ Only show the current exercise */}
      {lesson?.exercises?.length > 0 &&
        lesson.exercises[currentExerciseIndex] && (
          <div className="mb-6">
            {lesson.exercises[currentExerciseIndex].type ===
              "MultipleChoice" && (
              <MultipleChoice
                {...lesson.exercises[currentExerciseIndex]}
                onCorrect={handleExerciseComplete}
              />
            )}
            {lesson.exercises[currentExerciseIndex].type === "FillBlank" && (
              <FillBlank
                {...lesson.exercises[currentExerciseIndex]}
                onCorrect={handleExerciseComplete}
              />
            )}
            {lesson.exercises[currentExerciseIndex].type ===
              "SentenceArrangement" && (
              <SentenceArrangement
                {...lesson.exercises[currentExerciseIndex]}
                onCorrect={handleExerciseComplete}
              />
            )}
            {lesson.exercises[currentExerciseIndex].type ===
              "SentenceConstruction" && (
              <SentenceConstruction
                {...lesson.exercises[currentExerciseIndex]}
                onCorrect={handleExerciseComplete}
              />
            )}
            {lesson.exercises[currentExerciseIndex].type ===
              "SentenceTyping" && (
              <SentenceTyping
                {...lesson.exercises[currentExerciseIndex]}
                onCorrect={handleExerciseComplete}
              />
            )}

            {waitingForNext && (
              <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                onClick={handleNext}
              >
                التالي →
              </button>
            )}
          </div>
        )}

      {/* ✅ Show "Next Lesson" button only when all exercises are completed */}
      {lesson?.nextLessonId &&
        lesson?.exercises &&
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
