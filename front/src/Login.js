import React, { useState } from "react";
import './index.css';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    username: "",
    roll: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("student details",formData);
    
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
      alert('Form submitted successfully');
      setFormData({ username: "", roll: "", phone: "", gender: "" });
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="card_name" style={{ width: "350px", margin: "auto", padding: "20px" }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <label>Roll :</label>
        <input
          type="text"
          name="roll"
          placeholder="Enter Roll Number"
          value={formData.roll}
          onChange={handleChange}
          required
        /><br /><br />
        <label>Phone: </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <label>Gender: </label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
