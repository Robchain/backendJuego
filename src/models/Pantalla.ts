import {model, Schema} from 'mongoose'

const pantallaSchema = new Schema({    
    url:{
        type:   String
    },
    estado:{
        type: Boolean
    }
},{
    versionKey:false,
    timestamps:true
})

export default model('pantalla',pantallaSchema);


