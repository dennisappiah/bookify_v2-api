import mongoose from "mongoose";


export default class RentalModel {
    constructor(
        public customer: { 
            name:string, 
            isGold: boolean,
            phone: string,
            customerId: mongoose.Types.ObjectId,
        },
        public book: {
            title: string,
            dailyRentalRate: number
            bookId: mongoose.Types.ObjectId,
        }, 
        public dateOut: Date,
        public dateReturned: Date,
        public rentalFee : number
        ) {
     }
};