import {Schema, model,Document} from 'mongoose';
import bcrypt from 'bcrypt';
import { ICurso, IParalelo } from '../../interface/Persona.Interface';

//  interface
export interface IPersona extends Document{
    Nombre:string;
    Apellido:string;
    Email:string;
    Usuario:string;
    FotoPerfil:string;
    Password:string;
    TipoUsuario:string;
    Curso:ICurso[];
    Paralelo:IParalelo[];
    Identificacion:string;
    Estado:string;
    compararPassword(password:string): Promise<boolean>;
    regresarPerfil():Promise<string>;
}
// esquema de la coleccion
const schemaPerson = new Schema({
    Nombre:{
        type:String,
          trim:true
    },
    Apellido:{
        type:String,
         trim:true
    },
    Identificacion:{
        type:String,
        trim:true,
        unique:true
    },
    Email:{
        type:String,
       trim:true,
        lowercase:true,
        unique:true
    },
    FotoPerfil:{
        type:String,
        trim:true
    },
    Usuario:{
        type:String,
        trim:true,
        unique:true
    },
    Password:{
        type: String,
        trim:true
    },
    TipoUsuario:{
        type:String,
        trim:true
    },
    Curso:{
        type:Array,
        trim:true
    },Paralelo:{
        type:Array,
        trim:true
    },Estado:{
        type:String,
        trim:true
    }},
    {
        versionKey:false,
        timestamps:true
    }); 

    //cifrado de la contraseña
schemaPerson.pre<IPersona>('save', async function(next){
    try {
        if(!this.isModified('Password')) return next();

        const  salt = await bcrypt.genSalt(10)
           const hash = await bcrypt.hash(this.Password, salt );
           this.Password= hash;
           next();
    } catch (error) {
        console.log(error)
    }
});
//comprobar si coincide la contraseña guardada
schemaPerson.methods.compararPassword = async function( password: string) : Promise<boolean>{
   return await bcrypt.compare(password,this.Password)
}

// exportacion del archivo
export default model<IPersona>('persona',schemaPerson);

