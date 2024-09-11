import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const createAccount = async (req: Request, res: Response) => {
  const data = req.body;
  const { currency, amount, userId } = data;

  const newAccount = await prisma.account.create({
    data: { currency, amount, userId },
  });

  return res.json(newAccount);
};

export const retrieveAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const account = await prisma.account.findUnique({
    where: { id: Number(id) },
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found.",
    });
  }

  return res.json(account);
};

export const listAccounts = async (req: Request, res: Response) => {
  const accountList = await prisma.account.findMany();

  return res.json(accountList);
};

export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const account = await prisma.account.findUnique({
    where: { id: Number(id) },
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
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedAccount = await prisma.account.delete({
    where: { id: Number(id) },
  });

  return res.json(deletedAccount);
};
