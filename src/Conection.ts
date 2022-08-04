import mongoose from 'mongoose';

try {
    (async () =>{
        const db = await mongoose.connect('mongodb+srv://robertrrr:roro2069@robertrr.wuxak.mongodb.net/Testi');
         console.log("nombre de la base:", db.connection.name);
     })
} catch (error) {
    console.error(error);
}

 
 