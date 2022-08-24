import {Schema, model,  Document} from 'mongoose';

export interface    IRecursosVocabulario extends Document{
    Categoria:string,
    Palabra:string,
    Silaba:string,
    FileMuestra:string,
    FilePregunta:string,
    FileImagen:string,
    Estado:string
}
const schemaRecursosVocabulario =  new Schema({
    Categoria:{
        type:String,
        require:true,
        trim:true
    },
    Palabra:{
        type:String,
        require:true,
        trim:true
    },
    Silaba:{
        type:String,
        require:true,
        trim:true
    },
    FileMuestra:{
        type:String,
        require:true,
        trim:true   
    },
    FilePregunta:{
        type:String,
        require:true,
        trim:true
    },
    FileImagen:{
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
    versionKey:false,
        timestamps:true
})
export default model<IRecursosVocabulario>('recursosVocabulario', schemaRecursosVocabulario);