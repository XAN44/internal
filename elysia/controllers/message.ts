// controllers/message.ts
import Elysia, { t } from "elysia";

// กำหนดประเภทข้อมูลสำหรับการตอบสนอง
const AvatarResponse = t.Object({
  success: t.Boolean(),
  avatarUrl: t.String(),
  name: t.String(),
  job: t.String(),
  departMent: t.String(),
});

export const messageController = new Elysia({ prefix: "/Course" }).get(
  "/ChangeAvatar",
  () => {
    const avatarUrl =
      "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const name = "Xan";
    const job = "Full Stack Web Dev";
    const departMent = "DepartMent";
    return {
      job,
      departMent,
      name,
      success: true,
      avatarUrl,
    };
  },
  {
    response: AvatarResponse,
  }
);
