import {Schema, Document, model} from "mongoose";


export interface IGrupoDeTrabajo extends Document{
    NombreEquipo:object,
    ImagenDelEquipo:String,
    Integrantes:object,
    Juegos:object,
    FechaDeInicio:object,
    FechaDeFin:object,
}


const schemaPartidaGrupoDeTrabjo = new Schema({
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

export default model<IGrupoDeTrabajo>('gruposdetrabajo',schemaPartidaGrupoDeTrabjo);