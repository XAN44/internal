import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import SettingUser from "./SettingUser";

interface Props {
  departnames: { id: number; departname: string }[];

  userInfo: {
    id: string;
    username: string | null;
    name: string | null;
    last: string | null;
    email: string | null;
    image: string | null;
    role: string | null;
    Department: {
      id: number;
      departname: string | null;
    } | null;
  } | null;
}

function SettingCard({ userInfo, departnames }: Props) {
  return (
    <div className="w-full h-full flex">
      <CardDashBoard>
        <SettingUser userInfo={userInfo} departnames={departnames} />
      </CardDashBoard>
    </div>
  );
}

export default SettingCard;
