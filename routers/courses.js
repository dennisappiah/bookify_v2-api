"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_1 = __importDefault(require("../models/course"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const courses = [];
router.get('/', (req, res) => {
    res.status(200).send(courses);
});
router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const { name } = req.body;
    const course = new course_1.default(name);
    courses.push(course);
    res.status(201).json(course);
});
router.get('/:id', (req, res) => {
    const course = courses.find(b => b.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID  was not found");
    res.status(200).send(course);
});
router.put('/:id', (req, res) => {
    //look up course
    // if not exist 404
    // Validate
    //if invalid , return 400 - Bad request
    //Update course
    //Return updated course
    const course = courses.find(b => b.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID  was not found");
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    if (course !== undefined) {
        course.name = req.body.name;
        res.status(200).send(course);
    }
});
router.delete('/:id', (req, res) => {
    const course = courses.find(b => b.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given ID  was not found");
    if (course !== undefined) {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.status(200).send(course);
    }
});
function validateCourse(course) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(course);
}
exports.default = router;
