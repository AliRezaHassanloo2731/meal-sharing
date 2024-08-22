import express from "express";
import knex from "../database_client.js";

const router = express.Router();

// 1. GET /api/reviews - Returns all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("Review").select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/meals/:meal_id/reviews - Returns all reviews for a specific meal
router.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("Review").where("meal_id", meal_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/reviews - Adds a new review to the database
router.post("/", async (req, res) => {
  const newReview = req.body;
  try {
    const [id] = await knex("Review").insert(newReview);
    res.status(201).json({ id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/reviews/:id - Returns a review by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("Review").where("id", id).first();
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. PUT /api/reviews/:id - Updates the review by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReview = req.body;
  try {
    const updatedRows = await knex("Review")
      .where("id", id)
      .update(updatedReview);
    if (updatedRows) {
      res.json({ message: "Review updated", id, ...updatedReview });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. DELETE /api/reviews/:id - Deletes the review by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await knex("Review").where("id", id).del();
    if (deletedRows) {
      res.json({ message: "Review deleted" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
