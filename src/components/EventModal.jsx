import React, { useContext, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { BiTimeFive } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { GiPlainCircle } from "react-icons/gi";
import { GoCheckCircleFill } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

const labelClasses = ["indigo", "green", "gray", "blue", "red", "orange"];
const EventModal = () => {
  const { selectedDay, setShowEventModal, dispatchCalEvent, selectedEvent ,setSelectedEvent} =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [desc, setDesc] = useState(selectedEvent ? selectedEvent.desc : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClasses.find((lbl) => lbl === selectedEvent.label)
      : labelClasses[0]
  );
  useEffect(() => {
    !selectedEvent && setSelectedEvent(null)
      }, [selectedEvent]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const calenderEvent = {
      title,
      desc,
      label: selectedLabel,
      day: selectedDay.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
if(title){
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calenderEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calenderEvent });
    }
}


    setShowEventModal(false);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/4 min-w-[300px] shadow-lg">
      <header className="flex justify-between px-2 bg-gray-100 py-3">
        <HiOutlineMenuAlt4 className="text-gray-500 text-xl" />
        <div className="flex space-x-1">
          {selectedEvent && (
            <MdDeleteOutline
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
              }}
              className="text-gray-400 txt text-xl cursor-pointer hover:text-gray-600 active:text-gray-600"
            />
          )}
          <MdOutlineClose
            onClick={() => setShowEventModal(false)}
            className="text-gray-400 txt text-xl cursor-pointer hover:text-gray-600 active:text-gray-600"
          />
        </div>
      </header>
      <form className="p-3 bg-white">
        <div className="grid grid-cols-1.5 items-center pb-2">
          <div></div>
          <input
            className="px-2 py-1 text-lg placeholder:text-gray-400 font-semibold outline-none border-b   focus:border-blue-800"
            placeholder="Add title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1.5 items-center py-2">
          <BiTimeFive className="text-gray-500 text-lg" />
          <span className="text-sm text-gray-700">
            {selectedDay && selectedDay.format("dddd,MMMM YYYY")}
          </span>
        </div>
        <div className="grid grid-cols-1.5 py-3 items-center ">
          <HiOutlineMenuAlt3 className="text-gray-500 text-lg" />

          <input
            className="px-2 py-1 text-sm placeholder:text-gray-400 font-medium outline-none border-b focus:border-blue-800"
            placeholder="Add a description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1.5 items-center ">
          <CiBookmark className="text-gray-500 text-lg" />
          <div className="flex gap-x-2 py-2">
            {labelClasses.map((lbl, i) => (
              <span
                key={i}
                onClick={() => {
                  setSelectedLabel(lbl);
                }}
                className={`cursor-pointer text-lg`}
                style={{ color: lbl, opacity: "0.8" }}
              >
                {selectedLabel === lbl ? (
                  <GoCheckCircleFill />
                ) : (
                  <GiPlainCircle />
                )}
              </span>
            ))}
          </div>
        </div>
      </form>
      <footer className="flex justify-end px-3 py-2 bg-white border-t">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-5 py-1 shadow-sm rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold"
        
        >
          Save
        </button>
      </footer>
    </div>
  );
};

export default EventModal;
