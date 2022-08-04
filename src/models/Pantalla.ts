import {prop,getModelForClass} from '@typegoose/typegoose';
import { Mongoose, ObjectId } from 'mongoose';

class Pantallas {
    @prop()
    idPantalla:ObjectId
    @prop()
    urlPantalla:string
    @prop()
    fechaRegistro:string
    @prop()
    fechaModificado:string
    @prop()
    estado:boolean
}

const PantallasModels = getModelForClass(Pantallas);
export default PantallasModels;