"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModel = exports.UserModel = void 0;
const User_model_1 = __importDefault(require("./User.model"));
exports.UserModel = User_model_1.default;
const Books_model_1 = __importDefault(require("./books/Books.model"));
exports.BooksModel = Books_model_1.default;
