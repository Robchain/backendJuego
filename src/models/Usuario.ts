import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

//interface
export interface IUser extends Document {
    Usuario:    string,
    Password:   string,
    Estado:Boolean,
     
}
//schema de la coleccion 
const usuarioSchema =   new Schema({

    Usuario:{
        type:String,
        require:true,
        trim:true
    },
    Password:{
        type: String
    },
    TipoUsuario:{
        type:String
    },
    Estado:{
        type: Boolean
    }
},{
    timestamps:true,
    versionKey:false
})
//cifrado de la contraseña
usuarioSchema.pre<IUser>('save', async function(next){
    
    if(!this.isModified('Password')) return next();

const  salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(this.Password, salt );

});

//comprobar si coincide la contraseña guardada

usuarioSchema.methods.compararPassword = async function( password: string) : Promise<boolean>{
   return await bcrypt.compare(password,this.Password)
}


//exportacion del archivo

export default model<IUser>('usuario',usuarioSchema);