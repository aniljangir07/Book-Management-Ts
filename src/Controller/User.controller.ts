import { Request, Response, NextFunction } from "express";
import { responseMessages, statusCodes } from "../constant";
import { IUserModel } from "../Models/User.model";
import { comparePassword, responseError } from "../Utils/AuthHelper";
import { signUpService, searchUserForLogin, userSearchByEmail } from "../Service/User.service";
import config from "config";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = config.get("SECRET_KEY");

// <----------------------------------------SignUp Controller--------------------------------------->
export const signUpController = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {

  try {
    const isUserAlready: boolean = await userSearchByEmail(
      req.body.email.toLowerCase()
    );

    if (isUserAlready) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: responseMessages.USER_ALREADY_PRESENT,
      });
    };

    // convert email to lower case
    req.body.email = req.body.email.toLowerCase();

    const { fullName, _id, email, role } = (await signUpService(req.body)) as IUserModel;

    return res.status(statusCodes.SUCCESS).json({
      success: true,
      message: responseMessages.USER_CREATED,
      newlyCreatedUser: { _id, fullName, role, email },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = (req: Request, res: Response, next: NextFunction) => {
  searchUserForLogin(req.body.email.toLowerCase()).then((result) => {
    comparePassword(req.body.password, result.password).then((pass) => {
      if (pass) {
        const payload = {
          email: result.email,
          role: result.role,
          _id: result._id,
        };
        const token = jwt.sign(payload, SECRET_KEY);
        res.send({
          success: true,
          auth: token,
          expiresIn: "120min",
          expiresInMS: "900000",
        });
      } else {
        responseError(responseMessages.WRONG_PASSWORD, res);
      }
    });
  })
    .catch((userError) => {
      responseError(responseMessages.NOT_FOUND, res);
    });
};