import {Schema, model} from 'mongoose';

const schemaPerson = new Schema({
    Nombre:{

    },
    Apellido:{

    },
    Identificacion:{

    },
    Email:{

    },
    FotoPerfil:{
        type:   String
    },
    Estado:{

    }},
    {
        versionKey:false,
        timestamps:true
    })

export default model('persona',schemaPerson);

