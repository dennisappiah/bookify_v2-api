import mongoose from "mongoose";
import {Router} from "express"
import {Rental, validateRental } from '../schemas/rentalCollection';
import { Book } from '../schemas/bookCollection';
import { Customer } from "../schemas/customerCollection";


const router = Router();

router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


router.post('/', async (req,res) => {
    const {error} = validateRental(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('No customer with this ID');

    const book = await Book.findById(req.body.bookId);
    if (!book) return res.status(400).send('No book with this ID');

    if (book.numberInStock === 0) return res.status(400).send('Book not in stock');

    const rental = new Rental( {
        customer : {
            _id : customer._id,
            name : customer.name,
            isGold: customer.isGold,
            phone : customer.phone
        },
        book : {
            _id : book._id,
            title : book.title,
            dailyRentalRate : book.dailyRentalRate
        },
        dateOut: req.body.dateOut,
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFeee,
    });

      try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
        await rental.save();
        book.numberInStock--;
        book.save();
        res.status(201).send(rental);

        });
  
        session.endSession();
        console.log('success');
      } 
      catch (error: any) {
        console.log('error111', error.message);
      }
});


export default router