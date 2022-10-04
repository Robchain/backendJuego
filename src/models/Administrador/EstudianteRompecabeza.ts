import mongoose, {Schema, model,Document} from 'mongoose';

export interface IEstudianteRompecabeza extends Document{
    Rompecabeza: mongoose.Types.ObjectId
    Categoria: mongoose.Types.ObjectId,
}
const RompecabezaCategoria = new Schema({
    Rompecabeza:{
        type:mongoose.Types.ObjectId
    },
    Categoria:{
        type:mongoose.Types.ObjectId
    }

},{
    timestamps:true,
    versionKey:false
})

export default model<IEstudianteRompecabeza>("rompecabezaCategoria", RompecabezaCategoria)

// volver a revisar la logica