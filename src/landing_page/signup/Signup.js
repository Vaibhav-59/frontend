// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   // State to handle input
//   let [input, setInput] = useState("");

//   // useNavigate hook to handle redirection
//   const navigate = useNavigate();

//   // Handle input change
//   let handleChange = (evt) => {
//     setInput(evt.target.value);
//   };

//   // Handle form submission
//   let handleSubmit = (evt) => {
//     evt.preventDefault();

//     // Clear input field
//     setInput("");

//     // Redirect to dashboard after submitting the form
//     navigate("/dashboard"); // This will now redirect to the /dashboard route
//   };

//   return (
//     <div className='container'>
//       <div className='row '>
//         <div className='col-7 p-5 mt-5'>
//           <img src='media/images/signup.png' style={{ width: "95%" }} alt="Signup Illustration" />
//         </div>

//         <div className='col-5 p-5 mt-5'>
//           <h1>Signup now</h1>
//           <h6 className='text-muted mt-3 mb-3'>Or track your existing application.</h6>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               id="social"
//               label="Email/Number"
//               variant="outlined"
//               value={input}
//               onChange={handleChange}
//               required
//               fullWidth
//               margin="normal"
//             />
//             <p className='text-muted mt-3'>
//               You will receive an OTP on your number/email.
//             </p>
//             <Button variant="contained" type="submit" fullWidth>
//               Continue
//             </Button>
//           </form>

//           <br />
//           <a href="/" style={{ textDecoration: "none" }}>
//             Want to open an NRI account?
//           </a>
//         </div>
//       </div>
//       <div className='row text-muted text-center mb-5'>
//         <p>I authorize Zerodha to contact me even if my number is registered on DND. I authorize to fetch my KYC information from the C-KYC registry with my PAN.</p>
//         <p>Please visit this article to know more.</p>
//         <p className='mb-5'>
//           If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the offline forms. For help, click here.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import axios from "./axiosInstance"; // Axios instance with withCredentials: true
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Send signup request to the backend
      const response = await axios.post("https://tradexabackend.onrender.com/signup", formData,{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // ✅ Agar backend cookies ya auth tokens bhej raha hai
      });

      if (response.status === 200) {
        console.log("Signup successful, navigating to dashboard...");
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl; // Redirect to external dashboard
        } else {
          navigate("/dashboard"); // Default redirect if no URL provided
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Something went wrong.");
      } else {
        setError("Failed to connect to the server.");
      }
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          {/* Left Image Column */}
          <div className="col-lg-6 col-md-8 d-none d-md-block text-center">
            <img
              src="https://signup.zerodha.com/assets/landing-DQ76ex-B.svg"
              className="img-fluid"
              alt="Phone"
              style={{ maxWidth: "80%" }}
            />
          </div>

          {/* Signup Form Column */}
          <div className="col-lg-5 col-md-8">
            <div className="card shadow p-4">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                {/* Name input */}
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Email input */}
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Password input */}
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Remember Me */}
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label">Remember me</label>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100">
                  Sign up
                </button>

                {error && <p className="text-danger mt-3">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
