"use client";
import React, { useEffect, useState } from "react";
import UserAvatarAndEdit from "./UserContent/AvatarAndEdit";
import UserBasicInfo from "./UserContent/UserBasicInfo";
import CardDashBoard from "./CardDashBoard";

export interface Props {
  initialState: {
    userName: string;
    email: string;
    name: string;
    job: string;
    departMent: string;
    avatar: string;
  };
  isLoading: boolean;
}

function Userinfo({ initialState, isLoading }: Props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <CardDashBoard>
      <UserAvatarAndEdit initialState={initialState} isLoading={loading} />
    </CardDashBoard>
  );
}

export default Userinfo;
