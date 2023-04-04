import Joi from "joi"
import mongoose from "mongoose"
import CustomerModel from './../models/customer';

export const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));

export const validateCustomer = (customer: CustomerModel) => {
    const schema = Joi.object({ 
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold : Joi.boolean(),
    });
    
    return schema.validate(customer);
}


