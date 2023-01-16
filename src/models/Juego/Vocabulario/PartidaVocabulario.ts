import {Schema, Document, model} from "mongoose";
import { IRompecabeza } from "../../Administrador/RecursosRompecabeza";

export interface IPartidaVocabulario extends Document{
    Rompecabeza:IRompecabeza,
    Juego1:object,
    Juego2:object,
    Juego3:object,
    Juego4:object,
    Juego5:object,
    Juego6:object,
    Juego7:object,
}

const schemaPartidaVocabulario = new Schema({
    Rompecabeza:{
        type:Object,
        require:true,
    },
    Juego1:{
        type:Object,
        require:true,
    },
    Juego2:{
        type:Object,
        require:true,
    },
    Juego3:{
        type:Object,
        require:true,
    },
    Juego4:{
        type:Object,
        require:true,
    },
    Juego5:{
        type:Object,
        require:true,
    },
    Juego6:{
        type:Object,
    },
    Juego7:{
        type:Object,
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<IPartidaVocabulario>('partidasVocabulario',schemaPartidaVocabulario);