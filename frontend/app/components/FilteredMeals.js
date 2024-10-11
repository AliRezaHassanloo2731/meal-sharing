"use client";

import { useState, useEffect } from "react";
import MealList from "./mealList";
import Search from "./Search";
import Filter from "./Filter";

export default function FilteredMeals({
  mealsData,
  filter,
}) {
  const [filteredMeals, setFilteredMeals] =
    useState(mealsData);
  const [activeFilter, setActiveFilter] = useState(filter);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let meals = mealsData;

    if (activeFilter === "small") {
      meals = meals.filter(
        (meal) => parseFloat(meal.price) <= 20
      );
    } else if (activeFilter === "medium") {
      meals = meals.filter(
        (meal) =>
          parseFloat(meal.price) <= 45 &&
          parseFloat(meal.price) > 20
      );
    } else if (activeFilter === "large") {
      meals = meals.filter(
        (meal) => parseFloat(meal.price) > 45
      );
    }

    if (searchQuery) {
      meals = meals.filter((meal) =>
        meal.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMeals(meals);
  }, [activeFilter, searchQuery, mealsData]);

  return (
    <>
      <div className="flex justify-between mb-8">
        <Search onSearch={setSearchQuery} />
        <Filter setActiveFilter={setActiveFilter} />
      </div>
      <div>
        <MealList meals={filteredMeals} />
      </div>
    </>
  );
}
