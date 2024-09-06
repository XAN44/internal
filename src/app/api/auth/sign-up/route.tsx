import bcrypt from "bcryptjs";
import { SignUpSchema } from "../../../lib/schema/auth/zodAuth";
import { db } from "../../../lib/db";
import { generateVerificationToken } from "../../../../../server/token";
import { sendVerificationEmailByNodemailer } from "../../../lib/Mailer/reg";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const validateField = SignUpSchema.safeParse(data);
    if (!validateField.success) {
      return NextResponse.json({ error: "Invalid field!" }, { status: 400 });
    }

    const { username, email, password } = validateField.data;

    const existingUser = await db.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This account is already registered." },
        { status: 400 }
      );
    }

    const hashPw = await bcrypt.hash(password, 10);

    await db.user.create({
      data: { username, email, password: hashPw },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmailByNodemailer(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json({
      success: "Register Success, Check the email you used to register",
    });
  } catch (error) {
    console.error("Failed to create account:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
