// server entry point for API

const express = require("express");
const cors = require("cors");
const coursesRouter = require("./routes/courses");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", coursesRouter);

app.get("/", (req, res) => {
    res.send("SDEV Course API is running.");
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});