import {Schema, model,Document} from 'mongoose';

export interface ICategoria extends Document{
    NombreCategoria:string,
    Estado:string
}

const schemaCategoria = new Schema({
    NombreCategoria:{
        type:String,
        require:true,
        trim:true
    },
    Estado:{
        type:String,
        require:true,
        trim:true
    }}
,{
        versionKey:false,
        timestamps:true
})
export default model<ICategoria>('categoria', schemaCategoria)