import {Schema, Document, model} from "mongoose";
import {  Juego } from "../../../interface/ModeloPartida";
import { IPersona } from "../../Administrador/Persona";
import { IPartidaVocabulario } from "../../Juego/Vocabulario/PartidaVocabulario";
import { IRompecabeza } from "../../Administrador/RecursosRompecabeza";
export interface IJugadoresConVocabulario extends Document{
    Estudiante: IPersona,
    Rompecabeza:IRompecabeza,
    Avance:Juego[],
    Terminado:boolean
}

const schemaJugadoresConVocabulario = new Schema({
    Estudiante:{
        type:Object,
        require:true,
    },
    Rompecabeza:{
        type:Object,
        required:true
    },
    Avance:{
        type:Array,
        require:true,
    },
    Terminado:{
        type:Boolean,
        require:true
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<IJugadoresConVocabulario>('jugadoresconvocabulario',schemaJugadoresConVocabulario);


