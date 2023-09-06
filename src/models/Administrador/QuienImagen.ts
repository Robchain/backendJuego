import mongoose, {Schema, model, Document} from 'mongoose'


export interface IQuienImagen extends Document{
    Nombre:string,
    Imagen:string,
    Estado:string
}

const schemaQuienImagen =  new Schema({
    Nombre:{
        type:String,
        require:true,
        trim:true
    },
    Imagen:{
        type:String,
        require:true,
        trim:true,
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

export default model<IQuienImagen>("QuienImagen",schemaQuienImagen);