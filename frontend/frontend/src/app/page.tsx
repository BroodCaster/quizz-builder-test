'use client';

import PageLayout from '~/layouts/page-layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Quiz {
  id: number;
  title: string;
  numberOfQuestions: number;
}

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + 'quizzes',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data: Quiz[] = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col">
        <h1 className="text-center text-4xl">Quizz list</h1>

        <div className="mt-8">
          {isLoading && <p className="text-center">Loading quizzes...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {!isLoading && quizzes.length === 0 && (
            <p className="text-center">No quizzes found.</p>
          )}
          <div className="flex flex-col gap-10">
            {!isLoading && quizzes.length > 0 && (
              <ul className="space-y-4">
                {quizzes.map((quiz) => (
                  <li
                    key={quiz.id}
                    className="rounded-xl bg-[#1b2331] p-4 shadow-md"
                  >
                    <Link href={'/quizz/' + quiz.id}>
                      <h2 className="text-xl font-bold">{quiz.title}</h2>
                      <p className="text-sm text-gray-600">
                        {quiz.numberOfQuestions} questions
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
