'use client';

import PageLayout from '~/layouts/page-layout';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Changed import

interface Question {
  id: number;
  text: string;
  questionType: 'Input' | 'Boolean' | 'Checkbox';
}

// Define the shape of the full quiz data
interface QuizDetails {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export default function QuizPage() {
  const params = useParams(); // Changed from useRouter to useParams

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.quizzId; // Get the dynamic route parameter
    if (!id) return;

    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}quizzes/${id}`,
        );
        if (!response.ok) {
          throw new Error('Quiz not found or failed to fetch');
        }
        const data: QuizDetails = await response.json();
        setQuiz(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizDetails();
  }, [params?.quizzId]); // Updated dependency

  return (
    <PageLayout>
      <div className="flex flex-col">
        {isLoading && <p className="text-center text-white">Loading quiz...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {quiz && (
          <div className="mx-auto mt-10 w-full max-w-2xl rounded-lg bg-[#1b2331] p-6 shadow-md">
            <h1 className="mb-4 text-center text-3xl font-bold text-white">
              {quiz.title}
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Created on: {new Date(quiz.createdAt).toLocaleDateString()}
            </p>

            <h2 className="mb-4 text-xl font-semibold text-white">
              Questions:
            </h2>
            <ul className="space-y-4">
              {quiz.questions.length > 0 ? (
                quiz.questions.map((question, index) => (
                  <li
                    key={question.id}
                    className="rounded-md bg-[#2f3133] p-4 shadow-sm"
                  >
                    <p className="font-medium text-white">
                      <span className="mr-2 font-bold text-blue-400">
                        {index + 1}.
                      </span>{' '}
                      {question.text}
                    </p>
                    <div className="mt-3">
                      {question.questionType === 'Input' && (
                        <input
                          type="text"
                          className="w-full rounded-md border border-gray-600 bg-[#1a1e26] px-3 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                          placeholder="Enter your answer..."
                        />
                      )}

                      {question.questionType === 'Boolean' && (
                        <div className="flex gap-3">
                          <button className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                            Yes
                          </button>
                          <button className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
                            No
                          </button>
                        </div>
                      )}

                      {question.questionType === 'Checkbox' && (
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-600 bg-[#1a1e26] text-blue-600 focus:ring-2 focus:ring-blue-400"
                          />
                          <span className="text-gray-300">
                            Check this option
                          </span>
                        </label>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  This quiz has no questions.
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
