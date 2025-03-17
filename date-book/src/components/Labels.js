import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import "../styles/Labels.css"; // Import the external stylesheet

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p className="label-title">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="label-item">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className="label-checkbox"
            style={{
              backgroundColor: checked ? getLabelColor(lbl) : "transparent",
              borderColor: getLabelColor(lbl),
            }}
          />
          <span className="label-text">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );

  function getLabelColor(label) {
    const labelColors = {
      indigo: "#5c67f2",
      gray: "#b0b0b0",
      green: "#34d399",
      blue: "#3b82f6",
      red: "#ef4444",
      purple: "#8b5cf6",
    };
    return labelColors[label] || "#ccc"; // Default color if label not found
  }
}
