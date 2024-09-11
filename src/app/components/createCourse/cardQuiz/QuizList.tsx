"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@nextui-org/button";
import { Question, Quiz } from "@prisma/client";
import { Edit2, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { Input } from "@nextui-org/input";
import { QuestionSchema } from "../../../lib/schema/auth/zodCourse";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@nextui-org/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { IoGridSharp } from "react-icons/io5";
import { BiLoader, BiPencil } from "react-icons/bi";
import { cn } from "../../../../../lib/utils";

interface Props {
  onReoder: (updateData: { id: string; position: number }[]) => void;
  params: {
    courseId: string;
    chapterId: string;
  };
  isEditing: boolean;
  editingQuestionId: string | null;
  quiz: (Quiz & { questions: Question[] }) | null;
  items: Question[];
  editingQuestion: string;
  startEdit: (id: string) => void;
  closeEdit: () => void;
  setEditingQuestionId: (id: string | null) => void;
  removeOption: (index: number) => void;
  addOption: () => void;
}

function QuizList({
  isEditing,
  editingQuestionId,
  editingQuestion,
  quiz,
  params,
  closeEdit,
  startEdit,
  setEditingQuestionId,
  onReoder,
  items,
  addOption,
  removeOption,
}: Props) {
  const [options, setOptions] = useState<string[]>([""]);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
      options: options,
      correctAnswer: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [querstions, setQuerstions] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setQuerstions(items);
  }, [items]);

  useEffect(() => {
    if (editingQuestionId && isMounted) {
      const question = items.find((item) => item.id === editingQuestionId);
      if (question) {
        form.reset({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer || "",
        });
        setOptions(question.options);
      }
    }
  }, [editingQuestionId, items, isMounted, form]);

  const onUpdate = (value: z.infer<typeof QuestionSchema>) => {
    startTransition(async () => {
      try {
        await axios.patch(
          `/api/course/${params.courseId}/chapter/${params.chapterId}/question`,
          {
            ...value,
            quizId: quiz?.id,
            questionId: editingQuestionId,
          }
        );
        form.reset(); // รีเซ็ตค่าฟอร์มเมื่อการอัปเดตเสร็จสิ้น

        router.refresh();
        setEditingQuestionId(null);
        toast.success("Quiz chapter update");
      } catch (error) {
        toast.error("Something went wrong");

        console.log(error);
      }
    });
  };

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedItems = Array.from(querstions);

    const [reorderedItem] = updatedItems.splice(result.source.index, 1);

    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setQuerstions(updatedItems);

    const updatedPositions = updatedItems.map((item, index) => ({
      id: item.id,
      position: items.findIndex((item) => item.id == item.id),
    }));

    onReoder(updatedPositions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="question">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {!isEditing && (
              <div className="text-sm mt-6">
                {!editingQuestionId &&
                  querstions.map((q, i) => (
                    <Draggable key={q.id} draggableId={q.id} index={i}>
                      {(provided) => (
                        <div
                          className="flex items-center justify-between mt-6"
                          ref={provided.innerRef}
                          {...provided.draggableProps}>
                          <div
                            className="flex gap-x-3"
                            {...provided.dragHandleProps}>
                            <IoGridSharp className="h-5 w-5" />
                            <p className="text-gray-600">{q.question}</p>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => startEdit(q.id)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}

                {editingQuestionId && (
                  <div className="flex items-center justify-between mt-6">
                    <Form {...form}>
                      <form
                        className="space-y-6 mt-4"
                        onSubmit={form.handleSubmit(onUpdate)}>
                        <FormField
                          control={form.control}
                          name="question"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  isInvalid={!!form.formState.errors.question}
                                  errorMessage={
                                    form.formState.errors.question?.message
                                  }
                                  classNames={{
                                    inputWrapper: "bg-blue-input/60 ring-2 ",
                                  }}
                                  placeholder="Enter question here"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <p className="text-gray-500"> Add Answer</p>

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
                                      isInvalid={
                                        !!form.formState.errors.question
                                      }
                                      errorMessage={
                                        form.formState.errors.question?.message
                                      }
                                      classNames={{
                                        inputWrapper:
                                          "bg-blue-input/60 ring-2 ",
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

                        <Button type="button" onClick={addOption}>
                          Add Answer
                        </Button>
                        <p className="text-gray-500"> Add Correct Answer</p>

                        <FormField
                          control={form.control}
                          name="correctAnswer"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  isInvalid={
                                    !!form.formState.errors.correctAnswer
                                  }
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
                        <div className="mt-6">
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit">
                            {isPending ? <Spinner /> : "  Update Question"}
                          </Button>
                        </div>
                      </form>
                    </Form>

                    <Button variant="ghost" onClick={closeEdit}>
                      <Edit2 className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default QuizList;
