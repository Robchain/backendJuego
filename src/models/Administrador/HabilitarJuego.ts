import {Schema, model, Document} from 'mongoose'


export interface IHabilidarJuego extends Document{
    Juego:string;
    Curso:string;
    Paralelo:string;
    Estado:string;
}

const schemaJuego =  new Schema({
    Juego:{
        type:String,
        require:true,
        trim:true
    },
    Curso:{
        type:String,
        require:true,
        trim:true
    },Paralelo:{
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

export default model<IHabilidarJuego>("HabilitarJuego",schemaJuego);