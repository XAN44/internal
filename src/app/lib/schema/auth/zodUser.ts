import { z } from "zod";

export const AvatarForm = z.object({
  image: z.string(),
});

export const NameLastForm = z.object({
  name: z.string().min(2, "Your firstname must be at least 3 characters. "),
  last: z.string().min(2, "Your lastname must be at least 3 characters."),
});

export const RoleForm = z.object({
  role: z.string().min(1, "Select your role"),
});

export const DepartmentForm = z.object({
  departmentId: z.string().min(1, "Select your department"),
});
export const UsernameForm = z.object({
  username: z.string().min(2, "Your username must be at least 3 characters."),
});
