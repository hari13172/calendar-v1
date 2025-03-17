// import dayjs from "dayjs";
// import React, { useContext, useState, useEffect } from "react";
// import GlobalContext from "../context/GlobalContext";
// import "../styles/Day.css";  // Import external stylesheet

// export default function Day({ day, rowIdx }) {
//   const [dayEvents, setDayEvents] = useState([]);
//   const {
//     setDaySelected,
//     setShowEventModal,
//     filteredEvents,
//     setSelectedEvent,
//   } = useContext(GlobalContext);

//   useEffect(() => {
//     const events = filteredEvents.filter((evt) => dayjs(evt.day).isSame(day, "day"));
//     setDayEvents(events);
//   }, [filteredEvents, day]);

//   const getCurrentDayClass = () => {
//     return day.isSame(dayjs(), "day") ? "current-day" : "";
//   };

//   const renderEvents = () => {
//     return dayEvents.map((evt, idx) => (
//       <div
//         key={idx}
//         onClick={() => setSelectedEvent(evt)}
//         className={`event-label-${evt.label}`}
//       >
//         {evt.title}
//       </div>
//     ));
//   };

//   return (
//     <div className="day-container">
//       <header className="day-header">
//         {rowIdx === 0 && <p className="day-name">{day.format("ddd").toUpperCase()}</p>}
//         <p className={`day-number ${getCurrentDayClass()}`}>{day.format("DD")}</p>
//       </header>
//       <div
//         className="day-body"
//         onClick={() => {
//           setDaySelected(day);
//           setShowEventModal(true);
//         }}
//       >
//         {renderEvents()}
//       </div>
//     </div>
//   );
// }
import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import "../styles/Day.css";  // Import external stylesheet

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter((evt) => dayjs(evt.day).isSame(day, "day"));
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.isSame(dayjs(), "day") ? "current-day" : "";
  };

  const renderEvents = () => {
    return dayEvents.map((evt, idx) => (
      <div
        key={idx}
        onClick={() => setSelectedEvent(evt)}
        className={`event-label-${evt.label}`}
      >
        {evt.title}
      </div>
    ));
  };

  // Add 'scrollable' class if there are 2 or more events
  const dayBodyClass = dayEvents.length >= 2 ? "day-body scrollable" : "day-body";

  return (
    <div className="day-container">
      <header className="day-header">
        {rowIdx === 0 && <p className="day-name">{day.format("ddd").toUpperCase()}</p>}
        <p className={`day-number ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
      <div
        className={dayBodyClass}
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {renderEvents()}
      </div>
    </div>
  );
}
