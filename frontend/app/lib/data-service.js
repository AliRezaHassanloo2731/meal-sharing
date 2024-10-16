import { eachDayOfInterval } from "date-fns";

import axios from "axios";

export async function getGuest(email) {
  try {
    const response = await axios.get(
      `http://localhost:3001/reservations?email=${email}`
    );
    const guest = response.data;

    if (guest) {
      return guest;
    } else {
      // No guest found
      return null;
    }
  } catch (error) {
    console.error("Error fetching guest:", error.message);
    throw new Error("Unable to fetch guest");
  }
}

export async function getBookedDatesByMealId(mealId) {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();

    const response = await axios.get(
      `http://localhost:3000/reservations?meal_id=${mealId}`
    );

    const reservations = response.data;
    console.log(reservations);

    const bookedDates = reservations
      .filter((reservation) => {
        return (
          new Date(reservation.created_date) >=
          new Date(todayISOString)
        );
      })
      .map((reservation) => {
        const bookingDate = new Date(
          reservation.created_date
        );
        return eachDayOfInterval({
          start: bookingDate,
          end: bookingDate,
        });
      })
      .flat();

    return bookedDates;
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    throw new Error(
      "Failed to fetch booked dates for the meal."
    );
  }
}

export async function getReservation(id) {
  try {
    // Perform a GET request to fetch reservation data by ID
    const response = await axios.get(
      `http://localhost:3001/reservations/${id}`
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(
      "Error fetching reservation:",
      error.message
    );
    throw new Error("Reservation could not be loaded");
  }
}

export async function getMeals(mealid) {
  try {
    const response = await fetch(
      `http://localhost:3001/meals/${mealid}`
    );

    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error(
        `Error fetching meal with id ${mealid}: ${response.statusText}`
      );
    }

    // Parse the response data to JSON
    const meal = await response.json();

    return meal;
  } catch (error) {
    console.error("Failed to fetch meal:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function createGuest(newGuest) {
  try {
    const response = await axios.post(
      "http://localhost:3001/reservations",
      newGuest
    );
    return response.data; // Return the inserted guest data
  } catch (error) {
    console.error("Error creating guest:", error.message);
    throw new Error("Guest could not be created");
  }
}

export async function deleteReservation(id) {
  try {
    const response = await axios.delete(
      `/api/reservations/${id}`
    );

    if (response.status !== 200) {
      throw new Error("Reservation could not be deleted");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//login
// app.post("/api/auth/login", (req, res) => {
//   const { email, password } = req.body;

//   // Fetch user from the database
//   const user = getUserByEmail(email);

//   if (!user || user.password !== password) {
//     return res
//       .status(401)
//       .json({ message: "Invalid credentials" });
//   }

//   // Generate a session or token
//   const token = generateToken(user);

//   res.status(200).json({ token, user });
// });

// //search;
// app.get("/api/meals", (req, res) => {
//   const { title } = req.query;

//   const meals = getMeals(); // Fetch meals from DB or API
//   const filteredMeals = title
//     ? meals.filter((meal) =>
//         meal.title
//           .toLowerCase()
//           .includes(title.toLowerCase())
//       )
//     : meals;

//   res.status(200).json(filteredMeals);
// });
// //sorting
// // GET /api/meals?sortField=price&sortOrder=asc
// app.get("/api/meals", (req, res) => {
//   const { sortField, sortOrder } = req.query;
//   let meals = getMeals(); // Fetch meals

//   // Sort meals based on field and direction
//   if (sortField) {
//     meals.sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a[sortField] > b[sortField] ? 1 : -1;
//       } else {
//         return a[sortField] < b[sortField] ? 1 : -1;
//       }
//     });
//   }

//   res.status(200).json(meals);
// });
// axios
//   .post("https://example.com/api/users", postData)
//   .then((response) => {
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
// export async function createGuest(newGuest) {
//   try {
//     const response = await axios.post(
//       "http://localhost:3001/reservations",
//       newGuest
//     );
//     return response.data; // Return the inserted guest data
//   } catch (error) {
//     console.error("Error creating guest:", error.message);
//     throw new Error("Guest could not be created");
//   }
// }
export async function AddReservation(newReservation) {
  axios
    .post("https://example.com/api/users", meal)
    .then((response) => {
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
