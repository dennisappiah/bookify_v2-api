import {Router} from "express"
import { User} from './../schemas/userCollection';
import Joi from "joi"
import bcrypt from "bcrypt"


const router = Router();

interface authRequestBody {
    email:string,
    password: string
}

router.post('/', async(req, res) => {
    const {error} = validateAuth(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    //second validation: checking if  user email does not exist
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    //third  validation: checking if  user password does not exist
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // generate json web tokens to pass as response
    const token = user.generateAuthToken();
    
    //respond with Json Web Token(JWT)
    res.send(token);
});


// implement logging out user on the client 

export const validateAuth = (req: authRequestBody) => {
    const schema = Joi.object({ 
        email : Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    
    return schema.validate(req);
};

export default router