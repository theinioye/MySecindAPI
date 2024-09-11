import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "../prisma";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/", userRouter);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(" Express + Typescript Server");
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: { userAccounts: true },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(user);
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const { accountId } = req.params;

  const account = await prisma.account.findUnique({
    where: { id: Number(accountId) },
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found.",
    });
  }

  return res.json(account);
});

app.get("/users", async (req: Request, res: Response) => {
  const userList = await prisma.user.findMany({
    select: { userAccounts: true },
  });

  return res.json(userList);
});

app.get("/accounts", async (req: Request, res: Response) => {
  const accountList = await prisma.account.findMany();

  return res.json(accountList);
});

app.patch("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = req.body;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data,
  });

  return res.json(updatedUser);
});

app.patch("/accounts/:accountId", async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const data = req.body;

  const account = await prisma.account.findUnique({
    where: { id: Number(accountId) },
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found.",
    });
  }

  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data,
  });
  return res.json(updatedAccount);
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const deletedUser = await prisma.user.delete({
    where: { id: Number(userId) },
  });

  return res.json(deletedUser);
});

app.delete("/accounts/:accountId", async (req: Request, res: Response) => {
  const { accountId } = req.params;

  const deletedAccount = await prisma.account.delete({
    where: { id: Number(accountId) },
  });

  return res.json(deletedAccount);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
