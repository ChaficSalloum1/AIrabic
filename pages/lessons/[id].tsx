
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLessonById, Lesson } from '../../data/lessons';
import { Recognition } from '../../components/exercises/Recognition';
import { FillBlank } from '../../components/exercises/FillBlank';
import { SentenceArrangement } from '../../components/exercises/SentenceArrangement';
import { ProgressManager } from '../../lib/localStorage';

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [showExercise, setShowExercise] = useState(false);
  const [showArrangement, setShowArrangement] = useState(false);

  useEffect(() => {
    if (id) {
      const foundLesson = getLessonById(id as string);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        setLesson(null);
      }
    }
  }, [id]);

  const handleExerciseComplete = () => {
    if (lesson?.nextLessonId) {
      ProgressManager.saveExerciseProgress(lesson.id, 'recognition');
      setTimeout(() => {
        router.push(`/lessons/${lesson.nextLessonId}`);
      }, 1500);
    }
  };

  if (!lesson) return <p className="text-center text-red-500">Lesson not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-lg mb-4">{lesson.description}</p>
      <div className="prose mb-8">{lesson.content}</div>

      <div className="bg-gray-100 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">Examples:</h2>
        {lesson.examples.map((example, index) => (
          <p key={index} className="text-md italic mb-2" dir="rtl">{example}</p>
        ))}
      </div>

      {lesson.id === "1" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Practice Exercises</h2>
          <div className="space-y-8">
            <Recognition
              question="Which sentence follows the correct Lebanese Arabic word order?"
              options={[
                "أنا بحب القهوة",
                "القهوة أنا بحب ",
                "بحب أنا القهوة "
              ]}
              correctAnswer="أنا بحب القهوة"
              onCorrect={() => setShowExercise(true)}
            />
            
            {showExercise && (
              <FillBlank
                prompt="Complete the sentence: ___ بحب القهوة"
                options={["أنا", "نحن", "هي"]}
                answer="أنا"
                hint="This word means 'I' in Lebanese Arabic"
                onCorrect={() => setShowArrangement(true)}
              />
            )}
            
            {showArrangement && (
              <SentenceArrangement
                words={["القهوة", "بحب", "أنا"]}
                correctAnswer="أنا بحب القهوة"
                onCorrect={handleExerciseComplete}
              />
            )}
          </div>
        </div>
      )}

      {lesson.nextLessonId && (
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
