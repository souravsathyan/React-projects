import express from "express";
import { userLogin, userSignup, googleAuth } from "../controllers/authController.js";

const router = express.Router();

router.route('/login').post(userLogin);
router.route('/signup').post(userSignup)
router.route('/google').post(googleAuth)

export default router