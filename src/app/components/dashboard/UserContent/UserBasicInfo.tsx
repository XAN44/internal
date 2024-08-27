import { Skeleton } from "@nextui-org/react";
import React from "react";

interface UserProps {
  name: string;
  job: string;
  departMent: string;
  isLoading?: boolean;
}

function UserBasicInfo({ departMent, job, name, isLoading }: UserProps) {
  return (
    <div className="flex flex-col gap-2">
      <>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-md">{job}</p>
        <p className="text-sm">{departMent}</p>
      </>
    </div>
  );
}

export default UserBasicInfo;
