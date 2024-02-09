import { NextFunction, Request, Response } from "express";

// <---------------------------------------User SignUp Validation Model------------------------------------------->
export const signUpValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({status : "failed", message : 'All fields (fullName, email, password) are required'});
    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({status : "failed", message : 'All fields (email, password) are required'});
    next();
  } catch (err) {
    next(err);
  }
};
