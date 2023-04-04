import {Router} from "express"
import Course from "../models/course"
import  createCourseDto from './../dtos/create-course';
import Joi from "joi"

const router = Router();
const courses: Course[] = []

router.get('/', (req, res) => {
    res.status(200).send(courses)
});


router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const {name} = req.body as createCourseDto

    const course = new Course(name);
    courses.push(course);
    res.status(201).json(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(b => b.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID  was not found");
    res.status(200).send(course);
})

router.put('/:id', (req, res) => {
   //look up course
   // if not exist 404

   // Validate
   //if invalid , return 400 - Bad request

   //Update course
   //Return updated course
    const course  = courses.find(b => b.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID  was not found");

    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    if (course !== undefined) {
       course.name = req.body.name
       res.status(200).send(course)
    }

});

router.delete('/:id', (req, res) => {
    const course = courses.find(b => b.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID  was not found");
    
    if (course !== undefined) {
        const index = courses.indexOf(course);
        courses.splice(index, 1);

        res.status(200).send(course)
     }
    
});

function validateCourse(course: createCourseDto){
    const schema = Joi.object({ 
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(course);
}

export default router
