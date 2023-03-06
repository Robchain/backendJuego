import {model, Schema, Document} from 'mongoose'
import { IFechas, IIntegrantesPorGrupos, INombreDeEquipos, INumeroDeGrupos, INumeroDeIntegrantes } from '../../interface/Multijugador/Grupos.Interface'

export interface IMultiJuga extends Document{
    NombreDeEquipos:INombreDeEquipos[],
    NumeroDeGrupos:INumeroDeGrupos,
    NumeroDeIntegrantes:INumeroDeIntegrantes,
    IntegrantesPorGrupos:IIntegrantesPorGrupos,
   Fecha:IFechas[],
   Estado:string
}

const multiJugador = new Schema({    
    NombreDeEquipos:{
        type:Array,
        require:true,
        trim:true
    },
    NumeroDeGrupos:{
        type:Object,
        require:true,
        trim:true
    },
    
    NumeroDeIntegrantes:{
        type:Object,
        require:true,
        trim:true
    },
    IntegrantesPorGrupos:{
        type:Object,
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

export default model<IMultiJuga>('multiJugador',multiJugador);


