import mongoose  from "mongoose";
import config from './config/confi';


(async () =>{
    try {
       const db = await mongoose.connect(`${config.db.URI}`);
console.log("Base de datos", db.connection.name); 
    } catch (error) {
        console.log(error)
    }
})()
 
 