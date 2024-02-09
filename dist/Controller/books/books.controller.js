"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewBookController = exports.deleteBookController = exports.changeBookStatusController = exports.getAllBooksController = exports.createBookController = void 0;
const constant_1 = require("../../constant");
const Books_model_1 = __importDefault(require("../../Models/books/Books.model"));
const books_service_1 = require("../../Service/books.service");
const UniqueId_1 = __importDefault(require("../../constant/UniqueId"));
const createBookController = (req, res, next) => {
    Books_model_1.default.create(req.body).then((providerResponse) => {
        res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            message: constant_1.responseMessages.BOOK_ADDED,
            newlyServiceData: providerResponse,
        });
    })
        .catch((err) => {
        res.status(constant_1.statusCodes.BAD_REQUEST).json({
            success: false,
            message: constant_1.responseMessages.BOOK_NOT_ADDED,
        });
    });
};
exports.createBookController = createBookController;
const getAllBooksController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ROLES } = UniqueId_1.default;
    const filter = {};
    if (req.user.role == ROLES.CONSUMER)
        filter['status'] = true;
    try {
        const booksList = yield (0, books_service_1.getAllBooks)(filter);
        res.status(200).json({ booksList });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.getAllBooksController = getAllBooksController;
const changeBookStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.status)
        return res.send({ Success: false, message: "Invalid Input!" });
    let statusToUpdate = req.params.status.toLowerCase();
    let bookId = req.params.bookId;
    Books_model_1.default.findByIdAndUpdate(bookId, { $set: { status: statusToUpdate } }, { new: true, upsert: true })
        .then(updatedBook => {
        if (updatedBook) {
            res.status(constant_1.statusCodes.SUCCESS).json({
                success: true,
                message: constant_1.responseMessages.BOOK_STATUS_UPDATED,
                updatedBook: updatedBook
            });
        }
        else {
            res.status(constant_1.statusCodes.NOT_FOUND).json({
                success: false,
                message: constant_1.responseMessages.BOOK_NOT_FOUND
            });
        }
    })
        .catch(error => {
        console.error('Error updating book status:', error);
        res.status(constant_1.statusCodes.NOT_FOUND).json({
            success: false,
            message: constant_1.responseMessages.INTERNAL_SERVER_ERROR
        });
    });
});
exports.changeBookStatusController = changeBookStatusController;
const deleteBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    Books_model_1.default.findByIdAndDelete(bookId).then(deletedBook => {
        if (deletedBook) {
            res.status(constant_1.statusCodes.SUCCESS).json({
                success: true,
                message: constant_1.responseMessages.BOOK_DELETED,
                deletedBook: deletedBook
            });
        }
        else {
            res.status(constant_1.statusCodes.NOT_FOUND).json({
                success: false,
                message: constant_1.responseMessages.BOOK_NOT_FOUND
            });
        }
        ;
    })
        .catch(error => {
        console.error('Error deleting book:', error);
        res.status(constant_1.statusCodes.NOT_FOUND).json({
            success: false,
            message: constant_1.responseMessages.INTERNAL_SERVER_ERROR
        });
    });
});
exports.deleteBookController = deleteBookController;
const viewBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    Books_model_1.default.findById(bookId).then(book => {
        if (book) {
            res.status(constant_1.statusCodes.SUCCESS).json({
                success: true,
                message: constant_1.responseMessages.BOOK_FOUND,
                book: book
            });
        }
        else {
            res.status(constant_1.statusCodes.NOT_FOUND).json({
                success: false,
                message: constant_1.responseMessages.BOOK_NOT_FOUND
            });
        }
    })
        .catch(error => {
        console.error('Error finding book:', error);
        res.status(constant_1.statusCodes.NOT_FOUND).json({
            success: false,
            message: constant_1.responseMessages.INTERNAL_SERVER_ERROR
        });
    });
});
exports.viewBookController = viewBookController;
