import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = knex("Meal");

    // Filtering by maxPrice
    if (req.query.maxPrice) {
      query = query.where(
        "price",
        "<=",
        req.query.maxPrice
      );
    }

    // Filtering by available reservations
    if (req.query.availableReservations) {
      query = query
        .leftJoin(
          "Reservation",
          "Meal.id",
          "Reservation.meal_id"
        )
        .groupBy("Meal.id")
        .select("Meal.*")
        .count("Reservation.id as reservation_count")
        .select(
          knex.raw(
            "Meal.max_reservations - COUNT(Reservation.id) as available_spots"
          )
        );

      if (req.query.availableReservations === "true") {
        query = query.having(
          knex.raw("available_spots"),
          ">",
          0
        );
      } else if (
        req.query.availableReservations === "false"
      ) {
        query = query.having(
          knex.raw("available_spots"),
          "<=",
          0
        );
      }
    }

    // Search meals by title or description
    if (req.query.title) {
      query = query
        .where("title", "LIKE", `%${req.query.title}%`)
        .orWhere(
          "description",
          "LIKE",
          `%${req.query.title}%`
        );
    }

    // Filter by date (after and before)
    if (req.query.dateAfter) {
      query = query.where(
        "when",
        ">=",
        req.query.dateAfter
      );
    }
    if (req.query.dateBefore) {
      query = query.where(
        "when",
        "<=",
        req.query.dateBefore
      );
    }

    // Limit the number of results
    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    // Sort by key and direction
    if (req.query.sortKey && req.query.sortDir) {
      query = query.orderBy(
        req.query.sortKey,
        req.query.sortDir
      );
    } else if (req.query.sortKey) {
      query = query.orderBy(req.query.sortKey, "asc");
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await knex("Meal")
      .where({ id: req.params.id })
      .first();
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
