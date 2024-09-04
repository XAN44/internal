import { db } from "../../src/app/lib/db";

export const getUserByEmail = async (request: {
  body: {
    email: string;
  };
}) => {
  try {
    const data = await db.user.findUnique({
      where: {
        email: request.body.email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
