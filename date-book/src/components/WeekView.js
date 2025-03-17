import React, { useState, useEffect, useContext } from "react";
import "../styles/WeekView.css";  // Custom styles
import EventModal from "./EventModal";
import GlobalContext from "../context/GlobalContext";
import dayjs from 'dayjs';  // If using dayjs

const WeekView = ({ selectedDate, onDateChange }) => {
  const { savedEvents, setShowEventModal, setSelectedEvent, setDaySelected, showEventModal } = useContext(GlobalContext);
  const [startOfWeek, setStartOfWeek] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [userSelectedDate, setUserSelectedDate] = useState(null);

  // Calculate the start of the week (Sunday)
  const calculateStartOfWeek = (date) => {
    if (!date || !(date instanceof Date)) {
      return new Date(); // Default to current date if date is invalid
    }
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Start on Sunday
    start.setHours(0, 0, 0, 0);
    return start;
  };

  useEffect(() => {
    setStartOfWeek(calculateStartOfWeek(selectedDate));
  }, [selectedDate]);

  // Generate time slots (12-hour format)
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      timeSlots.push(`${hour}:00 ${period}`);
    }
    return timeSlots;
  };

  // Format the date header to show the day and date
  const formatDateHeader = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
  };

  const handleTimeSlotClick = (hour, date) => {
    setSelectedHour(hour); // Set the selected hour
    setUserSelectedDate(date); // Set the selected date
    setDaySelected(dayjs(date)); // Ensure daySelected is a dayjs object
    setShowEventModal(true); // Show the event modal
  };

  const getEventsForSlot = (hour, date) => {
    return savedEvents.filter(
      (event) =>
        new Date(event.day).getHours() === hour &&
        new Date(event.day).toLocaleDateString() === date.toLocaleDateString()
    );
  };

  const handlePreviousWeek = () => {
    const previousWeekStart = new Date(startOfWeek);
    previousWeekStart.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(previousWeekStart);
    onDateChange?.(previousWeekStart); // Notify parent of date change
  };

  const handleNextWeek = () => {
    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(nextWeekStart);
    onDateChange?.(nextWeekStart); // Notify parent of date change
  };

  if (!startOfWeek) return null;

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="weekview-outer-container">
      <div className="navigation-buttons">
        <button className="btn-1" onClick={handlePreviousWeek}>Previous Week</button>
        <button className="btn-2" onClick={handleNextWeek}>Next Week</button>
      </div>
      <div className="weekview-container">
        <div className="weekview-header">
          <div className="time-label">Time</div>
          {daysOfWeek.map((date, i) => (
            <div key={i} className="day-header">
              {formatDateHeader(date)}
            </div>
          ))}
        </div>
        <div className="weekview-body">
          {generateTimeSlots().map((time, timeIndex) => (
            <div key={timeIndex} className="weekview-row">
              <div className="time-label">{time}</div>
              {daysOfWeek.map((date, dayIndex) => {
                const events = getEventsForSlot(timeIndex, date);

                return (
                  <div
                    key={dayIndex}
                    className="event-cell"
                    onClick={() => handleTimeSlotClick(timeIndex, date)} // Open modal on cell click
                  >
                    {events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent modal from opening again
                          setSelectedEvent(event); // Set the event data in global context
                          setShowEventModal(true); // Open the event modal
                        }}
                        className={`event-label-${event.label}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Show EventModal if modal is open */}
        {showEventModal && (
          <EventModal selectedHour={selectedHour} userSelectedDate={userSelectedDate} />
        )}
      </div>
    </div>
  );
};

export default WeekView;