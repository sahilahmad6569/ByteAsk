const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./db");
require("./routes/auth"); // Ensure Passport strategy is loaded

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",  // Development (Localhost)
  "https://your-netlify-app.netlify.app", // Production (Netlify frontend)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Configure Sessions for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/questions", require("./routes/question"));
app.use("/api/answers", require("./routes/answer"));

app.get("/", (req, res) => {
  res.send("ByteAsk Backend is running");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});