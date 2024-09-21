"use client";
import React, { useEffect, useState, useMemo } from "react";
import UserAvatarAndEdit from "./UserContent/AvatarAndEdit";
import CardDashBoard from "./CardDashBoard";

export interface Props {
  initialState: {
    id: string;
    username: string | null;
    name: string | null;
    last: string | null;
    role: string | null;
    email: string | null;
    image: string | null;
    Department: {
      departname: string;
    } | null;
  };
  isLoading: boolean;
}

function Userinfo({ initialState, isLoading }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const initialsData = useMemo(() => {
    return {
      id: initialState.id,
      username: initialState.username || "",
      fullName: `${initialState.name || ""} ${initialState.last || ""}`.trim(),
      name: initialState.name, // เพิ่มที่นี่
      last: initialState.last, // เพิ่มที่นี่
      role: initialState.role || "",
      email: initialState.email,
      image: initialState.image || "",
      Department: initialState.Department, // เพิ่มที่นี่
    };
  }, [initialState]);

  return (
    <CardDashBoard>
      <UserAvatarAndEdit initialState={initialsData} isLoading={loading} />
    </CardDashBoard>
  );
}

export default Userinfo;
