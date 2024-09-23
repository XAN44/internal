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
        where: {
          isPublished: true,
        },
        select: {
          id: true,
          title: true,
          imageURL: true,
          isPublished: true,
          descriptions: true,
          Enrollment: true,
          Chapter: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
              Quiz: {
                select: {
                  id: true,
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
                  id: true,
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
      lessonId: true,
      isCompleted: true,
    },
  });

  const QuizProgress = await db.userQuizProgress.findMany({
    where: { userId: user.id },
    select: {
      quizId: true,
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

  const coursesWithProgress = filteredCategories.flatMap((category) =>
    category.course.map((course) => {
      const lessonProgress = LessonProgress.filter((progress) =>
        course.Chapter.some(
          (chapter) => chapter.Lesson && chapter.Lesson.id === progress.lessonId
        )
      );

      const quizProgress = QuizProgress.filter((progress) =>
        course.Chapter.some(
          (chapter) => chapter.Quiz && chapter.Quiz.id === progress.quizId
        )
      );

      const totalLessons = course.Chapter.filter(
        (chapter) => chapter.Lesson
      ).length;
      const completedLessons = lessonProgress.filter(
        (p) => p.isCompleted
      ).length;

      const totalQuizzes = course.Chapter.filter(
        (chapter) => chapter.Quiz
      ).length;
      const completedQuizzes = quizProgress.filter((p) => p.isCompleted).length;

      const totalTasks = totalLessons + totalQuizzes;
      const completedTasks = completedLessons + completedQuizzes;

      const progressPercentage =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        id: course.id,
        category: category.name,
        role: course.User.role || "Unknown Role",
        title: course.title,
        thumnel: course.imageURL || "/default-thumbnail.png",
        description: course.descriptions || "",
        avatar: course.User.image || "",
        name: course.User.username || "",
        enrollment: course.Enrollment.find((e) => e.userId === user.id),
        progress: progressPercentage,
      };
    })
  );

  return (
    <div className="w-full">
      <CardCouse
        filterCourseContinue={coursesWithProgress}
        currentId={user?.id || ""}
        category={filteredCategories}
        filteredCoursesForUser={filterCourseForYou}
        userInterests={userInterests?.interests || []}
      />
    </div>
  );
}

export default page;
