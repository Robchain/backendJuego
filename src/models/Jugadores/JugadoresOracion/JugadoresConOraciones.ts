import {Schema, Document, model} from "mongoose";
import { IModeloPartida, Juego } from "../../../interface/ModeloPartida";
import { IPersona } from "../../Administrador/Persona";
import { IPartidaOracion } from "../../Juego/Oracion/PartidaOracion";
import { IRompecabeza } from "../../Administrador/RecursosRompecabeza";
export interface IJugadoresConOraciones extends Document{
    Estudiante: IPersona,
    Rompecabeza:IRompecabeza,
    Avance:Juego[],
    Terminado:boolean
}

const schemaJugadoresConOraciones = new Schema({
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

export default model<IJugadoresConOraciones>('jugadoresconOracion',schemaJugadoresConOraciones);


