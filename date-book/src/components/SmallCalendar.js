import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import "../styles/SmallCalendar.css"; // Import the CSS file

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "current-day";
    } else if (currDay === slcDay) {
      return "selected-day";
    } else {
      return "";
    }
  }

  // Determine if the current month is February, September, November, or December
  const getMonthClass = () => {
    const month = dayjs().month(currentMonthIdx);
    if (month.isSame("February", "month") || month.isSame("September", "month") || month.isSame("November", "month") || month.isSame("December", "month")) {
      return "feb-sep-nov-dec"; // Add this class if the current month is one of those
    }
    return "";
  };

  return (
    <div className="small-calendar">
      <header className="calendar-header">
        <p className={`calendar-month ${getMonthClass()}`}>
          <span className="month-name">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM")}
          </span>
          <span className="year">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("YYYY")}
          </span>
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined nav-icon">chevron_left</span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined nav-icon">chevron_right</span>
          </button>
        </div>
      </header>
      <div className="calendar-grid">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="calendar-weekday">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`calendar-day ${getDayClass(day)}`}
              >
                <span>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
