import { Schema, Document,model  } from "mongoose";
export interface IRompecabeza extends Document{
    Nombre:string,
    Pieza:number,
    FileBlanco:string,
    FileColor:string,
    Estado:string
}

const rompecabezaSchema = new Schema({
    Nombre:{
        type:String,
        require:true,
        trim:true
    },
    Pieza:{
        type:Number,
        require:true,
        trim:true

    },
    FileBlanco:{
        type:String,
        require:true,
        trim:true
    },
    FileColor:{
        type:String,
        require:true,
        trim:true
    },
    Juego:{
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
});

export default model<IRompecabeza>('rompecabeza', rompecabezaSchema);