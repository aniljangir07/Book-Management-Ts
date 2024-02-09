import { Request, Response, NextFunction } from "express";
import { responseMessages, statusCodes } from "../../constant";
import BooksModel, { IBookModel, IBook } from "../../Models/books/Books.model";
import { getAllBooks } from "../../Service/books.service";
import constants  from "../../constant/UniqueId" 

export const createBookController = (req: Request, res: Response, next: NextFunction) => {

      BooksModel.create(req.body).then((providerResponse) => {
            res.status(statusCodes.SUCCESS).json({
                  success: true,
                  message: responseMessages.BOOK_ADDED,
                  newlyServiceData: providerResponse,
            });
      })
            .catch((err) => {
                  res.status(statusCodes.BAD_REQUEST).json({
                        success: false,
                        message: responseMessages.BOOK_NOT_ADDED,
                  });
            });
};

export const getAllBooksController = async (req: Request, res: Response, next: NextFunction) => {
      const { ROLES } = constants;
      const filter:any  = {};
      if(req.user.role == ROLES.CONSUMER) filter['status'] = true;
      try {
            const booksList: IBookModel[] = await getAllBooks(filter);
            res.status(200).json({ booksList });
      } catch (error) {
            next(error);
      };
};

export const changeBookStatusController = async (req: Request, res: Response, next: NextFunction) => {

      if (!req.params.status) return res.send({ Success: false, message: "Invalid Input!" });
      let statusToUpdate = req.params.status.toLowerCase();
      let bookId = req.params.bookId;

      BooksModel.findByIdAndUpdate(bookId, { $set: { status: statusToUpdate } }, { new: true, upsert: true })
            .then(updatedBook => {
                  if (updatedBook) {
                        res.status(statusCodes.SUCCESS).json({
                              success: true,
                              message: responseMessages.BOOK_STATUS_UPDATED,
                              updatedBook: updatedBook
                        });
                  } else {
                        res.status(statusCodes.NOT_FOUND).json({
                              success: false,
                              message: responseMessages.BOOK_NOT_FOUND
                        });
                  }
            })
            .catch(error => {
                  console.error('Error updating book status:', error);
                  res.status(statusCodes.NOT_FOUND).json({
                        success: false,
                        message: responseMessages.INTERNAL_SERVER_ERROR
                  });
            });

};

export const deleteBookController = async (req: Request, res: Response, next: NextFunction) => {
      const bookId = req.params.bookId;

      BooksModel.findByIdAndDelete(bookId).then(deletedBook => {
            if (deletedBook) {
                  res.status(statusCodes.SUCCESS).json({
                        success: true,
                        message: responseMessages.BOOK_DELETED,
                        deletedBook: deletedBook
                  });
            } else {
                  res.status(statusCodes.NOT_FOUND).json({
                        success: false,
                        message: responseMessages.BOOK_NOT_FOUND
                  });
            };
      })
      .catch(error => {
            console.error('Error deleting book:', error);
            res.status(statusCodes.NOT_FOUND).json({
                  success: false,
                  message: responseMessages.INTERNAL_SERVER_ERROR
            });
      });
};

export const viewBookController = async (req: Request, res: Response, next: NextFunction) => {
      const bookId = req.params.bookId;

      BooksModel.findById(bookId).then(book => {
            if (book) {
                  res.status(statusCodes.SUCCESS).json({
                        success: true,
                        message: responseMessages.BOOK_FOUND,
                        book: book
                  });
            } else {
                  res.status(statusCodes.NOT_FOUND).json({
                        success: false,
                        message: responseMessages.BOOK_NOT_FOUND
                  });
            }
      })
      .catch(error => {
            console.error('Error finding book:', error);
            res.status(statusCodes.NOT_FOUND).json({
                  success: false,
                  message: responseMessages.INTERNAL_SERVER_ERROR
            });
      });
};


