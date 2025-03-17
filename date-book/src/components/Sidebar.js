import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import "../styles/Sidebar.css";  // Import the external stylesheet

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
