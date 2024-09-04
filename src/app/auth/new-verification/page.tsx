"use client";
import React, { Suspense } from "react";
import NewVerificationForm from "../../components/NewVerificationForm";
import CardDashBoard from "../../components/dashboard/CardDashBoard";

export default function page() {
  return (
    <div
      className="
    w-full 
    min-h-screen 
    flex
    items-center 
    justify-center 
    left-0 right-0
    fixed opacity-50 bg-black ">
      <div className="w-96 ">
        <CardDashBoard>
          <Suspense fallback={<div>Loading...</div>}>
            <NewVerificationForm />
          </Suspense>
        </CardDashBoard>
      </div>
    </div>
  );
}
