import {Schema, model,Document} from 'mongoose';
import bcrypt from 'bcrypt';

//  interface
export interface IPersona extends Document{
    Nombre:string;
    Apellido:string;
    Email:string;
    Usuario:string;
    FotoPerfil:string;
    Password:string;
    TipoUsuario:string;
    Identificacion:string;
    Estado:string;
    compararPassword(password:string): Promise<boolean>;
    regresarPerfil():Promise<string>;
}
// esquema de la coleccion
const schemaPerson = new Schema({
    Nombre:{
        type:String,
        require:true,
        trim:true
    },
    Apellido:{
        type:String,
        require:true,
        trim:true
    },
    Identificacion:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    Email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    FotoPerfil:{
        type:String,
        require:false,
        trim:true
    },
    Usuario:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    Password:{
        type: String,
        require:true,
        trim:true
    },
    TipoUsuario:{
        type:String,
        require:true,
        trim:true
    },Estado:{
        type:String,
        require:true,
        trim:true
    }},
    {
        versionKey:false,
        timestamps:true
    }); 

    //cifrado de la contraseña
schemaPerson.pre<IPersona>('save', async function(next){
    
    if(!this.isModified('Password')) return next();

const  salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(this.Password, salt );
   this.Password= hash;
   next();

});

//comprobar si coincide la contraseña guardada
schemaPerson.methods.compararPassword = async function( password: string) : Promise<boolean>{
   return await bcrypt.compare(password,this.Password)
}

// exportacion del archivo
export default model<IPersona>('persona',schemaPerson);

