import express from "express";
import { userLogin } from "../controllers/authController.js";

export const router = express.Router();

router.route('/login').post(userLogin);
