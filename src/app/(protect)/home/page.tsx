"use client";
import { useEffect, useState } from "react";
import CardCouse from "../../components/home/cardCourse";

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  isEnrollment: boolean;
}

interface User {
  username: string | null;
  image: string | null;
  role: string | null;
}

interface Course {
  id: string;
  title: string;
  imageURL: string | null;
  descriptions: string | null;
  isPublished: boolean;

  Enrollment: Enrollment[];
  User: User;
}

interface Category {
  id: string;
  name: string;
  course: Course[];
}

interface Interest {
  id: string;
  name: string;
}

interface Data {
  user: {
    id: string;
  };
  categories: Category[];
  filterCourseForYou: Course[];
  userInterests: Interest[];
  overallProgressPercentage: number;
}

const Page = () => {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/content");
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="w-full">
      <CardCouse
        currentId={data.user?.id || ""}
        category={data.categories}
        filteredCoursesForUser={data.filterCourseForYou}
        userInterests={data.userInterests || []}
        overallProgressPercentage={data.overallProgressPercentage}
      />
    </div>
  );
};

export default Page;
