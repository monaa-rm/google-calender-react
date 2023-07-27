import React, { useContext } from "react";
import {AiOutlineLeft , AiOutlineRight} from "react-icons/ai"
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
const CalendarHeader = () => {
  const {monthIndex, setMonthIndex, setSelectedDay} = useContext(GlobalContext);
  
  const handlePrevMonth = () => {

    setMonthIndex(monthIndex => monthIndex -1)
  }
  
  
  const handleNextMonth = () => {
    setMonthIndex(monthIndex => monthIndex +1)
  }
  const handleResetDay = () => {
    setMonthIndex(dayjs().month())
    setSelectedDay(dayjs())
  }
  return (
    <header className="flex items-center px-4 py-2">
      <img
        className="w-10 h-10 mr-2"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
        alt=""
      />
      <h1 className="mr-3 sm:mr-10 text-base sm:text-lg text-gray-500 font-bold">Calendar</h1>
      <button className="border rounded text-gray-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 transition-all duration-150 ease-in-out select-none py-2 px-2 sm:px-4 mr-2 font-bold text-sm" onClick={handleResetDay}>Today</button>
      <AiOutlineLeft className="cursor-pointer text-gray-600 hover:text-blue-500 active:text-blue-600 mx-2 font-bold" onClick={handlePrevMonth} />
      <AiOutlineRight className="cursor-pointer text-gray-600 hover:text-blue-500 active:text-blue-600 mx-2 font-bold" onClick={handleNextMonth} />
      <h2 className="ml-4  sm:text-lg text-gray-500 font-bold select-none">{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
    </header>
  );
};

export default CalendarHeader;
