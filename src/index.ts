import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "../prisma";
import userRouter from "./routes/userRoutes";
import accountRouter from "./routes/accountRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/", userRouter);
app.use("/api/", accountRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
