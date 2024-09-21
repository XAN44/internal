// Component ที่แสดง Chapter
import { Lock } from "lucide-react";
import Link from "next/link";

interface ChapterCourse {
  id: string;
  title: string;
  isCompletedLesson: boolean;
  isCompletedQuiz: boolean;
}

interface CoursesProps {
  courseId: string;
  courseSlug: string;
  filteredCourses: ChapterCourse[];
}

export function ChapterCard({
  courseSlug,
  filteredCourses,
  courseId,
}: CoursesProps) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto w-full h-full">
      {filteredCourses.map((chapter, index) => {
        // ตรวจสอบความก้าวหน้าในบทเรียนและการทดสอบจากบทก่อนหน้า
        const previousChapter = index > 0 ? filteredCourses[index - 1] : null;
        const isUnlocked =
          index === 0 ||
          (previousChapter &&
            (previousChapter.isCompletedLesson ||
              previousChapter.isCompletedQuiz));

        return (
          <div key={chapter.id} className="flex flex-col justify-start h-full">
            <div className="xsm:text-xs sm:text-sm text-blue-600">
              {isUnlocked ? (
                <Link
                  href={`/course/${courseId}/chapter/${chapter.id}`}
                  className="flex flex-col items-start h-full w-full">
                  Chapter {index + 1} : {chapter.title}
                </Link>
              ) : (
                <div className="flex">
                  <Lock className="w-4 h-4 mr-4" />
                  <p>{chapter.title}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
