import express, { Request, Response } from "express";
import { validatedata } from "./middleware/validationMiddleware";
import { userCreationSchema, userUpdateSchema } from "./schemas/userSchemas";

const userRouter = express.Router();

import {
  createUser,
  deleteUser,
  listUsers,
  retrieveUser,
  updateUser,
} from "../controllers/userControllers";

userRouter.post("/users", validatedata(userCreationSchema), createUser);
userRouter.get("/users/:id", retrieveUser);
userRouter.get("/users", listUsers);
userRouter.patch("/users/:id", validatedata(userUpdateSchema), updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;

// async (req: Request, res: Response) => {
//     const data = req.body;
//     const { currency, amount, userId } = data;

//     const newAccount = await prisma.account.create({
//       data: { currency, amount, userId },
//     });

//     return res.json(newAccount);
//   }
