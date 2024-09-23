"use client";
import React, { useMemo } from "react";
import CardDashBoard from "../CardDashBoard";
import BadgeContent from "./BadgeContent";
import BadgeSkelton from "./BadgeSkelton";

interface Badge {
  name: string;
  level: number;
}

interface BadgeMainProps {
  badges: Badge[];
}

function BadgeMain({ badges }: BadgeMainProps) {
  const memoizedBadges = useMemo(() => {
    return badges.map((badge) => ({
      name: badge.name,
      level: badge.level,
    }));
  }, [badges]);

  return (
    <CardDashBoard>
      <BadgeContent badges={memoizedBadges} />
    </CardDashBoard>
  );
}

export default BadgeMain;
