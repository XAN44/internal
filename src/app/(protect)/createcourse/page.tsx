import axios from "axios"; // นำเข้า axios
import CreateCourse from "../../components/createCourse/createCourse";
import { Button } from "@nextui-org/button";
import GetCourse from "../../components/createCourse/geCourse/getCourse";
import { PlusCircle } from "lucide-react";
import AddCategory from "../../components/createCategory/addCategory";
import MainGetCourse from "../../components/createCourse/mainGetCourse/maingetcourse";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";

async function Page() {
  const userCurrent = await getCurrentUser();
  const user = await db.user.findUnique({
    where: {
      id: userCurrent?.id,
    },
    select: {
      role: true,
    },
  });

  const isAdmin = user?.role === "Admin";

  return (
    <>
      <MainGetCourse isAdmin={isAdmin} />
    </>
  );
}

export default Page;
