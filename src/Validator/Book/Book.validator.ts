import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validatorErrorMessage } from "../../Utils/AuthHelper";

export const createBookValidator = (req: Request,res: Response,next: NextFunction) => {
  try {
    const bookSchema = Joi.object({
      bookName: Joi.string().min(5).max(50).required(),
      authorName: Joi.string().min(5).max(20).required(),
      experience: Joi.number().max(25).required(),
      details: Joi.string().required(),
      cost: Joi.number().required().greater(100),
    });
    const isValid = bookSchema.validate(req.body);
    if (isValid.error) return validatorErrorMessage(isValid, res);
    next();
  } catch (error) {
    next(error);
  }
};
