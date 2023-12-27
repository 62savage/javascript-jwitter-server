import express from "express";
import "express-async-errors";
import cors from "cors";
// Debug
import morgan from "morgan";
// Security
import helmet from "helmet";
import tweetRouter from "./router/tweet.js";

const app = express();

// const corsOptions = {
//   origin: ["http://localhost:3000"],
//   optionsSuccessStatus: 200,
//   credentials: true, // Access-Control-Allow-Credentials: true
// };

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/tweets", tweetRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(8080);
