import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/notifications.json");

const notifications = JSON.parse(fs.readFileSync(dataPath, "utf8"));

router.get("/notifications", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const type = req.query.notification_type;

  let result = [...notifications];

  if (type) {
    result = result.filter(
      (n) => n.notification_type === type
    );
  }

  const priority = {
    PLACEMENT: 3,
    RESULT: 2,
    EVENT: 1,
  };

  result.sort((a, b) => {
    if (
      priority[a.notification_type] !==
      priority[b.notification_type]
    ) {
      return (
        priority[b.notification_type] -
        priority[a.notification_type]
      );
    }

    return (
      new Date(b.created_at) -
      new Date(a.created_at)
    );
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    total: result.length,
    page,
    limit,
    notifications: result.slice(start, end),
  });
});

export default router;