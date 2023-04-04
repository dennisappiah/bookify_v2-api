import {Router} from "express"
import { User, validateUser } from './../schemas/userCollection';
import _ from 'lodash'
import bcrypt from "bcrypt"
import auth from "../middlewares/authorization";


const router = Router();


// getting current user after authentication
router.get('/me', auth, async(req:any, res) => {
    const user= await User.findById(req.user._id).select('-password');
    res.send(user);
 });

router.post('/', async(req, res) => {
    const {error} = validateUser(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
    
    //second validation: checking if  user is  already registered
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');
    
    //user object 
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

   //setting jwt-token response header as part of the client response for subsequent auth/login requests
   const token = user.generateAuthToken();

   res
   .header('x-auth-token', token)
   .header('access-control-expose-headers', 'x-auth-token') 
   .status(201).send(_.pick(user, ['_id','name', 'email']));

});

export default router