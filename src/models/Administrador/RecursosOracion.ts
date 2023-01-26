import {Schema, model, Document} from 'mongoose'

export interface IRecursosOracion extends Document{
    //Categoria:mongoose.Types.ObjectId,
    Categoria:string,
    Oracion:string,
    Verbo:string,
    Adverbio:string
    FileSujetoImagen:string,
    FileAdjetivoImagen:string,
    FileVideoPreguntaQue:string,
    FileVideoPreguntaQuien:string,
    FileVideoMuestra:string,
    Estado:string
}

const schemaRecursosOracion = new Schema({
    Categoria:{
       // type: mongoose.Types.ObjectId,
       type:String,
        require:true,
        trim:true
    },
    Oracion:{
        type:String,
        require:true,
        trim:true
    },
    Verbo:{
        type:String,
        require:true,
        trim:true
    },Adverbio:{
        type:String,
        require:true,
        trim:true
    },
    FileSujetoImagen:{
        type:String,
        trim:true
    },
    FileAdjetivoImagen:{
        type:String,
        trim:true
    },
    FileVideoPreguntaQue:{
        type:String,
        trim:true
    },
    FileVideoPreguntaQuien:{
        type:String,
        trim:true
    },
    FileVideoMuestra:{
        type:String,
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
export default  model<IRecursosOracion>('recursosOracion', schemaRecursosOracion);