const router = require("express").Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { patient_id } = req.body;

  try {
    // Get all unfulfilled prescriptions for this patient
    const [prescriptions] = await db.query(
      `SELECT p.id AS prescription_id, p.medicine_id, p.quantity, 
              m.name AS medicine_name, m.amount AS stock
       FROM prescriptions p
       JOIN medicines m ON p.medicine_id = m.id
       WHERE p.patient_id = ? AND p.fulfilled = 0`,
      [patient_id]
    );

    if (prescriptions.length === 0) {
      return res.status(400).json({ error: "No unfulfilled prescriptions for this patient" });
    }

    // Check stock for each prescription
    for (const pres of prescriptions) {
      if (pres.stock < pres.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${pres.medicine_name}` });
      }
    }

    // Deduct stock and mark prescriptions as fulfilled
    for (const pres of prescriptions) {
      await db.query("UPDATE medicines SET amount = amount - ? WHERE id = ?", [pres.quantity, pres.medicine_id]);
      await db.query("UPDATE prescriptions SET fulfilled = 1 WHERE id = ?", [pres.prescription_id]);
    }

    res.json({ message: "Checkout successful, inventory updated, prescriptions fulfilled." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


