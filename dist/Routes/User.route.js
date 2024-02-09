"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../Controller/User.controller");
const User_validate_1 = require("../Validator/User.validate");
const router = (0, express_1.Router)();
// <-------------------------------------------SignUp Route------------------------------------------->
router.post("/signup", User_validate_1.signUpValidator, User_controller_1.signUpController);
// <-------------------------------------------Login Route------------------------------------------->
router.post("/login", User_validate_1.loginValidator, User_controller_1.loginController);
exports.default = router;
