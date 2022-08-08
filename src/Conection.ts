import mongoose  from "mongoose";


(async () =>{
    try {
       const db = await mongoose.connect("mongodb+srv://robertrrr:roro2069@robertrr.wuxak.mongodb.net/Testi");
console.log("ejemplo", db.connection.name); 
    } catch (error) {
        console.log(error)
    }


})()
 
 