import { db } from "../src/app/lib/db";

export async function getUserByEmail(email: string) {
  try {
    const data = await db.user.findUnique({
      where: {
        email,
      },
    });
    return data;
  } catch (error) {
    null;
  }
}
