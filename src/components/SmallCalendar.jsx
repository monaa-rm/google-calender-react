import dayjs from "dayjs";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { getMonth } from "../utils";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import GlobalContext from "../context/GlobalContext";

const SmallCalander = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSelectedDay, selectedDay, setSmallCalendarMonth } =
    useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex + 1);
  };

  return (
    <div className="py-4">
      <header className="flex items-center justify-between">
        <p className="font-bold text-gray-500 ">
          {" "}
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "YYYY MMMM"
          )}
        </p>
        <div className="flex">
          <AiOutlineLeft
            className="cursor-pointer text-gray-600 hover:text-blue-500 active:text-blue-600 mx-2 font-bold"
            onClick={handlePrevMonth}
          />
          <AiOutlineRight
            className="cursor-pointer text-gray-600 hover:text-blue-500 active:text-blue-600 mx-2 font-bold"
            onClick={handleNextMonth}
          />
        </div>{" "}
      </header>
      <div className="grid grid-rows-6 grid-cols-7 py-2">
        {currentMonth[0].map((row, i) => (
          <span key={i} className="text-center text-sm py-1">
            {row.format("dd").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currentMonth);
                  setSelectedDay(day);
                }}
                key={idx}
                className={`p-1 w-full 
                ${
                  selectedDay &&
                  day.format("DD-MM-YY") === selectedDay.format("DD-MM-YY") &&
                  "rounded-full text-blue-600 bg-blue-100"
                }
                ${
                  day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") &&
                  "rounded-full bg-blue-500 text-white"
                }
                ${i === 0 && day.format("D") > 24 && "text-gray-300"} 
                ${i === 4 && day.format("D") < 7 && "text-gray-300"}
              `}
                disabled={
                  (i === 0 && day.format("D") > 24) ||
                  (i === 4 && day.format("D") < 7)
                }
              >
                <span className="text-sm ">{day.format("D")}</span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalander;
