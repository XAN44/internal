import React, { useState } from "react";
import { SideBarModal } from "../../lib/sr/sideBar";

import SidebarContent from "./sidebar-Content";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";
import { revalidatePath } from "next/cache";

async function SideBar() {
  const user = await getCurrentUser();

  const data = await db.notification.count({
    where: {
      userId: user?.id,
      isRead: false,
    },
  });

  const userData = await db.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      username: true,
      image: true,
    },
  });

  return <SidebarContent notificationCount={data} userData={userData} />;
}

export default SideBar;
