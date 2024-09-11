import express, { Request, Response } from "express";
import { validatedata } from "./middleware/validationMiddleware";
import {
  accountCreationSchema,
  updateAccountSchema,
} from "./schemas/accountSchemas";

const accountRouter = express.Router();

import {
  createAccount,
  deleteAccount,
  listAccounts,
  retrieveAccount,
  updateAccount,
} from "../controllers/accountControllers";

accountRouter.post(
  "/accounts",
  validatedata(accountCreationSchema),
  createAccount
);
accountRouter.get("/accounts/:id", retrieveAccount);
accountRouter.get("/accounts", listAccounts);
accountRouter.patch(
  "/accounts/:id",
  validatedata(updateAccountSchema),
  updateAccount
);
accountRouter.delete("/accounts/:id", deleteAccount);

export default accountRouter;
