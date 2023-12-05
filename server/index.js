const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const authRoute = require("./routes/auth.js");

const connectDB = require("./config/db");
// // connect database
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Server is running");
})


app.listen(5000, () => {
    console.log("Connected to backend.")
})