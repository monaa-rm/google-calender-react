import React, { createContext } from 'react'

const GlobalContext = createContext({
    monthIndex : null,
    setMonthIndex : (index) => {},
    smallCalendarMonth : null,
    setSmallCalendarMonth : (index) => {},
    selectedDay : null,
    setSelectedDay : (day) => {},
    showEventModal : false,
    setShowEventModal : () => {},
    dispatchCalEvent : ({type,payload}) => {},
    savedEvent : [],
    selectedEvent : null,
    setSelectedEvent : (evt) => {},
    labels : [],
    setLabels : () => {},
    updateLabel : (lbl) => {},
    filterEvents : []
})

export default GlobalContext
