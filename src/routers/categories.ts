import { validateObjectId } from "../middlewares/validationObjectId";
import {Category, validateCategory} from "../schemas/categoryCollection"
import {response, Router} from "express"
import auth from "../middlewares/authorization"
import admin from "../middlewares/admin_authorization";
import { Request, Response } from 'express';

const router = Router()


router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.status(200).send(categories);
  });
  

// implement post permissions from authenticated users
router.post('/', async(req, res) => {
    const {error} = validateCategory(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const category = new Category( {
        name: req.body.name
    });

    await category.save();

    res.status(201).send(category);

});


router.get('/:id', validateObjectId, async (req, res) => {
    const category= await Category.findById(req.params.id);

    if (!category) return res.status(404).send('The category with the given ID was not found!!');
    
    res.status(200).send(category);
});


router.put('/:id', async(req, res) => {
    const {error} = validateCategory(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(req.params.id, {
        name :req.body.name}, { new : true });

    if (!category) return res.status(404).send('The category with the given ID was not found!');

    res.status(200).send(category); 
});

// only authenticated admins have delete authorization
router.delete('/:id', async(req:Request, res:Response) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send('The category with the given ID was not found!');
    
    res.status(200).send(category);
});


export default router