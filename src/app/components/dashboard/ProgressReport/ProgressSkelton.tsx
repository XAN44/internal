import React from "react";

function ProgressSkelton() {
  return (
    <div className="w-full h-full">
      <div className="flex w-full xsm:flex-col">
        <div className="skeleton animate-pulse w-56 h-9"> </div>
        <div className="p-4">
          <div className="skeleton w-full animate-pulse h-9 mt-6"> </div>
          <div className="skeleton w-full animate-pulse h-9 mt-6"> </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressSkelton;
