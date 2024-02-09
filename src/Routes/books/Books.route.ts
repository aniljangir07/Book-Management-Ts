import { Router } from "express";
import { createBookController, getAllBooksController, changeBookStatusController, deleteBookController, viewBookController } from "../../Controller/books/books.controller";

import { roleCheckerMiddleware } from "../../middleware/Rbac.middleware";
import { authenticateToken } from "../../Utils/AuthHelper";
import {createBookValidator} from "../../Validator/Book/Book.validator"
const router = Router();

// Create a book
router.post(
      "/books/createBook",
      authenticateToken,
      roleCheckerMiddleware([1, 2]),
      createBookValidator,
      createBookController
);

// Get books list
router.get(
      "/books/list",
      authenticateToken,
      roleCheckerMiddleware([1, 2, 3]),
      getAllBooksController
);

// Update book status
router.patch(
      "/books/updateStatus/:bookId/:status",
      authenticateToken,
      roleCheckerMiddleware([1, 2]),
      changeBookStatusController
);

// Delete a book
router.get(
      "/books/delete/:bookId",
      authenticateToken,
      roleCheckerMiddleware([1]),
      deleteBookController
);

// View a book
router.get(
      "/books/view/:bookId",
      authenticateToken,
      roleCheckerMiddleware([1, 2, 3]),
      viewBookController
);

export default router;