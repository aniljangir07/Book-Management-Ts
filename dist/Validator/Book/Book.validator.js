"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthHelper_1 = require("../../Utils/AuthHelper");
const createBookValidator = (req, res, next) => {
    try {
        const bookSchema = joi_1.default.object({
            bookName: joi_1.default.string().min(5).max(50).required(),
            authorName: joi_1.default.string().min(5).max(20).required(),
            experience: joi_1.default.number().max(25).required(),
            details: joi_1.default.string().required(),
            cost: joi_1.default.number().required().greater(100),
        });
        const isValid = bookSchema.validate(req.body);
        if (isValid.error)
            return (0, AuthHelper_1.validatorErrorMessage)(isValid, res);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createBookValidator = createBookValidator;
