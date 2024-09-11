import React from "react";
import { getCurrentUser } from "../../../../../lib/auth/getSession";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/db";

import ChapterCustomMain from "../../../../../components/createCourse/cardChapterCustom/ChapterCustomMain";
import MainCardQuiz from "../../../../../components/createCourse/cardQuiz/mainCardQuiz";
import Banner from "../../../../../components/banner";

async function Page({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/auth/sign-in");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  const lesson = await db.lesson.findFirst({
    where: {
      chapterId: params.chapterId,
    },
  });

  const quiz = await db.quiz.findFirst({
    where: {
      chapterId: params.chapterId,
    },
    orderBy: {
      position: "asc",
    },
    include: {
      questions: true,
    },
  });

  if (
    !chapter?.id ||
    (chapter.type === "Lesson" && !lesson?.id) ||
    (chapter.type === "Quiz" && !quiz?.id)
  ) {
    return redirect("/home");
  }
  const questions = quiz?.questions || [];

  // จำนวนคำถามขั้นต่ำที่ต้องการ
  const MIN_QUESTIONS = 5;

  // ตรวจสอบว่ามีคำถามอย่างน้อย 5 ข้อ
  const hasMinimumQuestions = questions.length >= MIN_QUESTIONS;

  // ตรวจสอบว่าคำถามทั้งหมดมีคำตอบที่ถูกต้อง
  const allQuestionsHaveCorrectAnswer =
    hasMinimumQuestions &&
    questions.every((question) => question.correctAnswer);

  // ตรวจสอบว่าทุกคำถามมีตัวเลือกขั้นต่ำ 4 ตัวเลือก
  const allQuestionsHaveMinOptions =
    hasMinimumQuestions &&
    questions.every((question) => question.options.length >= 4);

  // ตรวจสอบว่าได้สร้างคำถามครบ 5 ข้อหรือไม่
  const requiredFieldQuestion = [
    hasMinimumQuestions,
    allQuestionsHaveCorrectAnswer,
    allQuestionsHaveMinOptions,
  ];

  // จำนวนคำถามที่ถูกต้องตามเงื่อนไข
  const totalFieldQuestion = MIN_QUESTIONS;
  const completedFieldQuestion = [
    hasMinimumQuestions,
    allQuestionsHaveCorrectAnswer,
    allQuestionsHaveMinOptions,
  ].filter(Boolean).length;

  // แสดงจำนวนคำถามที่สร้างแล้ว
  const completedTextQuestion = `(${questions.length}/${totalFieldQuestion})`;

  // ตรวจสอบว่า quiz ถือว่าผ่านหรือไม่
  const isCompletedQuiz = requiredFieldQuestion.every(Boolean);
  const requiredfield = [chapter.title, chapter.description, lesson?.videoUrl];

  const totalfield = requiredfield.length;
  const completedField = requiredfield.filter(Boolean).length;
  const completedText = `(${completedField}/${totalfield})`;

  const isCompleted = requiredfield.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      {chapter.type === "Lesson" && (
        <ChapterCustomMain
          chapter={chapter}
          completedText={completedText}
          isCompleted={isCompleted}
          lesson={lesson!}
          params={params}
        />
      )}
      {chapter.type === "Quiz" && (
        <MainCardQuiz
          chapter={chapter}
          completedText={completedTextQuestion}
          isCompleted={isCompletedQuiz}
          params={params}
          quiz={quiz}
        />
      )}
    </>
  );
}

export default Page;
