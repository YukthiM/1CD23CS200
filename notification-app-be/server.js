import express from "express";
import cors from "cors";

import notificationRoutes from "./routes/notifications.js";
import logger from "./middleware/logger.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/evaluation-service", notificationRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});