// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import MealsListPage from "./components/MealsListPage/MealsListPage.jsx";
import MealDetailsPage from "./components/MealDetailsPage/MealDetailsPage.jsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/meals",
    element: <MealsListPage />,
  },
  {
    path: "/meals/:id",
    element: <MealDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
