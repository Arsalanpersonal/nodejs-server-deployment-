// const express = require("express");
// const env = require("dotenv");
// const app = express();
// env.config({ path: "config.env" });
// const DB = require("../Backend/db");
// const port = process.env.PORT || 4000;


// app.get("/", (req, res) => {
//   res.send("Welcome to Foodly API");
// });
// // Import custome routers...
// const Category = require("../Backend/routes/categoryRoute");
// const Restaurant = require("../Backend/routes/restaurantRoute");
// const Food = require("../Backend/routes/foodRoute");

// // initial middlewares...
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // custome middlewares...

// app.use("/api/category", Category);
// app.use("/api/restaurant", Restaurant);
// app.use("/api/food", Food);

// // Server build...
// const startServer = async () => {
//   try {
//     const isConnected = await DB();

//     // database helth is ok continue server running...
//     if (isConnected) {
//       app.listen(port, () => {
//         console.log(`Server running on port: ${port}`);
//         console.log(`http://127.0.0.1:${port}`);
//       });
//     }
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// };

// startServer();

const express = require("express");
const env = require("dotenv");
const app = express();
env.config({ path: "config.env" });

const DB = require("./db"); // Make sure this is relative to the deployed root
const Category = require("./routes/categoryRoute");
const Restaurant = require("./routes/restaurantRoute");
const Food = require("./routes/foodRoute");

app.get("/", (req, res) => {
  res.send("Welcome to Foodly API");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/category", Category);
app.use("/api/restaurant", Restaurant);
app.use("/api/food", Food);

// Connect DB before export
DB().then(() => console.log("Database connected"));

// ❌ REMOVE app.listen
// ✅ Instead export the app
module.exports = app;

