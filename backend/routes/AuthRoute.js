import express from "express";
import { Login, Logout, Me } from "../controllers/Auth";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.patch("/logout", Logout);

export default router;
