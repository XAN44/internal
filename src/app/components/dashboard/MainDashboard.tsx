import React from "react";
import Userinfo from "./userinfo";

function MainDashboard() {
  return (
    <div className="w-full min-h-screen p-6">
      <div className="w-full p-1 grid grid-cols-3 gap-4">
        {/* User Info */}
        <div className="w-full sm:w-96 xsm:mb-4">
          <Userinfo />
        </div>
        <div className="">Card 1</div>
        <div className="">Card 2</div>
      </div>
    </div>
  );
}

export default MainDashboard;
