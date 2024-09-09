import * as z from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const TitleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const DescriptionFormSchema = z.object({
  descriptions: z.string().min(1, "Description is required"),
});

export const ImageFormSchema = z.object({
  imageURL: z.string().min(1, "Image is required"),
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

export const TitleChapterQuizShema = z.object({
  title: z.string().min(1, "Title is required"),
});
