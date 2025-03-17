
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Import Signup

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const location = useLocation(); // Track the current route
  const [currentView, setCurrentView] = useState(location.pathname.split("/")[1] || "month");

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    // Update the current view whenever the route changes
    setCurrentView(location.pathname.split("/")[1] || "month");
  }, [location]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
        <Route
          path="/month"
          element={
            <div className="h-screen flex flex-col">
              <CalendarHeader currentView={currentView} setView={setCurrentView} />
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currenMonth} />
              </div>
            </div>
          }
        />
        <Route
          path="/day"
          element={
            <div className="h-screen flex flex-col">
              <CalendarHeader currentView={currentView} setView={setCurrentView} />
              <div className="flex flex-1">
                <Sidebar />
                <DayView />
              </div>
            </div>
          }
        />
        <Route
          path="/week"
          element={
            <div className="h-screen flex flex-col">
              <CalendarHeader currentView={currentView} setView={setCurrentView} />
              <div className="flex flex-1">
                <Sidebar />
                <WeekView />
              </div>
            </div>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
