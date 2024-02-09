import { Router } from "express";
import {signUpController, loginController} from "../Controller/User.controller";
import {signUpValidator, loginValidator,} from "../Validator/User.validate";

const router = Router();

// <-------------------------------------------SignUp Route------------------------------------------->
router.post("/signup", signUpValidator, signUpController);

// <-------------------------------------------Login Route------------------------------------------->
router.post("/login", loginValidator, loginController);

export default router;
