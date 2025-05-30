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
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Register</h2>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#005fa3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0077cc")}
        >
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f4f8'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '300px'
  },
  heading: {
    margin: 0,
    textAlign: 'center'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Register;