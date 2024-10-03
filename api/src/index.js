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
const apiRouter = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);

// Add your routes here

app.use("/meals", mealsRouter);
app.use("/reservations", reservationsRouter);
app.use("/reviews", reviewsRouter);

app.get("/test-connection", async (req, res) => {
  try {
    const result = await knex.raw("SELECT 1+1 AS result");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
  const result = await knex.raw(
    "Select * from meal where meal_when > Now()"
  );
  const data = result[0];
  if (data.length === 0) {
    res.json({});
  } else {
    res.json({ data });
  }
});

apiRouter.get("/past-meals", async (req, res) => {
  const result = await knex.raw(
    "Select * from meal where meal_when < Now()"
  );
  const data = result[0];
  if (data.length === 0) {
    res.json({});
  } else {
    res.json({ data });
  }
});

apiRouter.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM meal ORDER BY id"
    );
    const data = meals[0];
    res.json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const result = await knex.raw(
      "SELECT * FROM meal ORDER BY id ASC LIMIT 1"
    );
    const data = result[0];
    if (data.length > 0) {
      res.json(data[0][0]);
    } else {
      res.status(404).json({ error: "No meals found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex.raw(
      "SELECT * FROM Meal ORDER BY id DESC LIMIT 1"
    );
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
