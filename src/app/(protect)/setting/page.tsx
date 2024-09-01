import React from "react";
import SettingCard from "../../components/setting/SettingCard";
import CourseManageMent from "../../components/setting/CourseManageMent";
import SettingChangePassword from "../../components/setting/SettingChangePassword";
import CourseHistory from "../../components/setting/CourseHistory";
import CardConfigEmail from "../../components/setting/CardConfigEmail";
import SettingEmailAlert from "../../components/setting/SettingEmailAlert";
import CardSupport from "../../components/setting/CardSupport";

function Page() {
  return (
    <div className="w-full min-h-screen p-6">
      <p className="text-xl font-bold mb-6">Setting</p>
      <div
        className="
        sm:grid 
        sm:grid-rows-2 
        lg:grid-flow-col 
        lg:grid-cols-4
        sm:grid-cols-2
        gap-6
        w-full h-full
        xsm:space-y-3
        sm:space-y-0
        ">
        <div className="col-span-1">
          <SettingCard />
        </div>
        <div className="col-span-1 ">
          <SettingChangePassword />
        </div>
        <div className=" col-span-2 ">
          <CourseManageMent />
        </div>
        <div className="col-span-2">
          <CourseHistory />
        </div>
        <div className="col-span-2">
          <SettingEmailAlert />
        </div>
        <div className="col-span-2">
          <CardSupport />
        </div>
      </div>
    </div>
  );
}

export default Page;
