const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
