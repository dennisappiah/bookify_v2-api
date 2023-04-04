import coursesRouter from "../routers/courses"
import booksRouter from "../routers/books"
import categoriesRouter from "../routers/categories"
import customersRouter from "../routers/customers"
import rentalsRouter from "../routers/rentals"
import usersRouter from "../routers/users"
import loginsRouter from "../routers/auth"
import express from "express"
import cors from "cors"
import { errorHandler } from '../middlewares/errorHandlers';


export const setupRoutes = (app: any) => {
    app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended : true }));
  app.use('/api/courses', coursesRouter);
  app.use('/api/books', booksRouter);
  app.use('/api/categories/', categoriesRouter);
  app.use('/api/customers/', customersRouter);
  app.use('/api/rentals/', rentalsRouter);
  app.use('/api/users/', usersRouter);
  app.use('/api/auth/', loginsRouter);
  app.use(errorHandler);
}
