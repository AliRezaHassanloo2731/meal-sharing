import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reservations = await knex
      .select("*")
      .from("Reservation");
    // res.json(reservations);
    res.send(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newReservation = req.body;
    const [id] =
      await knex("Reservation").insert(newReservation);
    res.status(201).json({ id, ...newReservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex("Reservation")
      .where({ id: req.params.id })
      .first();
    if (reservation) {
      res.json(reservation);
    } else {
      res
        .status(404)
        .json({ error: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedReservation = req.body;
    const updatedRows = await knex("Reservation")
      .where({ id: req.params.id })
      .update(updatedReservation);
    if (updatedRows) {
      res.json({
        message: "Reservation updated",
        id: req.params.id,
        ...updatedReservation,
      });
    } else {
      res
        .status(404)
        .json({ error: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await knex("Reservation")
      .where({ id: req.params.id })
      .del();
    if (deletedRows) {
      res.json({ message: "Reservation deleted" });
    } else {
      res
        .status(404)
        .json({ error: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
