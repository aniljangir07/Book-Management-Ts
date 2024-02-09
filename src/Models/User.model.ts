import { model, Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  role: number;
  password: string;
  isProfileCompleted: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    fullName: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      trim: true 
    },
    role: {
      type: Number,
      default: 3,
      // 1 indicates admin, 2 for sub-admin, 3 for consumer
      enum: [1, 2, 3],
      required: true, 
    },
    password: { 
      type: String, 
      required: true, 
      trim: true 
    },
    isProfileCompleted: { 
      type: Boolean, 
      default: false 
    },
    resetPasswordToken: {
      type: String,
      required: false,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<IUserModel>("User", UserSchema);
