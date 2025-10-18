import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

app.use(express.static("public"));

app.get("/api/hello", async (_req, res) => {
  try {
    const r = await fetch(`${BACKEND_URL}/hello`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "Backend unreachable" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Frontend running on http://localhost:${PORT}`)
);

