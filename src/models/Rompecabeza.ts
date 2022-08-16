import { Schema, Document,model  } from "mongoose";
export interface IRompecabeza extends Document{
    FileBlanco:string,
    FileColor:string,
    Estado:string
}

const rompecabezaSchema = new Schema({
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
