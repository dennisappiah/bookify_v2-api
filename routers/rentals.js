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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = require("express");
const rentalCollection_1 = require("./../schemas/rentalCollection");
const bookCollection_1 = require("./../schemas/bookCollection");
const customerCollection_1 = require("../schemas/customerCollection");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentals = yield rentalCollection_1.Rental.find().sort('-dateOut');
    res.send(rentals);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, rentalCollection_1.validateRental)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = yield customerCollection_1.Customer.findById(req.body.customerId);
    if (!customer)
        return res.status(400).send('No customer with this ID');
    const book = yield bookCollection_1.Book.findById(req.body.bookId);
    if (!book)
        return res.status(400).send('No book with this ID');
    if (book.numberInStock === 0)
        return res.status(400).send('Book not in stock');
    const rental = new rentalCollection_1.Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        book: {
            _id: book._id,
            title: book.title,
            dailyRentalRate: book.dailyRentalRate
        },
        dateOut: req.body.dateOut,
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFeee,
    });
    try {
        const session = yield mongoose_1.default.startSession();
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            yield rental.save();
            book.numberInStock--;
            book.save();
            res.status(201).send(rental);
        }));
        session.endSession();
        console.log('success');
    }
    catch (error) {
        console.log('error111', error.message);
    }
}));
exports.default = router;
