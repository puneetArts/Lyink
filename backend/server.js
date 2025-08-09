require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/colleges", require("./routes/colleges"));
app.use("/api/users", require("./routes/users"));

// Seed colleges if none exist (optionally run only once)
const College = require("./models/College");
app.get("/api/seed", async (req, res) => {
  const count = await College.countDocuments();
  if (count === 0) {
    await College.insertMany([
      { name: "IIT Delhi", domain: "iitd.ac.in" },
      { name: "IIT Bombay", domain: "iitb.ac.in" },
      { name: "IIT Madras", domain: "iitm.ac.in" }
    ]);
    res.send("Seeded colleges!");
  } else res.send("Already seeded");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
