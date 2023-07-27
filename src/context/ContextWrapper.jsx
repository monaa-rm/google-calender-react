import React, { useEffect, useMemo, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const ContextWrapper = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(dayjs().month());
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);

  const initEvents = () => {
    const storageEvents = localStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
  };
  const savedEventsReducer = (state, { type, payload }) => {
    switch (type) {
      case "push":
        return [...state, payload];
      case "update":
        return state.map((evt) => (evt.id === payload.id ? payload : evt));
      case "delete":
        return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
  };
  const [savedEvent, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvent));
  }, [savedEvent]);

  useEffect(() => {
    setLabels((prevLabels) =>
      [...new Set(savedEvent.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      })
    );
  }, [savedEvent]);
  const updateLabel = (label) => {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  };

  const filterEvents = useMemo(() => {
    return savedEvent.filter((evt) => {
    console.log(labels
      .filter((lbl) => lbl.checked)        .map((lbl) => lbl.label)
      .includes(evt.label)
      )
     return labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    });
  },[savedEvent,labels]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        selectedDay,
        setSelectedDay,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvent,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filterEvents
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
