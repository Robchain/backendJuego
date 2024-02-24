import {Schema, Document, model} from "mongoose";
import { IEquipoMult, IIntegrantes } from "../../../interface/Multijugador/Grupos.Interface";
import { ObjetoConAvance } from "../../../controller/Multijugador/Fase1";


export interface IGrupoDeTrabajo extends Document {
    IdDeLaAsignacion: string;
    Equipo: IEquipoMult;
    Integrantes:IIntegrantes[];
    Curso:string;
    Paralelo:string;
    TipoDeJuego: string;
    Avance: ObjetoConAvance[];
    FechaDeInicio: string;
    FechaDeFin: string;
    Medalla:string;
    Estado:string;
}


const schemaPartidaGrupoDeTrabjo = new Schema({
    IdDeLaAsignacion: {
        type: String,
        require: true
    },
    Equipo: {
        type: Object,
        require: true,
    },
    Integrantes: {
        type: Array,
        require: true,
    },
    Curso:{
        type:String,
        trim:true,
        require: true,
    },Paralelo:{
        type:String,
        trim:true,
        require: true,
    },
    TipoDeJuego: {
        type: String,
        require: true,
    },
    Avance: {
        type: Array,
        require: true,
    },
    FechaDeInicio: {
        type: String,
        require: true,
    },
    FechaDeFin: {
        type: String,
        require: true,
    },
    Medalla:{
        type: String,
        require: true,
    },
    Estado:{
        type:String,
        require:true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IGrupoDeTrabajo>('equiposdetrabajomultis', schemaPartidaGrupoDeTrabjo);