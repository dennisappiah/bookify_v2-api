import mongoose from "mongoose";

export default interface BookModel {
    title: string
    category: {
        _id: mongoose.Types.ObjectId,
    },
    numberInStock : number,
    dailyRentalRate: number
}