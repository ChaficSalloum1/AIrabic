import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLessonById, Lesson } from '../../data/lessons';

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState<Lesson | null>(null);

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

  if (!lesson) return <p className="text-center text-red-500">Lesson not found</p>;

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p className="text-lg">{lesson.description}</p>
      <p className="mt-4 text-md">{lesson.content}</p>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">Examples:</h2>
        {lesson.examples.map((example, index) => (
          <p key={index} className="text-md italic">{example}</p>
        ))}
      </div>

      {lesson.nextLessonId && (
        <button
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700"
          onClick={() => router.push(`/lessons/${lesson.nextLessonId}`)}
        >
          Next Lesson →
        </button>
      )}
    </div>
  );
}
