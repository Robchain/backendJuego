import {model, Schema, Document} from 'mongoose'

export interface IMultiJuga extends Document{
    Grupos:object,
    Equipos:object,
   Fecha:object,
   Estado:string
}

const multiJugador = new Schema({    
    Grupos:{
        type:Object,
        require:true,
        trim:true
    },
    Equipos:{
        type:Object,
        require:true,
        trim:true
    },
    Fecha:{
        type: Object,
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


