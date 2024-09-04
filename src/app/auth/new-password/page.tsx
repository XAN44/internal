"use client";
import { Suspense } from "react";
import NewPassword from "../../components/auth/new-password/newPassword";

function Page() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NewPassword />
      </Suspense>
    </div>
  );
}

export default Page;
