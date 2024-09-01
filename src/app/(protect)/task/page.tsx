import React from "react";
import CardDashBoard from "../../components/dashboard/CardDashBoard";
import TaskStatus from "../../components/task/TaskStatus";
import { elysia } from "../../../../elysia/client";

async function page() {
  let initial = null;
  let isLoading = true;
  let error = null;

  try {
    const { data, status } = await elysia.api.Course.ChangeAvatar.get();
    if (status === 200) {
      initial = data;
    } else {
      error = "Failed to fetch data.";
    }
  } catch (err) {
    error = "An error occurred: ";
  } finally {
    isLoading = false;
  }

  if (!initial) {
    return <div>No data available.</div>;
  }

  const { Course } = initial;
  const skillType = Course.AllCourse.flatMap((course) =>
    course.chapters.flatMap((chapter) =>
      chapter.tasks.map((task) => task.skillType)
    )
  );

  const {
    softSkillPercentage,
    hardSkillPercentage,
    pendingTask,
    pendingTaskPersentage,
    completedTask,
    completionTaskPersentage,
    AllCourse,
    LatestCourse,
  } = Course;

  const Task = AllCourse.flatMap((f) => f.chapters).flatMap((f) => f.tasks);

  const nameCourse = AllCourse.map((f) => f.title);

  const initials = {
    hardSkillPercentage,
    softSkillPercentage,
    pendingTask,
    pendingTaskPersentage,
    completedTask,
    completionTaskPersentage,
    skillType,
    nameCourse,
  };

  const Data = Task.map((task, index) => ({
    ...task,
    nameCourse: nameCourse[index],
  }));

  console.log();
  return (
    <div className="w-full min-h-screen p-6">
      <p className="text-xl font-bold mb-6">Task</p>
      <TaskStatus initial={initials} isLoading={isLoading} initals={Data} />
    </div>
  );
}

export default page;
