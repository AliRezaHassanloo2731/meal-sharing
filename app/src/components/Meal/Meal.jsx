// src/components/Meal/Meal.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Meal.css"; // Create this file to style the card

function Meal({ meal }) {
  return (
    <div className="meal-card">
      <img
        src={meal.image || "/placeholder.png"} // Use a placeholder if no image is available
        alt={meal.title}
        className="meal-image"
      />
      <div className="meal-info">
        <h2>{meal.title}</h2>
        <p>{meal.description}</p>
        <p>Price: ${meal.price}</p>
        <p>
          Available reservations: {meal.max_reservations}
        </p>
        <Link
          to={`/meals/${meal.id}`}
          className="meal-details-link"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default Meal;
