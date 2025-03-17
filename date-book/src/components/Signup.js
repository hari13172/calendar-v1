
// import React, { useState } from "react";
// import "../styles/Signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Signup() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confpassword, setConfpassword] = useState("");
//   const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
//   const [gender, setGender] = useState("");
//   const [passwordError, setPasswordError] = useState(false);
//   const navigate = useNavigate();

//   const register = async (e) => {
//     e.preventDefault();

//     if (password !== confpassword) {
//       setPasswordError(true);
//       return;
//     }

//     const userData = {
//       firstName,
//       lastName,
//       email,
//       password,
//       dateOfBirth: `${birthday.year}-${birthday.month}-${birthday.day}`,
//       gender,
//     };

//     try {
//       const response = await axios.post("http://localhost:8081/api/datebook/signup", userData);

//       if (response.status === 200) {
//         alert("Signup successful!");
//         navigate("/");
//       }
//     } catch (error) {
//       alert(error.response?.data || "Signup failed. Please try again.");
//     }
//   };

//   const handleBirthdayChange = (e) => {
//     const { name, value } = e.target;
//     setBirthday((prevBirthday) => ({
//       ...prevBirthday,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="register">
//         <div className="register_container">
//           <h1>Sign Up</h1>
//           <p>It's a quick and easy</p>
//           <form onSubmit={register}>
//             <div className="row">
//               <input
//                 className="register_name"
//                 type="text"
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="First Name"
//                 required
//               />
//               <input
//                 className="register_name"
//                 type="text"
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Last Name"
//                 required
//               />
//             </div>
//             <center className="center">
//               <input
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//               />
//             </center>
//             <center className="center">
//               <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="New Password"
//                 maxLength={"10"}
//                 required
//               />
//               <input
//                 type="password"
//                 onChange={(e) => setConfpassword(e.target.value)}
//                 placeholder="Confirm Password"
//                 maxLength={"10"}
//                 required
//               />
//             </center>
//             {passwordError && <p className="warning">*Password doesn't match*</p>}
//             <h5 className="register_date">Date Of Birth</h5>
//             <div className="row">
//               <select
//                 className="register_date2"
//                 name="day"
//                 value={birthday.day}
//                 onChange={handleBirthdayChange}
//               >
//                 <option value="">Day</option>
//                 {[...Array(31)].map((_, index) => (
//                   <option key={index} value={index + 1}>
//                     {index + 1}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="register_date3"
//                 name="month"
//                 value={birthday.month}
//                 onChange={handleBirthdayChange}
//               >
//                 <option value="">Month</option>
//                 {[
//                   "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
//                   "Oct", "Nov", "Dec",
//                 ].map((month, index) => (
//                   <option key={index} value={index + 1}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="register_date3"
//                 name="year"
//                 value={birthday.year}
//                 onChange={handleBirthdayChange}
//               >
//                 <option value="">Year</option>
//                 {[...Array(30)].map((_, index) => (
//                   <option key={index} value={2023 - index}>
//                     {2023 - index}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <h5 className="register_gender">Gender</h5>
//             <div className="sizing">
//               <div className="register_radiocontainer">
//                 <div className="wrapper">
//                   <label>Male</label>
//                   <input
//                     type="radio"
//                     onChange={(e) => setGender(e.target.value)}
//                     name="gender"
//                     value="Male"
//                   />
//                 </div>
//                 <div className="wrapper">
//                   <label>Female</label>
//                   <input
//                     type="radio"
//                     onChange={(e) => setGender(e.target.value)}
//                     name="gender"
//                     value="Female"
//                   />
//                 </div>
//                 <div className="wrapper">
//                   <label>Others</label>
//                   <input
//                     type="radio"
//                     onChange={(e) => setGender(e.target.value)}
//                     name="gender"
//                     value="Others"
//                   />
//                 </div>
//               </div>
//             </div>
//             <p className="register_policy">
//               By clicking Sign Up, you agree to our
//               <span> Terms, & Data Policy </span> and
//               <span> Cookie Policy</span>. You may receive SMS notifications. From us and can opt-out at any time.
//             </p>
//             <center>
//               <button type="submit" className="register_register">Sign Up</button>
//             </center>
//             <center>
//               <Link to="/">
//                 <p className="register_login">Already have an Account?</p>
//               </Link>
//             </center>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [gender, setGender] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confpassword) {
      setPasswordError(true);
      return;
    }

    // Ensure the month and day are two digits (e.g., "06" instead of "6")
    const formattedMonth = birthday.month.padStart(2, "0"); // Add leading zero if necessary
    const formattedDay = birthday.day.padStart(2, "0"); // Add leading zero if necessary

    // Prepare the user data for the backend
    const userData = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth: `${birthday.year}-${formattedMonth}-${formattedDay}`, // Format as yyyy-MM-dd
      gender,
    };

    try {
      // Send signup request to the backend
      const response = await axios.post("http://localhost:8081/api/users/signup", userData);

      if (response.status === 200) {
        // Directly navigate to the login page without showing an alert
        navigate("/");
      }
    } catch (error) {
      // Show error message only if signup fails
      alert(error.response?.data || "Signup failed. Please try again.");
    }
  };

  const handleBirthdayChange = (e) => {
    const { name, value } = e.target;
    setBirthday((prevBirthday) => ({
      ...prevBirthday,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="register">
        <div className="register_container">
          <h1>Sign Up</h1>
          <p>It's a quick and easy</p>
          <form onSubmit={register}>
            <div className="row">
              <input
                className="register_name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
              <input
                className="register_name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <center className="center">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </center>
            <center className="center">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                maxLength={"10"}
                required
              />
              <input
                type="password"
                onChange={(e) => setConfpassword(e.target.value)}
                placeholder="Confirm Password"
                maxLength={"10"}
                required
              />
            </center>
            {passwordError && <p className="warning">*Password doesn't match*</p>}
            <h5 className="register_date">Date Of Birth</h5>
            <div className="row">
              <select
                className="register_date2"
                name="day"
                value={birthday.day}
                onChange={handleBirthdayChange}
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <select
                className="register_date3"
                name="month"
                value={birthday.month}
                onChange={handleBirthdayChange}
              >
                <option value="">Month</option>
                {[
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                  "Oct", "Nov", "Dec",
                ].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="register_date3"
                name="year"
                value={birthday.year}
                onChange={handleBirthdayChange}
              >
                <option value="">Year</option>
                {[...Array(30)].map((_, index) => (
                  <option key={index} value={2023 - index}>
                    {2023 - index}
                  </option>
                ))}
              </select>
            </div>
            <h5 className="register_gender">Gender</h5>
            <div className="sizing">
              <div className="register_radiocontainer">
                <div className="wrapper">
                  <label>Male</label>
                  <input
                    type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value="Male"
                  />
                </div>
                <div className="wrapper">
                  <label>Female</label>
                  <input
                    type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value="Female"
                  />
                </div>
                <div className="wrapper">
                  <label>Others</label>
                  <input
                    type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    value="Others"
                  />
                </div>
              </div>
            </div>
            <p className="register_policy">
              By clicking Sign Up, you agree to our
              <span> Terms, & Data Policy </span> and
              <span> Cookie Policy</span>. You may receive SMS notifications. From us and can opt-out at any time.
            </p>
            <center>
              <button type="submit" className="register_register">Sign Up</button>
            </center>
            <center>
              <Link to="/">
                <p className="register_login">Already have an Account?</p>
              </Link>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;