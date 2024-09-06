import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../lib/auth/auth";
import CreateCourse from "../../components/createCourse/createCourse";
import { getCurrentUser } from "../../lib/auth/getSession";

async function page() {
  const session = await getCurrentUser();
  return (
    <div className="w-full h-full flex flex-col p-6">
      <CreateCourse />
    </div>
  );
}

export default page;
