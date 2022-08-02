import mongoose from "mongoose";

async function conectdb(){
   const db = await mongoose.connect('mongodb+srv://robertrrr:roro2069@robertrr.wuxak.mongodb.net/Testi');
    console.log("nombre de la base:", db.connection.name);
}

conectdb();