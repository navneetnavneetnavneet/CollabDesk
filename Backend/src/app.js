const config = require("./config/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorHandler = require("./utils/ErrorHandler");

//  Routes
const authRoutes = require("./routes/auth.routes");
const teamRoutes = require("./routes/team.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

app.use(cors({ origin: config.REACT_BASE_URL, credentials: true }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// error handling
app.all("*name", (req, res, next) => {
  return next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    // stack: err.stack,
  });
});

module.exports = app;
