import React from "react";
import CardWrapper from "../../components/cardWarper";
import AboutYourself from "../../components/Coponent-Yourself/aboutYourself";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return redirect("/auth/sign-in");
  }

  const data = await db.department.findMany({
    select: {
      id: true,
      departname: true,
    },
  });
  const departnames = data.map((department) => ({
    id: department.id,
    departname: department.departname,
  }));

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      username: true,
      departmentId: true,
    },
  });

  if (userData?.departmentId) {
    return redirect("/home");
  }

  return (
    <CardWrapper headerImg="/headImg2.png">
      <AboutYourself
        departnames={departnames}
        user={userData?.username || ""}
      />
    </CardWrapper>
  );
}

export default Page;
