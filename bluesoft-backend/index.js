const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/clients", clientRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
