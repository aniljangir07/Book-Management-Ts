import { model, Schema, Document } from "mongoose";

export interface IBook {
      bookName: string;
      authorName: string;
      experience: number;
      details: string;
      cost: number;
};

export interface IBookModel extends IBook, Document { }

const BookSchema: Schema = new Schema(
      {
            bookName: {
                  type: String,
                  unique: true,
                  required: true
            },
            status: {
                  type: Boolean,
                  default: true
            },
            authorName: {
                  type: String,
                  required: true,
            },
            experience: {
                  type: Number,
                  required: true,
            },
            details: {
                  type: String,
                  required: true,
            },
            cost: {
                  type: Number,
                  default: false
            }
      },
      { versionKey: false, timestamps: true }
);

export default model<IBookModel>("Books", BookSchema);
