import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineDocumentAdd } from "react-icons/hi";

export const SideBarModal = () => {
  const pathName = usePathname();
  const notificationCount = 3; // จำนวนการแจ้งเตือน

  const useRouter = useMemo(
    () => [
      {
        label: "Create Course",
        Icon: HiOutlineDocumentAdd,
        href: "/createcourse",
        active: pathName === "/createcourse",
      },
      {
        label: "Home",
        Icon: IoHomeOutline,
        href: "/home",
        active: pathName === "/home",
      },
      {
        label: "Notification",
        Icon: IoIosNotificationsOutline,
        href: "/notification",
        active: pathName === "/notification",
        notificationCount,
      },
      {
        label: "Dashboard",
        Icon: FaChartBar,
        href: "/dashboard",
        active: pathName === "/dashboard",
      },
      {
        label: "Task",
        Icon: MdOutlineTaskAlt,
        href: "/task",
        active: pathName === "/task",
      },
      {
        label: "Setting",
        Icon: IoSettingsOutline,
        href: "/setting",
        active: pathName === "/setting",
      },
    ],
    [pathName]
  );

  return useRouter;
};
