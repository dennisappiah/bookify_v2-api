import mongoose from "mongoose";
import RentalModel from "../models/rental";
import Joi from "joi"


export const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer : { 
       type : new mongoose.Schema({
        name : { 
            type : String, 
            required : true, 
            minlength : 5 ,
            maxlength : 50},
        isGold : {
            type : Boolean,
            default : false
        },
        phone : { 
            type : String, 
            required : true, 
            minlength : 5 , 
            maxlength : 50}
       }),
       required : true
        },

    book : {
      type : new mongoose.Schema({
        title : { 
            type : String, 
            required : true, 
             minlength : 5 ,
             maxlength : 255,
             trim : true
            },
        dailyRentalRate : {
            type : Number,
            required : true,
            min : 0,
            max : 255
        }    
        }),
      required : true
    },

    dateOut : {
        type : Date,
        required : true,
        default : Date.now()
    },

    dateReturned : {
        type : Date   
    },

    rentalFee : {
        type : Number,
        min : 0   
    }

}));

export const validateRental = (rental: RentalModel ) => {
    const schema = Joi.object({ 
        customerId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        bookId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
       
    });
    
    return schema.validate(rental);
};