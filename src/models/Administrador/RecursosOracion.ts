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
        trim:true
    },
    FileSujetoImagen:{
        type:String,
        require:true,
        trim:true
    },
    FileAdjetivoImagen:{
        type:String,
        require:true,
        trim:true
    },
    FileVideoPreguntaQue:{
        type:String,
        require:true,
        trim:true
    },
    FileVideoPreguntaQuien:{
        type:String,
        require:true,
        trim:true
    },
    FileVideoMuestra:{
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
export default  model<IRecursosOracion>('recursosOracion', schemaRecursosOracion);