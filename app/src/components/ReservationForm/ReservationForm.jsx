// src/components/ReservationForm/ReservationForm.jsx
import React, { useState } from "react";
import api from "../../api";

function ReservationForm({ mealId, maxReservations }) {
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phonenumber,
          name,
          email,
          meal_id: mealId,
        }),
      });

      if (response.ok) {
        alert("Reservation made successfully!");
      } else {
        alert("Error making reservation!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>
      <div>
        <label>Phone number</label>
        <input
          type="tel"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book Seat</button>
    </form>
  );
}

export default ReservationForm;
