const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Mongoose connection set up
const dbURL = "mongodb://localhost:27017/Geek";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbURL);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//session and flash config
const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 3600,
  }),
  secret: "kio44w7ttuiq",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));
app.use(flash());

//locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("main/contact");
});

//Error's midellwares
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found 404"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "somthing went whrong" } = err;
  if (!err.message) err.message = "somthing went whrong";
  res.status(status).render("error", { err });
});

//Start server
const port = 3000;
app.listen(port, () => {
  console.log("connection opened");
});
