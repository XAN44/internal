"use client";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { cn } from "../../../../lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  course: {
    title: string;
    imageURL: string | null;
  } | null;
  title: string;
  body: string;
  link: string | null;
  createdAt: Date;
  isRead: boolean;
}

interface NotificationsProps {
  initials: Notification[];
}

function Notifications({ initials }: NotificationsProps) {
  const router = useRouter();

  const handleRead = async (notification: Notification) => {
    try {
      await axios.patch("/api/readnotifications", {
        notificationsId: notification.id,
      });

      if (notification.link) {
        router.refresh();

        router.push(`/course/${notification.link}`);
      } else {
        console.error("No link available for the course");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <div className="w-full h-full p-6 font-bold text-lg">
      <div>Notification Center</div>
      {initials.map((notification, index) => (
        <div
          className="flex mt-4 group hover:cursor-pointer"
          key={index}
          onClick={() => handleRead(notification)}>
          <div
            className={cn(
              "group-hover:bg-blue-300 rounded-lg flex items-center justify-between w-full p-3  group-hover:text-black",
              notification.isRead ? "text-gray-400" : "text-black"
            )}>
            <div className="flex gap-3">
              <div className="w-20 h-20">
                <Image
                  removeWrapper
                  src={notification.course?.imageURL || "/placeholder.jpg"}
                  alt="Notification Image"
                />
              </div>
              <div className="flex flex-col">
                <p>{notification.course?.title || "No Title"}</p>
                <p className="text-sm">{notification.body}</p>
              </div>
            </div>
            <p className="text-sm">
              {format(new Date(notification.createdAt), "h:mm")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
