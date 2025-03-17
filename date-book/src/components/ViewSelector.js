import React from "react";
import { useNavigate } from "react-router-dom";

const ViewSelector = ({ currentView, setView }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const newView = e.target.value;
    setView(newView); // Update the current view state
    navigate(`/${newView}`); // Navigate to the selected view route (day, week, month)
  };

  return (
    <div className="view-selector">
      <select value={currentView} onChange={handleChange}>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
    </div>
  );
};

export default ViewSelector;