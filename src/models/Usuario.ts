import {model, Schema} from 'mongoose';

const usuarioSchema =   new Schema({

    Usuario:{
        type:String
    },
    Password:{
        type:String
    },
    TipoUsuario:{
        type:String
    },
    Estado:{
        type: Boolean
    }
},{
    timestamps:true,
    versionKey:false
})

export default model('usuario',usuarioSchema);