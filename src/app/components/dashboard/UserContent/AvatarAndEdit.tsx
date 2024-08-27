import { Button, Image } from "@nextui-org/react";
import React from "react";
import { FiEdit } from "react-icons/fi";

interface UserProps {
  avatar: string;
  isLoading?: boolean;
}

function UserAvatarAndEdit({ avatar, isLoading }: UserProps) {
  return (
    <>
      <Image
        src={avatar}
        alt="avatar"
        radius="full"
        removeWrapper
        className="
              w-28 h-28
              bg-cardAvatar/70 
              object-cover "
      />
      <Button
        variant="bordered"
        className="w-16 
            border-cardAvatar
          "
        endContent={<FiEdit size={60} />}>
        Edit
      </Button>
    </>
  );
}

export default UserAvatarAndEdit;
