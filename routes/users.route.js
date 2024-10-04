import { Router } from "express";

import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from "../controllers/users.controller.js";
import { createUserValidation } from "../middlewares/users/createUserValidation.js";
import { updateUserValidation } from "../middlewares/users/updateUserValidation.js";
import { paginate } from "../middlewares/paginate.js";

const router = Router();

router
  .post("/", createUserValidation, create)
  .get("/", paginate, findAll)
  .get("/:id", findOne)
  .patch("/:id", updateUserValidation, update)
  .delete("/:id", remove);

export { router as userRouter };
