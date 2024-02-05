import express from "express";
import {getAllUsers, updateUser} from "../controllers/userControler.js"
import { verifyToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.route('/getUsers').get(getAllUsers)
router.route('/update/:id').post(verifyToken,updateUser)

export default router
