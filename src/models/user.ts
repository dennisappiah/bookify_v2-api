import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export default class UserModel {
    _id: any
    constructor(
        public name: string, 
        public email: string, 
        public password: string,
        public isAdmin: boolean ) {
    }
   

    generateAuthToken() {
        const token = jwt.sign({_id: this._id, name: this.name, email:this.email, isAdmin:this.isAdmin}, `${process.env.JWT_SECRET}`);
        return token;
    }
}
