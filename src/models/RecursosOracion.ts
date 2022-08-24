import {Schema, model, Document} from 'mongoose'

export interface IRecursosOracion extends Document{
    Categoria:'',
    Oracion:'',
    Verbo:'',
    FileSujetoImagen:'',
    FileAdjetivoImagen:'',
    FileVideoPreguntaQue:'',
    FileVideoPreguntaQuien:'',
    FileVideoPreguntaCompleja:'',
    FileVideoMuestra:'',
    Estado:''
}

const schemaRecursosOracion = new Schema({
    Categoria:{
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
        trim:true},
    FileSujetoImagen:{
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
    FileVideoPreguntaCompleja:{
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