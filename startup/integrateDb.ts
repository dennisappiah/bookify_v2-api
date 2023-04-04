import mongoose from "mongoose"
import { configEnv } from "./setConfig"

configEnv()

export const setupDb = ():void => {
    mongoose.connect(`${process.env.DB}`)
       .then(() => console.log(`Connected to ${process.env.DB}`))
       .catch(err => console.log("Could not connect to MongoDb..", err))
}
