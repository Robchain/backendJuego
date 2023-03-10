import {model, Schema, Document} from 'mongoose'
import { IAvenceArriba, IFechas, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface'
import { IEquipo } from './Equipo';

export interface IEquipoConJuego extends Document{
    IdDeLaAsignacion:string,
    Equipo:IEquipo,
    Juegos:IPartidaMulti[],
    Avance:IAvenceArriba[],
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
    Juegos:{
        type:Array,
        require:true,
    },
    Avance:{
        type:Object,
        require:true,
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


