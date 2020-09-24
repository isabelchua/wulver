const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to Wulver!" }));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
