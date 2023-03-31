import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose  from "mongoose";



(async () =>{
    try {
       const db = await mongoose.connect(`${process.env.DATABASE_URI}`);
console.log("Base de datos", db.connection.name); 
    } catch (error) {
        console.log(error)
    }
})()    
 
 