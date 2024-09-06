import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getCurrentUser } from "../../lib/auth/getSession";

const f = createUploadthing();

const handlerAuth = async () => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");
  return { user };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handlerAuth())
    .onUploadComplete(() => {}),
  cousreAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handlerAuth())
    .onUploadComplete(() => {}),
  chapherVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handlerAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
