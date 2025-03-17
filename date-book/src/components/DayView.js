import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";
import "../styles/DayView.css";

export default function DayView() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userSelectedDate, setUserSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const { setShowEventModal, showEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  const getHours = () => Array.from({ length: 24 }, (_, i) => i);

  const isCurrentDay = (date) => {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isToday = isCurrentDay(userSelectedDate);

  const handleTimeSlotClick = (hour) => {
    setSelectedHour(hour);
    setShowEventModal(true);
  };

  const getEventsForHour = (hour) => {
    return filteredEvents.filter((evt) => {
      const eventDate = new Date(evt.day);
      return (
        eventDate.getDate() === userSelectedDate.getDate() &&
        eventDate.getMonth() === userSelectedDate.getMonth() &&
        eventDate.getFullYear() === userSelectedDate.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(userSelectedDate);
    previousDay.setDate(userSelectedDate.getDate() - 1);
    setUserSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(userSelectedDate);
    nextDay.setDate(userSelectedDate.getDate() + 1);
    setUserSelectedDate(nextDay);
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <div className="time-zone">GMT +2</div>
        <div className="date-info">
          
          <button className="btn-1" onClick={handlePreviousDay}>Previous Day</button>
          <button className="btn-2" onClick={handleNextDay}>Next Day</button>
        </div>
          <div className="date-info-text">
          <div>{userSelectedDate.toLocaleString("en-US", { weekday: "short" })}</div>
          <div className={`date ${isToday ? "today" : ""}`}>
            <span className={`date-circle ${isToday ? "bg-blue text-white" : "bg-gray text-black"}`}>
              {userSelectedDate.getDate()}
            </span>
          </div>
          </div>
      </div>

      <div className="day-view">
        <div className="time-column">
          {getHours().map((hour) => (
            <div
              key={hour}
              className={`time-slot ${selectedHour === hour ? "selected" : ""}`}
              onClick={() => handleTimeSlotClick(hour)}
            >
              <span>
                {hour === 0 ? "12:00 AM" : hour === 12 ? "12:00 PM" : `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`}
              </span>
            </div>
          ))}
        </div>

        <div className="events-column">
          {getHours().map((hour) => {
            const events = getEventsForHour(hour);
            return (
              <div key={hour} className={`event-slot ${selectedHour === hour ? "highlighted" : ""}`} onClick={() => handleTimeSlotClick(hour)}>
                {events.map((evt, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();  // Prevent modal from opening on event click
                      setSelectedEvent(evt);
                      setShowEventModal(true);
                    }}
                    className={`event-label-${evt.label}`}
                  >
                    {evt.title}
                  </div>
                ))}
              </div>
            );
          })}

          {isToday && (
            <div
              className="current-time-indicator"
              style={{
                top: `${(currentTime.getHours() * 40) + (currentTime.getMinutes() / 60) * 40}px`
              }}
            />
          )}
        </div>
      </div>

      {showEventModal && (
        <EventModal 
          selectedHour={selectedHour}  
          userSelectedDate={userSelectedDate}  
        />
      )}
    </div>
  );
}