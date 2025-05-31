import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: uuidv4(),
      ...formData,
    };

    console.log("New user:", newUser); // ✅ Confirm ID and data
  

    alert("Account created successfully! ✅");

    // ✅ Clear input fields
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2 className="registration-heading">Create Account</h2>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="registration-input"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="registration-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="registration-input"
            required
            minLength="6"
          />
          <button type="submit" className="registration-button">
            Register
          </button>
        </form>
      </div>
      <div className="registration-image">
        <div className="image-content">
          <h1>Know the World</h1>
          <p>
            Join our community of travelers and discover amazing facts about every country. 
            Save your favorite destinations and plan your next adventure with us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;