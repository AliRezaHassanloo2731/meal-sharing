import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import "./MealsListPage.css";

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
    <div>
      <h1>Available Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <Link to={`/meals/${meal.id}`}>
              {meal.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealsListPage;
