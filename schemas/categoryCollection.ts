import Joi from "joi"
import mongoose from "mongoose"
import CategoryModel from './../models/category';

export const categorySchema = new mongoose.Schema({
    name : { 
        type : String, 
        required : true, 
        minlength : 5 , 
        maxlength : 50}
})

export const Category = mongoose.model('Category', categorySchema);

export const validateCategory = (category: CategoryModel) => {
    const schema = Joi.object({ 
        name: Joi.string().min(5).max(50).required()
    });
    
    return schema.validate(category);
};


