import BooksModel from "../Models/books/Books.model";


// <-----------------------------------------Get All Books---------------------------------->
export const getAllBooks = async (filter: any) => {
      try {
            return await BooksModel.find(filter);
      } catch (error: any) {
            throw new Error(error);
      }
};