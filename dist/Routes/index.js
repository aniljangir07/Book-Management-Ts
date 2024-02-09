"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// <-----------------------------------Import The Routes Files Present In This App-------------------------------->
const User_route_1 = __importDefault(require("./User.route"));
const Books_route_1 = __importDefault(require("./books/Books.route"));
const appRouter = (0, express_1.Router)();
appRouter.use("/v1", Books_route_1.default, User_route_1.default);
exports.default = appRouter;
