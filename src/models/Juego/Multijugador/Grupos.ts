import { Schema, Document, model, Date } from "mongoose";
import { IEquipoMult } from "../../../interface/Multijugador/Grupos.Interface";


export interface IGrupoDeTrabajo extends Document {
    IdDeLaAsignacion: string,
    Equipo: IEquipoMult,
    Integrantes: object,
    Juegos: object,
    Avance: object,
    FechaDeInicio: Date,
    FechaDeFin: Date,
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
        type: Object,
        require: true,
    },
    Juegos: {
        type: Object,
    },
    Avance: {
        type: Object,
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