const router = require("express").Router();
const db = require("../db");

// Get all medicines
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM medicines");
  res.json(rows);
});

// Add a new medicine
router.post("/", async (req, res) => {
  const { name, category, manufacturer, amount } = req.body;
  await db.query(
    "INSERT INTO medicines (name, category, manufacturer, amount) VALUES (?, ?, ?, ?)",
    [name, category, manufacturer, amount]
  );
  res.json({ message: "created" });
});

// Update a medicine
router.put("/:id", async (req, res) => {
  const { name, category, manufacturer, amount } = req.body;
  await db.query(
    "UPDATE medicines SET name = ?, category = ?, manufacturer = ?, amount = ? WHERE id = ?",
    [name, category, manufacturer, amount, req.params.id]
  );
  res.json({ message: "updated" });
});

// Delete a medicine
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM medicines WHERE id = ?", [req.params.id]);
  res.json({ message: "deleted" });
});

module.exports = router;

