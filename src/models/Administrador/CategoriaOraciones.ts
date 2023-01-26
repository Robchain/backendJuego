import {Schema, model,Document} from 'mongoose';

export interface ICategoriaOraciones extends Document{
    NombreCategoria:string,
    Estado:string
}

const schemaCategoriaOracione = new Schema({
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
export default model<ICategoriaOraciones>('categoriaOraciones', schemaCategoriaOracione)