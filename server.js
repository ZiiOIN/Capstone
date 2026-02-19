const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const medicinesRoutes = require("./routes/medicines");
app.use("/api/medicines", medicinesRoutes);

const patientRoutes = require("./routes/patients");
app.use("/api/patients", patientRoutes);

const prescriptionsRouter = require("./routes/prescriptions");
app.use("/api/prescriptions", prescriptionsRouter);

const checkoutRouter = require("./routes/checkout");
app.use("/api/checkout", checkoutRouter);


// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
