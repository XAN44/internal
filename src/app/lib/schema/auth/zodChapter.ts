import * as z from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const ChapterTitleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const ChapterDescriptionFormSchema = z.object({
  description: z.string().min(1),
});

export const VideoUrl = z.object({
  videoUrl: z.string().min(1),
});

export const CategoryFormSchema = z.object({
  categoryId: z.string().min(1),
});

export const AttachmentsSchema = z.object({
  url: z.string().min(1),
});

export const TitleChapterShema = z.object({
  title: z.string().min(1, "Title is required"),
});
