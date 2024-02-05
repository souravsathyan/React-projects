import express from "express";
import {getAllUsers, updateUser, deleteUser, logout} from "../controllers/userControler.js"
import { verifyToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.route('/getUsers').get(getAllUsers)
router.route('/update/:id').post(verifyToken,updateUser)
router.route('/delete/:id').delete(verifyToken,deleteUser)
router.route('/logout').get(logout)

export default router
