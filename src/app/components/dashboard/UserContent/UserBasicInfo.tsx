"use client";
import React, { useEffect, useState } from "react";

interface UserBasicInfoProps {
  name: string;
  job: string;
  email: string;
  departMent: string;
  userName: string;
  isLoading?: boolean;
}

function UserBasicInfo({
  name,
  job,
  departMent,
  isLoading,
  userName,
  email,
}: UserBasicInfoProps) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    }
    setShowLoading(false);
  }, [isLoading]);

  return (
    <>
      {showLoading ? (
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="skeleton w-56 h-8 animate-pulse"></div>
          <div className="skeleton w-40 h-5 animate-pulse"></div>
          <div className="skeleton w-40 h-3 animate-pulse"></div>
          <div className="skeleton w-56 h-8 animate-pulse"></div>
          <div className="skeleton w-56 h-8 animate-pulse"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-blue-600">{job}</p>
            <p className="text-xs">{departMent}</p>
          </div>
        </>
      )}
    </>
  );
}

export default UserBasicInfo;
