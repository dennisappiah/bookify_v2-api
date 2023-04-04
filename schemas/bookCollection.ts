import mongoose from "mongoose";
import { categorySchema } from "../schemas/categoryCollection";
import BookModel from "../models/book";
import Joi from "joi"

export const Book = mongoose.model('Book', new mongoose.Schema({
    title : { 
        type : String, 
        required : true, 
         minlength : 5 ,
         maxlength : 255,
         trim : true
        },
    category : {
        type : categorySchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }

}));

export const validateBook = (book: BookModel ) => {
    const schema = Joi.object({ 
        title: Joi.string().min(5).max(50).required(),
        categoryId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    });
    
    return schema.validate(book);
};
