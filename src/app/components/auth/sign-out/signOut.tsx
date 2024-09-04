import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import clsx from "clsx";
import { signOut } from "next-auth/react";

interface Props {
  isOpen?: boolean;
}

function SignOutButton({ isOpen }: Props) {
  const handleSigOut = () => {
    signOut();
  };

  return (
    <div onClick={handleSigOut}>
      <div
        className="
      flex 
      items-center 
      justify-center
      leading-6 
      
    ">
        <RiLogoutBoxRLine
          className="
        w-6 h-6 
        shrink-0 
        flex
        md:w-6 
        md:h-6
        
        "
        />
        <span className={clsx(isOpen ? "" : "sr-only")}>Sign-Out</span>
      </div>
    </div>
  );
}

export default SignOutButton;
