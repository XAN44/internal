import { useMemo } from "react";

export const BasicMemo = () => {
  const route = useMemo(
    () => ({
      image: "/vannessLogo.png",
    }),
    []
  );
  return route;
};
