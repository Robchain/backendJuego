import {Schema, Document, model, Date} from "mongoose";
import { IEquipoMult } from "../../../interface/Multijugador/Grupos.Interface";


export interface IGrupoDeTrabajo extends Document{
    Equipo:IEquipoMult,
    Integrantes:Object,
    Juegos:object,
    Avance:object,
    FechaDeInicio:Date,
    FechaDeFin:Date,
}


const schemaPartidaGrupoDeTrabjo = new Schema({
    Equipo:{
        type:Object,
    },
    Integrantes:{
        type:Object,
        require:true,
    },
    Juegos:{
        type:Object,
        
    },
    Avance:{
        type:Object,
        require:true,
    },
    FechaDeInicio:{
        type:Object,
        require:true,
    },
    FechaDeFin:{
        type:Object,
        require:true,
    },
},{
    timestamps:true,
    versionKey:false
})

export default model<IGrupoDeTrabajo>('gruposdetrabajo',schemaPartidaGrupoDeTrabjo);