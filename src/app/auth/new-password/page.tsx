"use client";
import { Suspense } from "react";
import NewPassword from "../../components/auth/new-password/newPassword";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPassword />;
    </Suspense>
  );
}

export default Page;
