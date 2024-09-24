"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { BiLoader, BiPencil } from "react-icons/bi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  QuestionSchema,
  TitleFormSchema,
} from "../../../lib/schema/auth/zodCourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Chapter, Question, Quiz } from "@prisma/client";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import QuizList from "./QuizList";
import TitleForm from "../cardCourseCustom/TitleForm";

interface QuizData {
  params: {
    courseId: string;
    chapterId: string;
  };
  quiz: (Quiz & { questions: Question[] }) | null;
  chapter: Chapter;
}

function QuizForm({ quiz, params, chapter }: QuizData) {
  const querstions = quiz?.questions ?? [];
  const [isUpdating, setIsUpdateing] = useState(false);
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    } else {
      toast.error("You must have at least 4 options.");
    }
  };
  const removeOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      toast.error("You must have at least 1 option.");
    }
  };

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  const editingQuestion = quiz?.questions.find(
    (q) => q.id === editingQuestionId
  );

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const startEdit = (questionId: string) => {
    setEditingQuestionId((currentId) =>
      currentId === questionId ? null : questionId
    );
    setIsUpdate((val) => !val);
  };

  const closeEdit = () => {
    setEditingQuestionId(null);
    setIsUpdate(false);
  };

  const togleEidt = () => {
    setIsEditing((val) => !val);
  };
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (value: z.infer<typeof QuestionSchema>) => {
    startTransition(async () => {
      try {
        await axios.patch(
          `/api/course/${params.courseId}/chapter/${params.chapterId}/question`,
          {
            ...value,
            quizId: quiz?.id,
          }
        );
        router.refresh();
        togleEidt();
        form.reset();
        setOptions([""]);
        toast.success("Quiz chapter update");
      } catch (error) {
        toast.error("Something went wrong");

        console.log(error);
      }
    });
  };

  const onReoder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdateing(true);
      await axios.put(
        `/api/course/${params.courseId}/chapter/${params.chapterId}/reoderq`,
        {
          list: updateData,
        }
      );
      router.refresh();
      toast.success("Querstions reordered");
    } catch (error) {
      toast.error("Something went wrong ");
    } finally {
      setIsUpdateing(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full animate-pulse bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <BiLoader className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Questions</p>
        <Button variant="ghost" onClick={togleEidt}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </>
          )}
        </Button>
      </div>

      <QuizList
        addOption={addOption}
        removeOption={removeOption}
        editingQuestion={editingQuestion?.question || ""}
        items={querstions}
        onReoder={onReoder}
        closeEdit={closeEdit}
        editingQuestionId={editingQuestionId}
        isEditing={isEditing}
        params={params}
        quiz={quiz}
        setEditingQuestionId={setEditingQuestionId}
        startEdit={startEdit}
      />
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      isInvalid={!!form.formState.errors.question}
                      errorMessage={form.formState.errors.question?.message}
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      placeholder="Enter question here"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <p className="text-gray-500">Answer</p>

            {options.map((option, index) => (
              <div key={index}>
                <FormField
                  key={index}
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          isInvalid={!!form.formState.errors.question}
                          errorMessage={form.formState.errors.question?.message}
                          classNames={{
                            inputWrapper: "bg-blue-input/60 ring-2 ",
                          }}
                          placeholder={`Answer ${index + 1}`}
                          endContent={
                            <>
                              <Button
                                variant="light"
                                isIconOnly
                                type="button"
                                onClick={() => removeOption(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <p className="text-gray-500"> Add Correct Answer</p>

            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      isInvalid={!!form.formState.errors.correctAnswer}
                      errorMessage={
                        form.formState.errors.correctAnswer?.message
                      }
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      placeholder="Enter the correct answer here"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={options.length < 4 || isSubmitting} type="submit">
              {isPending ? <Spinner /> : "Create Quiz"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default QuizForm;
