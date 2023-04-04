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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookCollection_1 = require("./../schemas/bookCollection");
const categoryCollection_1 = require("../schemas/categoryCollection");
// import auth from "../middlewares/authorization";
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield bookCollection_1.Book.find().sort("title");
    res.send(books);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, bookCollection_1.validateBook)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const category = yield categoryCollection_1.Category.findById(req.body.categoryId);
    if (!category)
        return res.status(400).send("Invalid category");
    const book = new bookCollection_1.Book({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    yield book.save();
    res.status(201).send(book);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield bookCollection_1.Book.findById(req.params.id);
    if (!book)
        return res.status(404).send("The book with the given ID was not found!");
    res.status(200).send(book);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, bookCollection_1.validateBook)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const category = yield categoryCollection_1.Category.findById(req.body.category._id);
    if (!category)
        return res.status(400).send("Invalid category, Bad Request");
    const book = yield bookCollection_1.Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    }, { new: true });
    if (!book)
        return res.status(404).send("The book with the given ID was not found!");
    res.send(book);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield bookCollection_1.Book.findByIdAndRemove(req.params.id);
    if (!book)
        return res.status(404).send("The book with the given ID was not found!");
    res.send(book);
}));
exports.default = router;
