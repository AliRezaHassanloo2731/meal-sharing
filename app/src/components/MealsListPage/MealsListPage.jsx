// src/components/MealsListPage/MealsListPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import Meal from "../Meal/Meal";
import "./MealsListPage.css"; // Add styles for the grid

function MealsListPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(api("/meals"));
      const mealsData = await response.json();
      setMeals(mealsData);
    }

    fetchMeals();
  }, []);

  return (
    <div className="meals-list-page">
      <h1>Available Meals</h1>
      <div className="meals-grid">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default MealsListPage;
