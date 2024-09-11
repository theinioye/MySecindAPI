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

export const retrieveUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(user);
};

export const listUsers = async (req: Request, res: Response) => {
  const userList = await prisma.user.findMany({});

  return res.json(userList);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
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
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) },
  });

  return res.json(deletedUser);
};
