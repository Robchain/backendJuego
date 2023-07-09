import { Schema, Document, model, Date } from "mongoose";
import { IAvenceArriba, IEquipoMult, IIntegrantes } from "../../../interface/Multijugador/Grupos.Interface";


export interface IGrupoDeTrabajo extends Document {
    IdDeLaAsignacion: string;
    Equipo: IEquipoMult;
    Integrantes:IIntegrantes[];
    Curso:string;
    Paralelo:string;
    TipoDeJuego: string;
    Avance: IAvenceArriba[];
    FechaDeInicio: Date;
    FechaDeFin: Date;
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
        type: Object,
        require: true,
    },
    FechaDeFin: {
        type: Object,
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