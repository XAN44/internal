import React, { useState, useEffect } from "react";
import { parseDate, Time, CalendarDate } from "@internationalized/date";
import { Button, Calendar, DatePicker, DateValue } from "@nextui-org/react";
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
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
    "Test Data OK NAKUB",
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
  );

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
        animate={{
          opacity: 100,
        }}
        exit={{ opacity: 0, height: "0rem" }} // Exit animation to shrink back
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
              animate={{
                opacity: 100,
                height: "14rem",
              }}
              exit={{ opacity: 0, height: "0rem" }} // Define exit animation
              transition={{ duration: 0.6, ease: "easeInOut" }}>
              <Calendar
                className="w-full h-full"
                aria-label="Date (Uncontrolled)"
                defaultValue={dateValue}
                onChange={(date) => {
                  handleDateChange(date as CalendarDate);
                }}
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
      </motion.div>
    </motion.div>
  );
}

export default MobileCalendar;
