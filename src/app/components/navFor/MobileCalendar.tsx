"use client";
import React, { useState, useEffect } from "react";
import { parseDate, CalendarDate } from "@internationalized/date";
import { Button, Calendar, DateValue } from "@nextui-org/react";
import { startOfDay, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Enrollment } from "@prisma/client";
import Link from "next/link";

export async function fetchCalendarData() {
  const res = await fetch("/api/calendar");
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

function MobileCalendar() {
  const [activities, setActivities] = useState<{
    [key: string]: { id: string; title: string }[];
  }>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activity, setActivity] = useState<{ id: string; title: string }[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // ดึงข้อมูลการลงทะเบียนจาก API เมื่อ component โหลด
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: {
          courseId: string;
          courseTitle: string;
          enrolledAt: string;
        }[] = await fetchCalendarData();
        const formattedActivities = data.reduce(
          (
            acc: { [key: string]: { id: string; title: string }[] },
            enrollment
          ) => {
            const date = format(new Date(enrollment.enrolledAt), "yyyy-MM-dd");
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push({
              id: enrollment.courseId,
              title: enrollment.courseTitle,
            });
            return acc;
          },
          {}
        );
        setActivities(formattedActivities);
      } catch (error) {
        console.error("Failed to fetch calendar data:", error);
      }
    };

    fetchData();
  }, []);
  const dateValue = parseDate(selectedDate.toISOString().split("T")[0]);
  const handleDateChange = (date: CalendarDate) => {
    const dateObj = new Date(date.year, date.month - 1, date.day);
    setSelectedDate(dateObj);
    const formattedDate = format(startOfDay(dateObj), "yyyy-MM-dd");
    setActivity(activities[formattedDate] || []);
  };

  const isDateUnavailable = (date: DateValue) => {
    const formattedDate = format(
      new Date(date.year, date.month - 1, date.day),
      "yyyy-MM-dd"
    );
    return !activities[formattedDate];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 100, x: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, height: showCalendar ? "32.5rem" : "10rem" }}
        animate={{ opacity: 100, height: showCalendar ? "37.5rem" : "17.5rem" }}
        exit={{ opacity: 0, height: "0rem" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={clsx(
          "bg-gradient-to-l from-emerald-600/30 to-purple-400/60 rounded-2xl h-full p-[3.5px]",
          showCalendar && "absolute -top-0 -translate-y-[246px] "
        )}>
        <Button
          onClick={() => setShowCalendar(!showCalendar)}
          className="
            flex 
            w-full
            items-center 
            justify-center
            mb-4 
            px-4 
            py-2 
            bg-blue-500 
            text-white 
            rounded-lg hover:bg-blue-600">
          {showCalendar ? "Hide Calendar" : "Show Calendar"}
        </Button>

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: "6rem" }}
              animate={{ opacity: 100, height: "19rem" }}
              exit={{ opacity: 0, height: "0rem" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}>
              <Calendar
                className="w-full h-full"
                aria-label="Date (Uncontrolled)"
                defaultValue={dateValue}
                onChange={(date) => handleDateChange(date as CalendarDate)}
                isDateUnavailable={isDateUnavailable}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-5">
          <div
            className="
            p-3 w-full
            bg-white 
            text-black 
            rounded-lg 
            shadow-lg 
            h-52 
            flex flex-col">
            <h3 className="text-lg font-semibold mb-2">
              {format(startOfDay(selectedDate), "MMMM d, yyyy")}
            </h3>
            <div className="overflow-y-auto flex-1">
              {activity.length > 0 ? (
                <ul className="list-disc pl-5">
                  {activity.map((act, index) => (
                    <li key={index} className="mb-1">
                      <Link href={`/course/${act.id}`}>{act.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activities for this date</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MobileCalendar;
