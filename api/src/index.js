import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouter);

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

apiRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    res.json(meals[0]); // Meals are in the first element of the array
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
apiRouter.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal WHERE `when` < NOW()");
    res.json(meals[0]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

apiRouter.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meal[0].length > 0) {
      res.json(meal[0][0]);
    } else {
      res.status(404).json({ error: "No meals found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meal[0].length > 0) {
      res.json(meal[0][0]);
    } else {
      res.status(404).json({ error: "No meals found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
