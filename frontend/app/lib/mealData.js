// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// export async function mealsListPage() {
//   const res = await fetch("http://localhost:3001/meals");
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`);
//   }
//   const mealsData = await res.json();

// const [meals, setMeals] = useState([]);
// useEffect(() => {
//   async function fetchMeals() {
//     const response = await fetch(
//       "http://localhost:3001/meals"
//     );
//     const mealsData = await response.json();
//     console.log(mealsData);
//     setMeals(mealsData);
//   }
//   fetchMeals();
// }, []);
// return <div className="meals-list-page"></div>;
// }
