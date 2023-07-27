import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIndex }) => {
  const {
    setSelectedDay,
    selectedDay,
    setShowEventModal,
    showEventModal,
    filterEvents,
    setSelectedEvent,
    
  } = useContext(GlobalContext);
  const [changeSelected, setChangeSelected] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filterEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [day, filterEvents]);
  useEffect(() => {
    if (dayEvents.length === 0) {
      setSelectedEvent(null)
    }
  }, [dayEvents]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  const clickedDay = (e) => {
    setChangeSelected(false);

    setSelectedDay(day);
    setShowEventModal(true);
  };

  return (
    <div
      className={`border  border-gray-200 flex flex-col cursor-pointer ${
        selectedDay.format("YYYY MMMM DD") === day.format("YYYY MMMM DD") &&
        "bg-gray-100"
      }`}
      onClick={() => clickedDay()}
    >
      <header className="flex flex-col items-center">
        {rowIndex === 0 && (
          <p className="text-sm p-1 text-center">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()} ${
            rowIndex === 0 && day.format("DD") > 24 && "text-gray-300"
          } ${rowIndex === 4 && day.format("DD") < 7 && "text-gray-300"}`}
        >
          {day.format("DD")}
        </p>
      </header>
      {dayEvents?.map((evt, i) => (
        <p
          key={i}
          onClick={() => setSelectedEvent(evt)}
          className={` truncate text-sm text-start w-full my-0.5 px-1 rounded text-white font-light`}
          style={{ background: evt.label }}
        >
          {evt.title}
        </p>
      ))}
    </div>
  );
};

export default Day;
