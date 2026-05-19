import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport/index.js"; //this executes the strategy configuration
import authRouter from "./routes/auth.routes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js'

const app = express();

//basic configuration
app.use(express.json({ limit: "16kb" })); //used to get the json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //used to get the data from the url likes forms
app.use(express.static("public")); //making the public folder static that anyone can use the folder and files of it.
app.use(cookieParser()); //to parse the cookies from the  request

//cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(passport.initialize());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/bookings", bookingRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the base campy");
});

export default app;
