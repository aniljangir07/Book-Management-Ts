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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserForLogin = exports.signUpService = exports.userSearchByEmail = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const AuthHelper_1 = require("../Utils/AuthHelper");
// <---------------------------------------------User Search By Email ------------------------------------->
const userSearchByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield User_model_1.default.findOne({ email })) ? true : false;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.userSearchByEmail = userSearchByEmail;
// <--------------------------------------------SignUp Service------------------------------------------->
const signUpService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userInfo.password = yield (0, AuthHelper_1.hashedPassword)(userInfo.password);
        const newlyCreatedUser = yield User_model_1.default.create(userInfo);
        return newlyCreatedUser;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signUpService = signUpService;
// <**********************************User Search By Email Service for Login ***********************************>
const searchUserForLogin = (email) => {
    try {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOne({ email })
                .then((user) => {
                resolve(user);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.searchUserForLogin = searchUserForLogin;
