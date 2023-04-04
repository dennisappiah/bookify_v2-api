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
const customerCollection_1 = require("../schemas/customerCollection");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customerCollection_1.Customer.find().sort('name');
    res.status(200).send(customers);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, customerCollection_1.validateCustomer)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = new customerCollection_1.Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    yield customer.save();
    res.status(201).send(customer);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customerCollection_1.Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send('The customer with the given ID was not found!');
    res.status(200).send(customer);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, customerCollection_1.validateCustomer)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = yield customerCollection_1.Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });
    if (!customer)
        return res.status(404).send('The customer with the given ID was not found!!');
    res.status(200).send(customer);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customerCollection_1.Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res.status(404).send('The customer with the given ID was not found!');
    res.status(200).send(customer);
}));
exports.default = router;
