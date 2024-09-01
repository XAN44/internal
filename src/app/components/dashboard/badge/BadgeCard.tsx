import React from "react";

interface Badge {
  id: string;
  title: string;
  date: string;
}

interface Props {
  badge: Badge[];
}
function BadgeCard({ badge }: Props) {
  return (
    <div>
      <p
        className="
                  p-3 truncate 
                  text-base 
                  xsm:text-xs">
        Fake Badge
      </p>
    </div>
  );
}

export default BadgeCard;
