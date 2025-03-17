import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import "../styles/CalendarHeader.css";
import ViewSelector from "./ViewSelector"; // Import ViewSelector

export default function CalendarHeader({ currentView, setView }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const currentMonth = dayjs().month();

  const handleMonthChange = (direction) => {
    setMonthIndex(monthIndex + direction);
  };

  const handleReset = () => {
    const resetMonth = monthIndex === currentMonth ? monthIndex : currentMonth;
    setMonthIndex(resetMonth);
  };

  const getFormattedMonthYear = () => {
    return dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY");
  };

  return (
    <header className="calendar-header">
      <div className="calendar-left">
        <h1 className="calendar-title">Calendar</h1>
        <div className="calendar-controls">
          <button onClick={handleReset} className="today-button">
            Today
          </button>
          <button onClick={() => handleMonthChange(-1)} className="nav-button">
            <span className="material-icons-outlined nav-icon">chevron_left</span>
          </button>
          <button onClick={() => handleMonthChange(1)} className="nav-button">
            <span className="material-icons-outlined nav-icon">chevron_right</span>
          </button>
          <h2 className="month-year">{getFormattedMonthYear()}</h2>
        </div>
      </div>
      <div className="view-selector-container">
        <ViewSelector currentView={currentView} setView={setView} />
      </div>
    </header>
  );
}