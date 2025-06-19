import express from "express";
import UserController from "../Controllers/Users.js";
import Auth from "../Common/Auth.js";

const router = express.Router();

router.get("/login", UserController.Login);
router.post("/createuser", Auth.validate, Auth.verifyRole(["Admin"]), UserController.createUser);

export default router;

