import React, { useState, useEffect } from "react";
import { parseDate, Time, CalendarDate } from "@internationalized/date";
import { Button, Calendar } from "@nextui-org/react";
import { startOfDay, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Define activities with string dates
const activities: Record<string, string[]> = {
  "2024-08-15": [
    "Meeting with the team",
    "Lunch with the team",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
  ],
  "2024-08-17": ["Project review"],
  "2024-08-18": ["Lunch with client", "Dinner with client"],
};

function MobileCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [activity, setActivity] = useState<string[]>(
    activities[format(startOfDay(today), "yyyy-MM-dd")] || []
  );
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const dateValue = parseDate(today.toISOString().split("T")[0]);
  const currentTime = new Time(
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  ); // Create current time

  const handleDateChange = (date: CalendarDate) => {
    const dateObj = new Date(date.year, date.month - 1, date.day);
    setSelectedDate(dateObj);
    const formattedDate = format(startOfDay(dateObj), "yyyy-MM-dd");
    setActivity(activities[formattedDate] || []);
    console.log("Date selected:", formattedDate); // Log formatted date
    console.log("Activities:", activities[formattedDate]); // Log activities
  };

  useEffect(() => {
    console.log("Activity updated:", activity); // Log activity on update
  }, [activity]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 100, x: 1 }}
      transition={{ duration: 1, ease: "circInOut" }}
      className="flex flex-col items-center justify-center">
      <div
        className={clsx(
          "bg-gradient-to-l from-emerald-600/30 to-purple-400/60 rounded-2xl h-full p-[3.5px]",
          showCalendar && "absolute -top-0 -translate-y-[246px] "
        )}>
        <div className={clsx("bg-white rounded-[calc(1rem-1px)] w-full p-4")}>
          <Button
            onClick={() => setShowCalendar(!showCalendar)}
            className="
            flex items-center justify-center
            w-full h-full
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
                animate={{
                  opacity: 100,
                  height: "18rem",
                }}
                exit={{ opacity: 0, height: "0rem" }} // Define exit animation
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-52 h-52">
                <Calendar
                  aria-label="Date (Uncontrolled)"
                  defaultValue={dateValue}
                  onChange={(date) => {
                    handleDateChange(date as CalendarDate);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="
              p-4 
              bg-white 
              text-black 
              rounded-lg 
              shadow-lg 
              w-52 
              h-52 
              flex flex-col">
            <h3 className="text-lg font-semibold mb-2">
              Activities for {format(startOfDay(selectedDate), "yyyy-MM-dd")}:
            </h3>
            <div className="overflow-y-auto flex-1">
              {activity.length > 0 ? (
                <ul className="list-disc pl-5">
                  {activity.map((act, index) => (
                    <li key={index} className="mb-1">
                      {act}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activities for this date</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MobileCalendar;
