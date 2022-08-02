import mongoose from "mongoose";
import Persona from './models/persona';

async function conectdb(){
   const db = await mongoose.connect('mongodb+srv://robertrrr:roro2069@robertrr.wuxak.mongodb.net/Testi');
    console.log("nombre de la base:", db.connection.name);
}

conectdb();

const persona = new Persona({
    IdPersona: 1,
    Nombre: "Robert",
    Apellido: "Roman",
    Identificacion: "0912345678",
    Email: "testo@corre.com",
    FotoPerfil: "url", 
    FechaRegistro: "8/2/2022",
    FechaModificado: "8/2/2022",
    Estado: true
})
console.log(persona);