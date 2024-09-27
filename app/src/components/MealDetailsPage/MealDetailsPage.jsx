// src/components/MealDetailsPage/MealDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReviewForm from "../ReviewForm/ReviewForm";

function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(api(`/meals/${id}`));
      const mealData = await response.json();
      setMeal(mealData);
    }

    fetchMeal();
  }, [id]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>Price: {meal.price}</p>

      <ReservationForm
        mealId={id}
        maxReservations={meal.max_reservations}
      />
      <ReviewForm mealId={id} />
    </div>
  );
}

export default MealDetailsPage;
