const router = require("express").Router();
const db = require("../db");

// Get all prescriptions
router.get("/", async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.id, p.patient_id, p.quantity, p.date_prescribed, 
           pa.first_name, pa.last_name, 
           m.name AS medicine_name
    FROM prescriptions p
    JOIN patients pa ON p.patient_id = pa.id
    JOIN medicines m ON p.medicine_id = m.id
  `);
  res.json(rows);
});

// Add a prescription
router.post("/", async (req, res) => {
  const { patient_id, medicine_id, quantity } = req.body;
  try {
    // Check if enough medicine in stock
    const [med] = await db.query("SELECT amount FROM medicines WHERE id = ?", [medicine_id]);
    if (med[0].amount < quantity) {
      return res.status(400).json({ error: "Not enough medicine in stock" });
    }

    // Subtract from inventory
    await db.query("UPDATE medicines SET amount = amount - ? WHERE id = ?", [quantity, medicine_id]);

    // Add prescription
    await db.query("INSERT INTO prescriptions (patient_id, medicine_id, quantity) VALUES (?, ?, ?)",
      [patient_id, medicine_id, quantity]
    );

    res.json({ message: "Prescription created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a prescription by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete prescription ID:", id);
  const [result] = await db.query("DELETE FROM prescriptions WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    console.log("Prescription not found:", id);
    return res.status(404).json({ message: "Prescription not found" });
  }
  console.log("Deleted prescription ID:", id);
  res.json({ message: "Prescription deleted" });
});


module.exports = router;