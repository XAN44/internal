"use client";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { cn } from "../../../../lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await axios.delete("/api/notification", {
        data: { id: notificationId }, // ส่ง id ของ notification ที่ต้องการลบใน data
      });
      router.refresh();
      toast.success(response.data.success);
    } catch (error) {
      toast.error("Error deleting notification");
    }
  };
  return (
    <div className="w-full h-full p-6 text-lg ">
      <p className="font-bold">Notification Center</p>
      {initials.map((notification, index) => (
        <div
          className="flex  mt-4 group hover:cursor-pointer"
          key={index}
          onClick={() => handleRead(notification)}>
          <div
            className={cn(
              "group-hover:bg-blue-300 sm:gap-0 xsm:gap-6 rounded-lg flex sm:flex-row xsm:flex-col items-center justify-between w-full p-3  group-hover:text-black",
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
                <p>{notification.title}</p>
                <p className="text-sm">{notification.body}</p>
              </div>
            </div>
            <p className="text-sm">
              {format(new Date(notification.createdAt), "h:mm")}
            </p>
            <Button
              variant="bordered"
              color="danger"
              onClick={(event) => {
                event.stopPropagation();
                deleteNotification(notification.id);
              }}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
