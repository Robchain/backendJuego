import {prop,getModelForClass} from '@typegoose/typegoose';

class Usuario {
    @prop()
    idUsuario:  string
    @prop()
    idPersona:  string
    @prop()
    usuario:    string
    @prop()
    password:   string
    @prop()
    tipoUsuario:    string
    @prop()
    fechaRegistro:  string
    @prop()
    fechaModificado:    string
    @prop()
    estado: boolean
}

const UsuarioModelo = getModelForClass(Usuario);
export default UsuarioModelo;