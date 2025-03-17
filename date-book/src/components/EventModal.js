import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "../styles/EventModal.css";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal({ selectedHour, userSelectedDate }) {
  const { setShowEventModal, dispatchCalEvent, selectedEvent, daySelected } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
  );

  // Handle time selection
  const [time, setTime] = useState(selectedEvent ? new Date(selectedEvent.day).toTimeString().slice(0, 5) : selectedHour ? `${String(selectedHour).padStart(2, '0')}:00` : "12:00");

  function handleSubmit(e) {
    e.preventDefault();

    const eventDay = new Date(userSelectedDate || daySelected);
    const [hours, minutes] = time.split(":").map(Number);
    eventDay.setHours(hours, minutes, 0, 0);  // Set the selected hour and minutes

    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: eventDay.valueOf(),  // Store timestamp for day with time
      id: selectedEvent ? selectedEvent.id : Date.now(),  // Use existing or new ID
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);  // Close the modal
  }

  return (
    <div className="modal-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        <header className="modal-header">
          <span className="material-icons-outlined icon">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined icon clickable"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)} type="button">
              <span className="material-icons-outlined icon clickable">close</span>
            </button>
          </div>
        </header>
        <div className="modal-content">
          <div className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined icon">schedule</span>
            <p>
              {new Date(userSelectedDate || daySelected).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <label htmlFor="time" className="time-label">
             
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="time-input"
              required
            />
            <span className="material-icons-outlined icon">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="description-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined icon">bookmark_border</span>
            <div className="label-selector">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`label-circle ${lblClass}`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined check-icon">check</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="modal-footer">
          <button type="submit" className="save-button">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
