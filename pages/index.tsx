import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold">Welcome to Lebanese Arabic Learning App</h1>
      <p className="text-lg text-gray-600 mt-2">Start learning Lebanese Arabic step-by-step.</p>

      <Link href="/lessons/1">
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700">
          Start Lesson 1
        </button>
      </Link>
    </div>
  );
}
