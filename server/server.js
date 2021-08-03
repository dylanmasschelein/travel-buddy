const express = require("express");
const app = express();
const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");
const adventureRoutes = require("./routes/adventures.js");
const locationRoutes = require("./routes/locations.js");

require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/locations", locationRoutes);
app.use("/adventures", adventureRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
