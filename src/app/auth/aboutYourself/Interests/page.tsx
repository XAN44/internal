import Image from "next/image";
import CardWrapper from "../../../components/cardWarper";
import CardWarperForInter from "../../../components/cardWarperForInter";
import TitleInterest from "../../../components/interests/TitleInterest";
import { db } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return redirect("/auth/sign-in");
  }

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      interests: {
        select: {
          name: true,
        },
      },
    },
  });
  if (data?.interests && data?.interests.length > 0) {
    return redirect("/home");
  }
  return (
    <CardWarperForInter>
      <TitleInterest categories={categories} />
    </CardWarperForInter>
  );
}
