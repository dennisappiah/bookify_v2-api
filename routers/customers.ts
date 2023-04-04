import {Customer, validateCustomer} from "../schemas/customerCollection"
import {Router} from "express"

const router = Router()


router.get('/', async(req, res) => {
   const customers = await Customer.find().sort('name');
   res.status(200).send(customers);
});


router.post('/', async(req, res) => {
    const {error} = validateCustomer(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const customer = new Customer( {
        name: req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold,
    });

    await customer.save();

    res.status(201).send(customer);

});

router.get('/:id',async (req, res) => {
    const customer= await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found!');

    res.status(200).send(customer);
})

router.put('/:id', async(req, res) => {
    const {error} = validateCustomer(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name :req.body.name,
        isGold : req.body.isGold,
        phone : req.body.phone }, { new : true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found!!');

    res.status(200).send(customer); 
});


router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found!');
    
    res.status(200).send(customer);
});


export default router