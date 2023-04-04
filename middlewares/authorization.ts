import { Request, Response } from 'express';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


const auth = (req: any, res:Response, next: Function) => {
    // passs jwt tokens as request headers to auth endpoints
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Unaunthorized');

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
         
        req.user = decoded;
        next();
        }
        catch (ex) {
            res.status(400).send('Invalid token');
        }
};

export default auth
 

  
