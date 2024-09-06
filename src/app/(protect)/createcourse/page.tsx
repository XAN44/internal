import React from "react";
import CreateCourse from "../../components/createCourse/createCourse";

async function page() {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <CreateCourse />
    </div>
  );
}

export default page;
