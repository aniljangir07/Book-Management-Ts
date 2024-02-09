import express, { Application, Response, Request, NextFunction } from "express";
import config from "config";
import morgan from "morgan";
import apis from "./Routes";
import cors from "cors";
import { responseMessages, statusCodes } from "./constant";

import "./Db/Connection";

const app: Application = express();
const PORT: number = config.get('PORT');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());

// Log the apis hits on server
app.use((req: Request, res: Response, next: NextFunction) => {
  const hitApi = `${req.method} ${req.url}`;
  console.log(hitApi, "\n|\nv\n|\nv\n|\nv");
  next();
});

// Use app routes
app.use("/api", apis);

// This should be the last route else any after it wont work
app.use("*", (req: Request, res: Response) => {
  res.status(statusCodes.NOT_FOUND).json({
    success: false,
    message: responseMessages.ROUTE_NOT_FOUND,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = req.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    errorMessage: err.stack,
  });
});

// Server up on provided port number
app.listen(PORT, () => console.log(`===== Server Up On PORT ${PORT} =====`));
