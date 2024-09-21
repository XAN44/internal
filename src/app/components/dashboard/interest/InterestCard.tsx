"use client";
import { Button } from "@nextui-org/button";
import { Avatar, avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { ImMail4 } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import InterestSkelTon from "./InterestSkelTon";
import InterestContent from "./InterestContent";
import IsOpenCard from "./IsOpenCard";
interface UserProps {
  interest: { name: string }[];

  isLoading?: boolean;
}

const InterestCard = ({ interest, isLoading }: UserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>("");

  const handleOpen = (item: string) => {
    setIsOpen(true);
    setSelectedInterest(item);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedInterest(null);
  };

  return (
    <>
      {isLoading ? (
        <InterestSkelTon />
      ) : (
        <>
          <InterestContent interest={interest} onClick={handleOpen} />
          <IsOpenCard
            isOpen={isOpen}
            onClose={handleClose}
            selectedInterest={selectedInterest}
          />
        </>
      )}
    </>
  );
};

export default InterestCard;
