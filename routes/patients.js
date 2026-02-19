const router = require("express").Router();
const db = require("../db");

// Get all patients
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM patients");
  res.json(rows);
});

// Add a new patient
router.post("/", async (req, res) => {
  const { first_name, last_name, date_of_birth, phone, email } = req.body;
  await db.query(
    "INSERT INTO patients (first_name, last_name, date_of_birth, phone, email) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, date_of_birth, phone, email]
  );
  res.json({ message: "Patient created" });
});

// Update patient
router.put("/:id", async (req, res) => {
  await db.query("UPDATE patients SET ? WHERE id = ?", [req.body, req.params.id]);
  res.json({ message: "Patient updated" });
});

// Delete patient
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM patients WHERE id = ?", [req.params.id]);
  res.json({ message: "Patient deleted" });
});

// Get prescriptions for a specific patient
router.get("/patient/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.patient_id, p.medicine_id, p.quantity, p.date_prescribed,
             m.name AS medicine_name
      FROM prescriptions p
      JOIN medicines m ON p.medicine_id = m.id
      WHERE p.patient_id = ?
    `, [patientId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
