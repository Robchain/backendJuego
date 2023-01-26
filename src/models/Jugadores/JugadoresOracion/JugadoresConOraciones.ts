import {Schema, Document, model} from "mongoose";
import { IModeloPartida } from "../../../interface/ModeloPartida";
import { IPersona } from "../../Administrador/Persona";
import { IPartidaOracion } from "../../Juego/Oracion/PartidaOracion";
export interface IJugadoresConOraciones extends Document{
    Estudiante: IPersona,
    Partida:IPartidaOracion,
    Avance:IModeloPartida
}

const schemaJugadoresConOraciones = new Schema({
    Estudiante:{
        type:Object,
        require:true,
    },
    Partida:{
        type:Object,
        require:true,
    },
    Avance:{
        type:Object,
        require:true,
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<IJugadoresConOraciones>('jugadoresconOracion',schemaJugadoresConOraciones);


