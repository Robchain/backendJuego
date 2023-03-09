import {Schema, model,Document} from 'mongoose';
import { IPersona } from './Persona';

export interface IActividadesHabilitadas extends Document{
    Estudiante:IPersona,
    Vocabulario:boolean,
    Oracion:boolean,
    MultiJugador:boolean,
    Estado:string
}

const schemaActividadesCheck = new Schema({
    Estudiante:{
        type:Object,
        require:true,
        trim:true
    },
    Vocabulario:{
        type:Boolean
    },
    Oracion:{
        type:Boolean
    },
    MultiJugador:{
        type:Boolean
    },
    Estado:{
        type:String,
        require:true,
        trim:true
    }}
,{
        versionKey:false,
        timestamps:true
})
export default model<IActividadesHabilitadas>('actividadeshabilitadas', schemaActividadesCheck)