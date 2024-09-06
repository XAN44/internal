import React from "react";
import Userinfo from "../../components/dashboard/userinfo";
import UserInterests from "../../components/dashboard/interest/UserInterests";
import Loading from "../../lib/loading/loading";
import BadgeMain from "../../components/dashboard/badge/BadgeMain";
import ProgressMain from "../../components/dashboard/ProgressReport/ProgressMain";
import AllCourseToUse from "../../components/dashboard/Allcourse/AllCourse";
import BookMarkContent from "../../components/dashboard/BookMark/BookMarkContent";

async function page() {
  // let initial = null;
  // let isLoading = true;
  // let error = null;

  // try {
  //   const { data, status } = await elysia.api.Course.ChangeAvatar.get();
  //   if (status === 200) {
  //     initial = data;
  //   } else {
  //     error = "Failed to fetch data.";
  //   }
  // } catch (err) {
  //   error = "An error occurred: ";
  // } finally {
  //   isLoading = false;
  // }

  // if (!initial || !initial.Course) {
  //   return <div>Error: No data available.</div>;
  // }

  // const { interest, ...DataInfo } = initial;
  // const { Course } = DataInfo;

  // // ตรวจสอบว่ามี Course หรือไม่ก่อนที่จะเข้าถึงข้อมูลภายใน
  // if (!Course) {
  //   return <div>Error: Course data is not available.</div>;
  // }

  // const AllcoursePercent = parseFloat(Course.allCoursePerCentage || "0");
  // const requireCoursePerCentage = parseFloat(
  //   Course.requireCoursePerCentage || "0"
  // );

  // const {
  //   StatusCompleted,
  //   StatusPending,
  //   HardSkill,
  //   SoftSkill,
  //   newBadgeAchievementsThisYear,
  //   totalBadgesSoFarThisYear,
  // } = Course;

  // const AllCourse =
  //   Course.AllCourse?.map((course) => ({
  //     ...course,
  //     completionPercentage: parseFloat(course.completionPercentage || "0"),
  //   })) || [];

  // const bookMarkedCourses =
  //   Course.AllCourse?.filter((course) => course.isBookMark) || [];

  return (
    <div className="w-full min-h-screen p-6">
      {/* <div
        className="
          grid 
          xsm:grid-cols-1
          md:grid-cols-3
          items-stretch
          place-items-center
          gap-3
        ">
        <Userinfo initialState={DataInfo} isLoading={isLoading} />
        <UserInterests interest={interest} isLoading={isLoading} />
        <BadgeMain />
      </div> */}
      {/* <div className="mt-6">
        <ProgressMain
          badgeNew={newBadgeAchievementsThisYear}
          badgeFar={totalBadgesSoFarThisYear}
          HardSkill={HardSkill}
          SoftSkill={SoftSkill}
          statusCompleted={StatusCompleted}
          statusPending={StatusPending}
          isLoading={isLoading}
          AllcourseProcess={AllcoursePercent}
          requireCoursePerCentage={requireCoursePerCentage}
        />
      </div>
      <div className="mt-6">
        <AllCourseToUse AllCourse={AllCourse} isLoading={isLoading} />
      </div>
      <div className="mt-6">
        <BookMarkContent bookMarkedCourses={bookMarkedCourses} />
      </div> */}
    </div>
  );
}

export default page;
