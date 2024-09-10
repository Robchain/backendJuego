import {model, Schema, Document} from 'mongoose'
import { IFechas, IIntegrantesPorGrupos, INombreDeEquipos, INumeroDeGrupos, INumeroDeIntegrantes } from '../../interface/Multijugador/Grupos.Interface'

export interface IMultiJuga extends Document{
    NombreDeEquipos:INombreDeEquipos[];
    NumeroDeGrupos:INumeroDeGrupos;
    NumeroDeIntegrantes:INumeroDeIntegrantes;
    IntegrantesPorGrupos:IIntegrantesPorGrupos;
    TipoDeJuego:string,
    Curso:string;
    Paralelo:string;
   Fecha:IFechas[];
   Estado:string;
   Docente:string;
   
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
    TipoDeJuego:{
        type:String,
        trim:true
    },
    Curso:{
        type:String,
        trim:true
    },Paralelo:{
        type:String,
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
    }, Docente:{
        type:String,
        // require:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
})

export default model<IMultiJuga>('multiJugador',multiJugador);


