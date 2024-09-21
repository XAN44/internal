import React from "react";
import Notifications from "../../components/notification/notificationCard";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";

async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const notifications = await db.notification.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      body: true,
      title: true,
      createdAt: true,
      isRead: true,
      link: true,
    },
  });

  // Process courses if notification has a link to a course
  const courses = await Promise.all(
    notifications.map(async (notification) => {
      if (notification.link) {
        const course = await db.course.findUnique({
          where: { id: notification.link },
          select: {
            title: true,
            imageURL: true,
          },
        });
        return { ...notification, course: course || null };
      }
      // Add null for course if there is no link
      return { ...notification, course: null };
    })
  );

  return <Notifications initials={courses} />;
}

export default Page;
