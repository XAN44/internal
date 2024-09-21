import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string | null;
  position: number;
  quizId: string;
}

interface Props {
  title: string;
  questions: Question[];
  quizId: string;
  isCompleted: boolean; // รับสถานะ isCompleted
}

export function Quiz({ title, questions, quizId, isCompleted }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const isFormValid = () => {
    return questions.every((question) => selectedAnswers[question.id]);
  };
  const router = useRouter();

  const handleSubmit = async () => {
    if (isCompleted) {
      setError("Quiz already completed.");
      return;
    }

    if (!isFormValid()) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.patch("/api/submitquiz", {
        quizId: quizId,
        answers: selectedAnswers,
      });

      if (response.status !== 200) {
        throw new Error("Failed to submit quiz");
      }

      // คำนวณคะแนน
      const correctAnswersCount = questions.filter(
        (question) => selectedAnswers[question.id] === question.correctAnswer
      ).length;

      toast.success(
        `Quiz submitted successfully! You got ${correctAnswersCount} out of ${questions.length} questions correct.`
      );
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center h-full w-full">
        <h3 className="sm:text-xl xsm:text-xs font-bold mb-3">{title}</h3>
        <h3 className="sm:text-xl font-bold mb-3 xsm:text-xs text-blue-600">
          Quiz
        </h3>
      </div>
      <div className="h-[600px] overflow-y-auto">
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <div className="flex flex-row gap-2">
              <p className="font-semibold">{index + 1}.</p>
              <p className="font-semibold">{question.question}</p>
            </div>
            <div className="mt-2">
              {question.options.map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`${question.id}-${idx}`}
                    name={question.id}
                    value={option}
                    checked={selectedAnswers[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${question.id}-${idx}`}
                    className="cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isCompleted}
          className="bg-blue-500 text-white py-2 px-4 rounded">
          {isSubmitting
            ? "Submitting..."
            : isCompleted
            ? "Quiz Completed"
            : "Submit"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
}
