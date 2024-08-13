import * as z from "zod";
import { DepartMent, Role } from "../../modal/abYourself";

const validDepartments = DepartMent.map((d) => d.value);
const validRole = Role.map((d) => d.value);

export const AboutYourSelfSchema = z.object({
  firstName: z
    .string()
    .min(2, "Your firstname must be at least 3 characters. "),
  lastName: z.string().min(2, "Your lastname must be at least 3 characters."),
  department: z.string().min(1, "Select your department"),

  role: z.string().min(1, "Select your role"),
});
