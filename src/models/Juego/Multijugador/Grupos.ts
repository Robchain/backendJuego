import { Schema, Document, model, Date } from "mongoose";
import { IAvenceArriba, IEquipoMult, IIntegrantes } from "../../../interface/Multijugador/Grupos.Interface";
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
    Estado:string
}


const schemaPartidaGrupoDeTrabjo = new Schema({
    IdDeLaAsignacion: {
        type: String,
        require: true
    },
    Equipo: {
        type: Object,
    },
    Integrantes: {
        type: Array,
        require: true,
    },
    Curso:{
        type:String,
        trim:true
    },Paralelo:{
        type:String,
        trim:true
    },
    TipoDeJuego: {
        type: String,
    },
    Avance: {
        type: Array,
    },
    FechaDeInicio: {
        type: String,
        require: true,
    },
    FechaDeFin: {
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

export default model<IGrupoDeTrabajo>('equiposdetrabajoMulti', schemaPartidaGrupoDeTrabjo);