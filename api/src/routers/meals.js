import express from "express";
import knex from "../database_client.js";

const router = express.Router();

//api/meals?maxPrice=90

router.get("/", async (req, res) => {
  try {
    let query = knex.select("*").from("Meal");

    if (req.query.maxPrice) {
      query = query.where("price", "<=", req.query.maxPrice);
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { availableReservations } = req.query;

    let query = knex("Meal")
      .select("Meal.*")
      .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
      .groupBy("Meal.id")
      .count("Reservation.id as reservation_count")
      .select(
        knex.raw(
          "Meal.max_reservations - COUNT(Reservation.id) as available_spots"
        )
      );

    if (availableReservations === "true") {
      query = query.having(knex.raw("available_spots"), ">", 0);
    } else if (availableReservations === "false") {
      query = query.having(knex.raw("available_spots"), "<=", 0);
    }

    const meals = await query;

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { title } = req.query;
    const meals = await knex("Meal")
      .where("title", "LIKE", `%${title}%`)
      .orWhere("description", "LIKE", `%${title}%`);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { dateAfter } = req.query;
    const meals = await knex("Meal")
      .where("when", ">=", dateAfter)
      .orWhereRaw("DATE(when) = DATE(?)", [dateAfter]);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const meals = await knex("Meal").limit(limit);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const sortKey = req.query.sortKey || "when";
  const sortOrder = req.query.sortOrder || "asc";
  try {
    const meals = await knex("Meal").orderBy(sortKey, sortOrder);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Parameter:sortDir
Data type:String,
Description:Returns all meals sorted in the given direction. Only works combined with the sortKey and allows asc or desc.
Example:api/meals?sortKey=price&sortDir=desc */
router.get("/", async (req, res) => {
  try {
    const sortDir = req.query.sortDir || "asc";
    const meals = await knex("Meal").orderBy("price", sortDir);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const [allMeals] = await knex.raw("SELECT * FROM Meal");
//     res.json(allMeals);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/api/search", async (req, res) => {
//   if (!req.body.title || req.description.length < 3) {
//     return res
//       .status(400)
//       .send("Missing required fields: name, price, description");
//   }
//   try {
//     const newMeal = req.body;
//     const [id] = await knex("Meal").insert(newMeal);
//     res.status(201).json({ id, ...newMeal });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
//   const newMeal = {
//     title: "Chelo Kebab",
//     description: "Saffron-infused rice served with grilled meat skewers",
//     location: "Ardabil",
//     when: "2024-09-01 18:30:00",
//     max_reservations: 10,
//     price: "120.00",
//     create_date: "2024-08-15 10:30:00",
//   };
//   res.status(200).send(newMeal);
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const meal = await knex("Meal").where({ id: req.params.id }).first();
//     if (meal) {
//       res.json(meal);
//     } else {
//       res.status(404).json({ error: "Meal not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedMeal = req.body;
//     const updatedRows = await knex("Meal")
//       .where({ id: req.params.id })
//       .update(updatedMeal);
//     if (updatedRows) {
//       res.json({ message: "Meal updated", id: req.params.id, ...updatedMeal });
//     } else {
//       res.status(404).json({ error: "Meal not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedRows = await knex("Meal").where({ id: req.params.id }).del();
//     if (deletedRows) {
//       res.json({ message: "Meal deleted" });
//     } else {
//       res.status(404).json({ error: "Meal not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;
