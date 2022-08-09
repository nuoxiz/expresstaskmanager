const path = require("path");
const express = require("express");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorHandler");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

// Connect to database
connectDB();
// app.use(errorHandler);
const port = process.env.PORT || 5000;
// Add middleware so that we can send json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the userRoutes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production.");
  });
}

//Use custom-made error handler to override the default handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started in port: ${port}`));
