// import React from "react";
// import Day from "./Day";
// import "../styles/Month.css";  // Import the external stylesheet

// export default function Month({ month }) {
//   return (
//     <div className="month-container">
//       {month.map((row, i) => (
//         <React.Fragment key={i}>
//           {row.map((day, idx) => (
//             <Day day={day} key={idx} rowIdx={i} />
//           ))}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
import React from "react";
import Day from "./Day";
import "../styles/Month.css";  // Import the external stylesheet

export default function Month({ month }) {
  return (
    <div className="month-container">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
