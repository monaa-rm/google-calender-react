import { useContext, useEffect, useState } from "react";
import { getMonth } from "../src/utils";
import "./App.css";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth(9));
  const { monthIndex ,showEventModal} = useContext(GlobalContext);

  useEffect(() => setCurrentMonth(getMonth(monthIndex)), [monthIndex]);
  return (
    <>
      <div className="h-screen flex flex-col relative">
       {showEventModal && <EventModal />}
        <CalendarHeader />
        <div className="flex-grow flex">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
