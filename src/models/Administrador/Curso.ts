import {Schema, model, Document} from 'mongoose'


export interface ICurso extends Document{
    Nombre:string,
    Estado:string
}

const schemaCurso =  new Schema({
    Nombre:{
        type:String,
        require:true,
        trim:true
    },
    Estado:{
        type:String,
        require:true,
        trim:true
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<ICurso>("Curso",schemaCurso);