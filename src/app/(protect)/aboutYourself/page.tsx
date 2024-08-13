import React from "react";
import CardWrapper from "../../components/cardWarper";
import AboutYourself from "../../components/Coponent-Yourself/aboutYourself";

function Page() {
  return (
    <CardWrapper headerImg="/headImg2.png">
      <AboutYourself />
    </CardWrapper>
  );
}

export default Page;
