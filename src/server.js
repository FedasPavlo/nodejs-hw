import express from "express";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
// Забезпечує зв'язок між різними базами
app.use(cors());
// Пакет безпеки для бекенду
app.use(helmet());
app.use(express.json());
app.use(pino());

// ROUTES

// GET /notes
app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

// GET /notes/:noteId
app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// TEST ERROR ROUTE
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ERROR middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    error: isProd ? "Server error" : err.message,
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
