'use client';

import React, { useState, FormEvent } from 'react';

// Define the types for your data
type QuestionType = 'Input' | 'Boolean' | 'Checkbox';

interface Question {
  text: string;
  questionType: QuestionType;
}

function CreateForm() {
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', questionType: 'Input' },
  ]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleQuestionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const newQuestions: Question[] = questions.map((q, i) => {
      if (i === index) {
        return { ...q, [name]: value };
      }
      return q;
    });
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', questionType: 'Input' }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + 'quizzes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, questions }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create quiz');
      }

      const quizData = await response.json();
      setMessage(
        `Quiz "${quizData.title}" created successfully with ID: ${quizData.id}`,
      );
      setTitle('');
      setQuestions([{ text: '', questionType: 'Input' }]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto mt-10 min-w-2xl rounded-lg bg-[#1b2331] p-4 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white"
          >
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-[#ebf2f8] p-2 shadow-md"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Questions</h2>
          {questions.map((q, index) => (
            <div
              key={index}
              className="mt-2 space-y-5 rounded-md border border-[#2f3133] p-4"
            >
              <label
                htmlFor={`question-text-${index}`}
                className="block text-sm font-medium text-white"
              >
                Question {index + 1} Text
              </label>
              <input
                id={`question-text-${index}`}
                name="text"
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="mt-1 block w-full rounded-md border-[#0f1724] p-2 shadow-md"
              />
              <label
                htmlFor={`question-type-${index}`}
                className="mt-2 block text-sm font-medium text-white"
              >
                Question Type
              </label>
              <select
                id={`question-type-${index}`}
                name="questionType"
                value={q.questionType}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-1 block w-full rounded-md border-[#0f1724] p-2 shadow-md"
              >
                <option className="text-black" value="Input">
                  Input
                </option>
                <option className="text-black" value="Boolean">
                  Boolean
                </option>
                <option className="text-black" value="Checkbox">
                  Checkbox
                </option>
              </select>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="mt-2 rounded-md bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[#53967a] px-4 py-2 font-bold text-white transition hover:bg-green-600"
        >
          Create Quiz
        </button>
      </form>

      {message && <p className="mt-4 font-medium text-green-600">{message}</p>}
      {error && <p className="mt-4 font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default CreateForm;
