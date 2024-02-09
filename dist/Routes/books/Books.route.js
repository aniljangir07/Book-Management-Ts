"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("../../Controller/books/books.controller");
const Rbac_middleware_1 = require("../../middleware/Rbac.middleware");
const AuthHelper_1 = require("../../Utils/AuthHelper");
const Book_validator_1 = require("../../Validator/Book/Book.validator");
const router = (0, express_1.Router)();
// Create a book
router.post("/books/createBook", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), Book_validator_1.createBookValidator, books_controller_1.createBookController);
// Get books list
router.get("/books/list", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2, 3]), books_controller_1.getAllBooksController);
// Update book status
router.patch("/books/updateStatus/:bookId/:status", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), books_controller_1.changeBookStatusController);
// Delete a book
router.get("/books/delete/:bookId", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1]), books_controller_1.deleteBookController);
// View a book
router.get("/books/view/:bookId", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2, 3]), books_controller_1.viewBookController);
exports.default = router;
