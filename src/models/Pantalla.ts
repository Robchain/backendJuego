import {model, Schema, Document} from 'mongoose'

export interface IPantalla extends Document{
    url:string,
    estado:boolean,
    perfil:string
}

const pantallaSchema = new Schema({    
    url:{
        type:   String
    },
    estado:{
        type: Boolean
    },
    perfil:{
        type:String
    }

},{
    versionKey:false,
    timestamps:true
})

export default model<IPantalla>('pantalla',pantallaSchema);


