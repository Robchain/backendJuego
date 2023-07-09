import {model, Schema, Document} from 'mongoose'
import { IAvenceArriba, IFechas } from '../../interface/Multijugador/Grupos.Interface'
import { IEquipo } from './Equipo';

export interface IEquipoConJuego extends Document{
    IdDeLaAsignacion:string,
    Equipo:IEquipo,
    TipoDeJuego:string,
    Avance:IAvenceArriba[],
    Curso:string;
    Paralelo:string;
    YaAsignado:boolean,
   Fecha:IFechas[],
   Estado:string
}

const EquipoConJuego = new Schema({    
    IdDeLaAsignacion:{
        type:String,
        require:true,
        trim:true
    },
    Equipo:{
        type:Object,
        require:true,
    },
    TipoDeJuego:{
        type:String,
        require:true,
    },
    Avance:{
        type:Array,
        require:true,
    },
    Curso:{
        type:String,
        trim:true
    },Paralelo:{
        type:String,
        trim:true
    },
    YaAsignado:{
        type:Boolean,
        require:true
    },
    Fecha:{
        type: Array,
        require:true,
    },
    Estado:{
        type: String,
        require:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
})

export default model<IEquipoConJuego>('equipoConJuegos',EquipoConJuego);


