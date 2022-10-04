import {model, Schema, Document} from 'mongoose'

export interface IPantalla extends Document{
    Nombre:string,
    Descripcion:string,
    Url:string,
    Estado:string,
    Perfil:string
}

const pantallaSchema = new Schema({    
    Nombre:{
        type:String,
        require:true,
        trim:true
    },
    Descripcion:{
        type:String,
        require:true,
        trim:true
    },
    Url:{
        type:   String,
        require:true,
        trim:true
    },
    Estado:{
        type: String,
        require:true,
        trim:true
    },
    Perfil:{
        type:String,
        default:'Estudiante',
        require:true,
        trim:true
    }

},{
    versionKey:false,
    timestamps:true
})

export default model<IPantalla>('pantalla',pantallaSchema);


