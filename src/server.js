import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import helmet from "helmet";
import "dotenv/config";
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

await connectMongoDB();

// Middleware
// Забезпечує зв'язок між різними базами
app.use(cors());
// Пакет безпеки для бекенду
app.use(helmet());
app.use(logger);
app.use(express.json());

// ROUTES (шляхи)
app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
