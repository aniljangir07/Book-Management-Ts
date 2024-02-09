import { Router } from "express";

// <-----------------------------------Import The Routes Files Present In This App-------------------------------->
import UserRoute from "./User.route";
import BooksRoutes from  "./books/Books.route";

const appRouter = Router();
appRouter.use(
  "/v1",
  BooksRoutes,
  UserRoute
);

export default appRouter;
