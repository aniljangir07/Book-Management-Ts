"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signUpValidator = void 0;
// <---------------------------------------User SignUp Validation Model------------------------------------------->
const signUpValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ status: "failed", message: 'All fields (fullName, email, password) are required' });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.signUpValidator = signUpValidator;
const loginValidator = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ status: "failed", message: 'All fields (email, password) are required' });
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.loginValidator = loginValidator;
