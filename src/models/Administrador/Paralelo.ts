import {Schema, model, Document} from 'mongoose'


export interface IParalelo extends Document{
    Nombre:string,
    Estado:string
}

const schemaParalelo =  new Schema({
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

export default model<IParalelo>("Paralelo",schemaParalelo);