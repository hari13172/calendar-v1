
// import React, { createContext, useState, useReducer } from "react";

// const GlobalContext = createContext(null);

// // Reducer function to handle adding, updating, and deleting events
// function eventsReducer(state, action) {
//   switch (action.type) {
//     case "ADD_EVENT":
//       return [...state, action.payload];
//     case "UPDATE_EVENT":
//       return state.map((event) =>
//         event.id === action.payload.id ? action.payload : event
//       );
//     case "DELETE_EVENT":
//       return state.filter((event) => event.id !== action.payload);
//     default:
//       return state;
//   }
// }

// export function GlobalProvider({ children }) {
//   const [currentView, setCurrentView] = useState("month");
//   const [monthIndex, setMonthIndex] = useState(0);
//   const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
//   const [daySelected, setDaySelected] = useState(null);
//   const [showEventModal, setShowEventModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [labels, setLabels] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   const [savedEvents, dispatchCalEvent] = useReducer(eventsReducer, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         monthIndex,
//         setMonthIndex,
//         smallCalendarMonth,
//         setSmallCalendarMonth,
//         daySelected,
//         setDaySelected,
//         showEventModal,
//         setShowEventModal,
//         dispatchCalEvent,
//         savedEvents,
//         selectedEvent,
//         setSelectedEvent,
//         labels,
//         setLabels,
//         filteredEvents,
//         setFilteredEvents,
//         currentView,
//         setView: setCurrentView,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }

// export default GlobalContext;
import React, { createContext, useState, useReducer } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const GlobalContext = createContext(null);

// Reducer function to handle adding, updating, and deleting events
function eventsReducer(state, action) {
  switch (action.type) {
    case "ADD_EVENT":
      return [...state, action.payload];
    case "UPDATE_EVENT":
      return state.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    case "DELETE_EVENT":
      return state.filter((event) => event.id !== action.payload);
    default:
      return state;
  }
}

export function GlobalProvider({ children }) {
  // View states
  const [currentView, setCurrentView] = useState("Month");

  // Calendar navigation states
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayIndex, setDayIndex] = useState(dayjs().date());

  // Event states
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
  const [daySelected, setDaySelected] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(eventsReducer, []);

  return (
    <GlobalContext.Provider
      value={{
        currentView,
        setView: setCurrentView,
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        dayIndex,
        setDayIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        filteredEvents,
        setFilteredEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
