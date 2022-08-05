import {prop, getModelForClass, getClass} from '@typegoose/typegoose';
import { Mongoose, ObjectId } from 'mongoose';


class UsuarioPantalla {
    @prop({requiere: true})  //mongoose
    idUsuarioPantalla: ObjectId //typescript
    @prop()
    idPantalla: ObjectId
    @prop()
    idUsuario: ObjectId
    @prop()
    fechaModificado: string
    @prop()
    fechaRegistro: string
    @prop()
    estado: boolean
}

const UsuarioPantallaModelo = getModelForClass(UsuarioPantalla);
export default UsuarioPantallaModelo;