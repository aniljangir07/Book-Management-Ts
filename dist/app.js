"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const Routes_1 = __importDefault(require("./Routes"));
const cors_1 = __importDefault(require("cors"));
const constant_1 = require("./constant");
require("./Db/Connection");
const app = (0, express_1.default)();
const PORT = config_1.default.get('PORT');
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Log the apis hits on server
app.use((req, res, next) => {
    const hitApi = `${req.method} ${req.url}`;
    console.log(hitApi, "\n|\nv\n|\nv\n|\nv");
    next();
});
// Use app routes
app.use("/api", Routes_1.default);
// This should be the last route else any after it wont work
app.use("*", (req, res) => {
    res.status(constant_1.statusCodes.NOT_FOUND).json({
        success: false,
        message: constant_1.responseMessages.ROUTE_NOT_FOUND,
    });
});
app.use((err, req, res, next) => {
    const statusCode = req.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        errorMessage: err.stack,
    });
});
// Server up on provided port number
app.listen(PORT, () => console.log(`===== Server Up On PORT ${PORT} =====`));
