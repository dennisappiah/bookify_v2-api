import { User } from "../../schemas/userCollection";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()



describe('user.generateAuthToken', () => {
    test('should return a valid JWT token', () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true}

        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        expect(decoded).toMatchObject(payload);
    }) 
})