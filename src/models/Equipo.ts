import mongoose, {Schema, model, Document} from 'mongoose'


export interface IEquipo extends Document{
    Nombre:string,
    Imagen:string,
    Estado:string
}

const schemaEquipo =  new Schema({
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

export default model<IEquipo>("equipo",schemaEquipo);