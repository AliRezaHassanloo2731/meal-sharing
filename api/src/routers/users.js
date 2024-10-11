import express from "express";
import knex from "../database_client.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await knex.select("*").from("users"); // Fetch all users from 'users' table
    res.json(users); // Send users data as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new user (Insert a user)
router.post("/", async (req, res) => {
  try {
    const newUser = req.body; // Get new user data from request body
    const [id] = await knex("users").insert(newUser); // Insert new user into 'users' table
    res.status(201).json({ id, ...newUser }); // Respond with the inserted user's data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await knex("users")
      .where({ id: req.params.id }) // Fetch user where 'id' matches the parameter
      .first(); // Get the first matching result
    if (user) {
      res.json(user); // If user found, respond with user data
    } else {
      res.status(404).json({ error: "User not found" }); // User not found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT (Update) a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = req.body; // Get updated user data from request body
    const updatedRows = await knex("users")
      .where({ id: req.params.id }) // Find user by ID
      .update(updatedUser); // Update user record
    if (updatedRows) {
      res.json({
        message: "User updated",
        id: req.params.id,
        ...updatedUser,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await knex("users")
      .where({ id: req.params.id }) // Find user by ID
      .del(); // Delete the user
    if (deletedRows) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by email
router.get("/", async (req, res) => {
  try {
    const email = req.query.email; // Extract 'email' from query parameters

    // If email is provided, search for the user by email
    if (email) {
      const user = await knex("users")
        .select("id", "name", "email", "password")
        .where("email", email)
        .first(); // Get the first result matching the query

      if (user) {
        return res.json(user); // If user found, return user data
      } else {
        return res
          .status(404)
          .json({ error: "User not found" });
      }
    }

    // If no email is provided, return all users
    const users = await knex.select("*").from("users");
    res.json(users); // Return all users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
// GET /users: Fetch all users or query by email (if provided). If no email is provided, it returns all users.
// POST /users: Adds a new user to the users table.
// GET /users/:id: Fetches a user by their ID.
// PUT /users/:id: Updates an existing user by ID with the provided data.
// DELETE /users/:id: Deletes a user by their ID.
// GET /users?email=<email>: Fetches a user by email if the email is provided as a query parameter.
