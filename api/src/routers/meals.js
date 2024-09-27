import express from "express";
import knex from "../database_client.js";

const router = express.Router();

// Refactored GET /api/meals to handle all query parameters
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

    // Filter meals by date
    if (req.query.dateAfter) {
      query = query
        .where("when", ">=", req.query.dateAfter)
        .orWhereRaw("DATE(when) = DATE(?)", [
          req.query.dateAfter,
        ]);
    }

    // Limit the number of results
    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    // Sort the meals by a field (default: 'when') and direction (default: 'asc')
    if (req.query.sortKey || req.query.sortOrder) {
      const sortKey = req.query.sortKey || "when";
      const sortOrder = req.query.sortOrder || "asc";
      query = query.orderBy(sortKey, sortOrder);
    }

    // Sort meals by price
    if (req.query.sortDir) {
      query = query.orderBy(
        "price",
        req.query.sortDir || "asc"
      );
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
