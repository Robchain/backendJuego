import {model, Schema, Document} from 'mongoose'
import { IFechas, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface'
import { IEquipo } from './Equipo';

export interface IEquipoConJuego extends Document{
    IdDeLaAsignacion:string,
    Equipo:IEquipo,
    Juegos:IPartidaMulti[],
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
        trim:true
    },
    
    Juegos:{
        type:Array,
        require:true,
        trim:true
    },
    Fecha:{
        type: Array,
        require:true,
        trim:true
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


