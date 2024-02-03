import express from "express";
import {getAllUsers} from "../controllers/userControler.js"

const router = express.Router();

router.route('/getUsers').get(getAllUsers)

export default router
