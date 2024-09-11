import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { email, name } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.json({
      message: "User with this email already exists",
    });
  }

  const newUser = await prisma.user.create({
    data: { email, name },
  });

  return res.json(newUser);
};

export const createAccount = async (req: Request, res: Response) => {
  const data = req.body;
  const { currency, amount, userId } = data;

  const newAccount = await prisma.account.create({
    data: { currency, amount, userId },
  });

  return res.json(newAccount);
};
