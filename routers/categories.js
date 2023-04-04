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
const validationObjectId_1 = require("../middlewares/validationObjectId");
const categoryCollection_1 = require("../schemas/categoryCollection");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryCollection_1.Category.find().sort('name');
    res.status(200).send(categories);
}));
// implement post permissions from authenticated users
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, categoryCollection_1.validateCategory)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const category = new categoryCollection_1.Category({
        name: req.body.name
    });
    yield category.save();
    res.status(201).send(category);
}));
router.get('/:id', validationObjectId_1.validateObjectId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryCollection_1.Category.findById(req.params.id);
    if (!category)
        return res.status(404).send('The category with the given ID was not found!!');
    res.status(200).send(category);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, categoryCollection_1.validateCategory)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const category = yield categoryCollection_1.Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });
    if (!category)
        return res.status(404).send('The category with the given ID was not found!');
    res.status(200).send(category);
}));
// only authenticated admins have delete authorization
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryCollection_1.Category.findByIdAndRemove(req.params.id);
    if (!category)
        return res.status(404).send('The category with the given ID was not found!');
    res.status(200).send(category);
}));
exports.default = router;
