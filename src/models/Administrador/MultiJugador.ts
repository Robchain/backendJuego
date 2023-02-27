import {model, Schema, Document} from 'mongoose'
interface IIntegrantess{
    value:string
    label:string
}
interface IFechas{
    DateGameM:Date[]
}
interface IGruposAqui{
    grupos:object,
    equipos:object,
    integrantes:IIntegrantess
}
export interface IMultiJuga extends Document{
    Grupos:IGruposAqui,
    Equipos:object,
   Fecha:IFechas,
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


