import { Router } from "express";
import { getUserFromToken, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/login", login).get("/auth/me", getUserFromToken);

export { router as AuthRouter };
