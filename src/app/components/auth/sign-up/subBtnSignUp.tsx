import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SubSignUp() {
  return (
    <div className="text-center mt-6 xsm:flex xsm:flex-col items-center  justify-center space-y-2">
      <p className="text-sm "> have account ? </p>
      <div className="flex  lg:flex-row xsm:flex-col xsm:space-y-6 lg:space-y-0 lg:items-center lg:justify-center lg:space-x-10">
        <Link href="/auth/sign-in">
          <Button className="w-40 bg-indigo-500 text-white ">Sign In</Button>
        </Link>
        <Button
          className="w-40 text-center bg-indigo-500 text-white whitespace-normal max-w-fit"
          startContent={<FcGoogle size={30} />}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}

export default SubSignUp;
