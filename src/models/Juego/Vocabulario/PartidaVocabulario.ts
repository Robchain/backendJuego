import {Schema, Document, model} from "mongoose";

export interface IPartidaVocabulario extends Document{

}

const schemaPartidaVocabulario = new Schema({
    Rompecabeza:{
        type:String
    },
    Categoria:{
        type:String,
        require:true,
        trim:true
    },
    Partida:{
        type:Array
    }
},{
    timestamps:true,
    versionKey:false
})
