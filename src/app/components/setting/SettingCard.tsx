import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import SettingUser from "./SettingUser";

function SettingCard() {
  return (
    <div className="w-full h-full flex">
      <CardDashBoard>
        <SettingUser />
      </CardDashBoard>
    </div>
  );
}

export default SettingCard;
