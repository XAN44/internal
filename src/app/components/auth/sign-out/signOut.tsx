import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { SignOut } from "../../../../../server/signOut";

function SignOutButton() {
  const handleSigOut = () => {
    SignOut();
  };

  return (
    <div onClick={handleSigOut}>
      <RiLogoutBoxRLine
        className="
      w-6 h-6 shrink-0 group flex"
      />
      <span className="sr-only">Sign-Out</span>
    </div>
  );
}

export default SignOutButton;
