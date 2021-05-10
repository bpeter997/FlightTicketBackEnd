const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const airportRouter = require("./routes/airportRoutes");
const airlineRouter = require("./routes/airlineRoutes");
const airplaneRouter = require("./routes/airplaneRoutes");
const flightRouter = require("./routes/flightRoutes");
const ticketRouter = require("./routes/ticketRoutes");

const authController = require("./controllers/authController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

const whiteList = ["http://localhost:4200", "https://flight-ticket-frontend.herokuapp.com:4200" ,undefined];

//app.use(authController.handleCors);
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) >= 0) {
        callback(null, true);
      } else {
        callback(new Error("Cors Error"));
      }
    },
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    authController.handleLocalStrategy
  )
);

passport.serializeUser(function (user, done) {
  if (!user) return done("no user found", null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("no user logged in", null);
  return done(null, user);
});

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/airports", airportRouter);
app.use("/api/v1/airlines", airlineRouter);
app.use("/api/v1/airplanes", airplaneRouter);
app.use("/api/v1/flights", flightRouter);
app.use("/api/v1/tickets", ticketRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
