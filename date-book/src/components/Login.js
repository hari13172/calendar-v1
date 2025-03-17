// import React, { useState } from "react";
// import '../styles/Login.css';
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8081/api/datebook/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         alert("Login successful!");
//         navigate("/month");
//       }
//     } catch (error) {
//       alert(error.response?.data || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="Login">
//       <div className="spacebook">
//         <div className="spacebooktext">Spacebook</div>
//         <div className="title">
//           Spacebook helps you connect and <br />
//           share with the people in your life
//         </div>
//       </div>
//       <div className="Logincontainer">
//         <div className="Logindetails">
//           <input
//             type="email"
//             placeholder="Email Address or Phone number"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             maxLength={10}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//           <button onClick={handleLogin} className="btn"><strong>Login</strong></button>
//         </div>
//         <div className="forget">
//           <a href="forget">Forgotten Password?</a>
//           <br />
//           <Link to="/signup"><p className="btns">Create a new Account</p></Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Remove the alert and directly navigate
        navigate("/month");
      }
    } catch (error) {
      // Show error message only if login fails
      alert(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="spacebook">
        <div className="spacebooktext">Datebook</div>
        <div className="title">
        Datebook helps you organize your events <br />
        and stay on track
        </div>
      </div>
      <div className="Logincontainer">
        <div className="Logindetails">
          <input
            type="email"
            placeholder="Email Address or Phone number"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin} className="btn"><strong>Login</strong></button>
        </div>
        <div className="forget">
          <a href="forget">Forgotten Password?</a>
          <br />
          <Link to="/signup"><p className="btns">Create a new Account</p></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;