// // app/api/markLesson/route.ts
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "../../../../../../lib/auth/getSession";
// import { db } from "../../../../../../lib/db";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const user = await getCurrentUser();
//     if (!user?.id) {
//       return NextResponse.json("Unauthorized");
//     }

//     const findCourse = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//       },
//     });

//     if (!findCourse) {
//       return NextResponse.json("Course not found");
//     }

//     const updateLesson = await db.lesson.update({
//       where: {
//         chapterId: params.chapterId,
//       },
//       data: {
//         isCompleted: true,
//       },
//     });

//     const totalLessons = await db.lesson.count({
//       where: {
//         chapter: {
//           courseId: params.courseId,
//         },
//       },
//     });

//     const completedLessons = await db.lesson.count({
//       where: {
//         chapter: {
//           courseId: params.courseId,
//         },
//         isCompleted: true,
//       },
//     });

//     const progress = Math.round((completedLessons / totalLessons) * 100);

//     const updateEnrollment = await db.enrollment.updateMany({
//       where: {
//         userId: user.id,
//         courseId: params.courseId,
//       },
//       data: {
//         progress,
//       },
//     });

//     return NextResponse.json({
//       lesson: updateLesson,
//       enrollment: updateEnrollment,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: "Error something went wrong" });
//   }
// }
