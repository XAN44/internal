"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { startOfDay, format } from "date-fns";

// Define the context type

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
interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  activity: string[];
  setActivity: React.Dispatch<React.SetStateAction<string[]>>;
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  activities: Record<string, string[]>; // Add activities to context
}

// Create a default context value
const defaultContextValue: CalendarContextType = {
  selectedDate: new Date(),
  setSelectedDate: () => {},
  activity: [],
  setActivity: () => {},
  showCalendar: false,
  setShowCalendar: () => {},
  activities: {}, // Provide an empty default
};

// Create the Calendar Context
const CalendarContext = createContext<CalendarContextType>(defaultContextValue);

// Create a provider component
export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [activity, setActivity] = useState<string[]>(
    activities[format(startOfDay(today), "yyyy-MM-dd")] || []
  );
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        activity,
        setActivity,
        showCalendar,
        setShowCalendar,
        activities,
      }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Custom hook to use the Calendar Context
export const useCalendar = () => useContext(CalendarContext);
