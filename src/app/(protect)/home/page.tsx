import CardCouse from "../../components/home/cardCourse";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";

async function page() {
  const user = await getCurrentUser();
  if (!user) return null;

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      course: {
        select: {
          id: true,
          title: true,
          imageURL: true,
          isPublished: true,
          descriptions: true,
          Enrollment: true,
          progress: true,
          Chapter: {
            select: {
              Quiz: {
                select: {
                  UserQuizProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      isCompleted: true,
                      quizId: true,
                    },
                  },
                },
              },
              Lesson: {
                select: {
                  UserLessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      isCompleted: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
          User: {
            select: {
              username: true,
              image: true,
              role: true,
            },
          },
        },
      },
    },
  });

  const LessonProgress = await db.userLessonProgress.findMany({
    where: { userId: user.id },
    select: {
      isCompleted: true,
    },
  });

  const QuizProgress = await db.userQuizProgress.findMany({
    where: { userId: user.id },
    select: {
      isCompleted: true,
    },
  });

  const userInterests = await db.user.findUnique({
    where: { id: user.id },
    select: {
      interests: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const filteredCategories = categories.map((category) => ({
    ...category,
    course: category.course.filter((course) => course.isPublished),
  }));

  const filterCourseForYou = categories
    .filter((category) =>
      userInterests?.interests.some((interest) => interest.id === category.id)
    )
    .flatMap((category) => category.course)
    .filter((course) => course.isPublished);

  const totalLessons = await db.lesson.count();
  const totalQuizzes = await db.quiz.count();

  const completedLessons = LessonProgress.filter(
    (progress) => progress.isCompleted
  ).length;
  const completedQuizzes = QuizProgress.filter(
    (progress) => progress.isCompleted
  ).length;

  const totalTasks = totalLessons + totalQuizzes;
  const completedTasks = completedLessons + completedQuizzes;
  const overallProgressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className="
          w-full
        ">
      <CardCouse
        currentId={user?.id || ""}
        category={filteredCategories}
        filteredCoursesForUser={filterCourseForYou}
        userInterests={userInterests?.interests || []}
        overallProgressPercentage={overallProgressPercentage}
      />
    </div>
  );
}

export default page;
