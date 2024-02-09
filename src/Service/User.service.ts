import UserModel, { IUser, IUserModel } from "../Models/User.model";
import { hashedPassword } from "../Utils/AuthHelper";

// <---------------------------------------------User Search By Email ------------------------------------->
export const userSearchByEmail = async (email: string): Promise<boolean> => {
  try {
    return (await UserModel.findOne({ email })) ? true : false;
  } catch (error: any) {
    throw new Error(error);
  }
};

// <--------------------------------------------SignUp Service------------------------------------------->
export const signUpService = async (
  userInfo: IUser
): Promise<IUserModel | undefined | any> => {
  try {
    userInfo.password = await hashedPassword(userInfo.password);
    const newlyCreatedUser = await UserModel.create(userInfo);
    return newlyCreatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

// <**********************************User Search By Email Service for Login ***********************************>
export const searchUserForLogin = (email: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

