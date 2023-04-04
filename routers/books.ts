import { Router } from "express";
import { Book, validateBook } from "./../schemas/bookCollection";
import { Category } from "../schemas/categoryCollection";
import { Request, Response } from "express";
// import auth from "../middlewares/authorization";

const router = Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("title");
  res.send(books);
});

router.post("/", async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const book = new Book({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await book.save();

  res.status(201).send(book);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.status(200).send(book);
});

router.put("/:id", async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.category._id);
  if (!category) return res.status(400).send("Invalid category, Bad Request");

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.send(book);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found!");

  res.send(book);
});

export default router;
