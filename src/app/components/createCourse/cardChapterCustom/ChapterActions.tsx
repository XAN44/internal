"use client";

import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "../../modals/confirmModal";
import { useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  chapterId,
  courseId,
  disabled,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onCLick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/course/${courseId}/chapter/${chapterId}/unpublish`
        );

        toast.success("Chapter unpublish");
      } else {
        await axios.patch(
          `/api/course/${courseId}/chapter/${chapterId}/publish`
        );
        toast.success("Chapter Publish");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `/api/course/${courseId}/chapter/${chapterId}`
      );

      toast.success("Chapter Deleted");
      router.refresh();
      router.push(`/createcourse/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onCLick}
        disabled={disabled || isLoading}
        variant="bordered">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Trash className="h-4 w-4 " />
      </ConfirmModal>
    </div>
  );
};
