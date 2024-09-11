import express, { Request, Response } from "express";
import { validatedata } from "./middleware/validationMiddleware";
import {
  userCreationSchema,
  accountCreationSchema,
} from "./schemas/userSchemas";

const userRouter = express.Router();

import { createUser, createAccount } from "../controllers";

userRouter.post(
  "/accounts",
  validatedata(accountCreationSchema),
  createAccount
);

userRouter.post("/users", validatedata(userCreationSchema), createUser);

export default userRouter;

// async (req: Request, res: Response) => {
//     const data = req.body;
//     const { currency, amount, userId } = data;

//     const newAccount = await prisma.account.create({
//       data: { currency, amount, userId },
//     });

//     return res.json(newAccount);
//   }
