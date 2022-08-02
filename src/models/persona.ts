import {prop,getModelForClass} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
class Persona {
    @prop()
    IdPersona: string
    @prop()
    Nombre: string
    @prop()
    Apellido: string
    @prop()
    Identificacion: number
    @prop()
    Email: string
    @prop()
    FotoPerfil: string
    @prop()
    FechaRegistro: string
    @prop()
    FechaModificado: string
    @prop()
    Estado: boolean

}

const PersonaModel = getModelForClass(Persona)
export default PersonaModel;