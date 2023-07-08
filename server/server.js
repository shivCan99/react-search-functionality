const express = require("express");
const dbConnect = require("./db");
const movieRoutes = require("./routes/movies");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", movieRoutes);

const port = 3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));