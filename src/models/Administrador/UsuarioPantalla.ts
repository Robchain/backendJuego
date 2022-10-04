import {model, Schema, Document} from 'mongoose';



const usuarioPantallaSchema =   new Schema({
    Usuario:{
        type:  String
    },
    Pantalla:{
        type:   String
    },
    Estado:{
        type: Boolean
    }
}, {
    timestamps:true,
    versionKey:false
})