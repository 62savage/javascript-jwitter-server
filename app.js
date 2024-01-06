import express from "express";
import "express-async-errors";
import cors from "cors";
// Debug
import morgan from "morgan";
// Security
import helmet from "helmet";
import dotenv from "dotenv";
import tweetRouter from "./router/tweet.js";
import authRouter from "./router/auth.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [process.env.BASE_URL],
  optionsSuccessStatus: 200,
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(helmet());

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8080);
