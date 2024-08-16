import { parseDate, Time } from "@internationalized/date";
import { Calendar, TimeInput } from "@nextui-org/react";
import { startOfDay } from "date-fns";

function MobileCalendar() {
  const today = new Date();

  const dateValue = parseDate(today.toISOString().split("T")[0]);
  const currentTime = new Time(
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  ); // Create current time

  return (
    <div
      className="
 
     ">
      <div
        className="
            bg-gradient-to-l
            from-emerald-600/30
            to-purple-400/60
            rounded-2xl h-full p-[3.5px]
          
             ">
        <div
          className="     
            bg-gradient-to-br from-blue-500 to-blue-700
          rounded-[calc(1rem-1px)] ">
          <div className="w-64">
            <Calendar
              aria-label="Date (Uncontrolled)"
              defaultValue={dateValue}
            />
            <TimeInput
              isReadOnly
              label="Event Time"
              defaultValue={currentTime}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCalendar;
