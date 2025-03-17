
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import "../styles/CreateEventButton.css";  // Import the external CSS file

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="create-event-button"
    >
      <span className="create-event-text"> + Create</span>
    </button>
  );
}
