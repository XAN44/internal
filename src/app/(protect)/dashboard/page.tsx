import React, { Suspense } from "react";
import Userinfo from "../../components/dashboard/userinfo";
import MainDashboard from "../../components/dashboard/MainDashboard";
import { elysia } from "../../../../elysia/client";

async function page() {
  const { data, error, status } = await elysia.api.Course.ChangeAvatar.get();

  if (status === 200) {
    const initial = data;
    if (!initial) {
      return <div>No data available.</div>;
    }

    return (
      <div className="w-full min-h-screen p-6">
        <div className="w-full p-1 grid grid-cols-3 gap-4">
          {/* User Info */}
          <div className="w-full sm:w-96 xsm:mb-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Userinfo
                avatar={initial.avatarUrl}
                departMent={initial.departMent}
                job={initial.job}
                name={initial.name}
              />
            </Suspense>
          </div>
          <div className="">Card 1</div>
          <div className="">Card 2</div>
        </div>
      </div>
    );
  }
}
export default page;
