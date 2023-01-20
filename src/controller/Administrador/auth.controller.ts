import  {Request, Response} from 'express'
import Persona, {IPersona} from '../../models/Administrador/Persona';
import jwt from 'jsonwebtoken';
import PartidaVocabulario from '../../models/Juego/Vocabulario/PartidaVocabulario';
import JugadoresConVocabularios, {IJugadoresConVocabulario} from '../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios';
import { modeloPartida } from '../auth.TestDeLlamada';

//funcion del token 
function   createToken(persona:IPersona){
    return jwt.sign({id:persona.id, Email:persona.Email},process.env.TOKKEN_SCRET||'tokendidactico',{
        expiresIn: '1d'
    });
}
// para registrar usuario
export const signup = async (req:Request, res:Response)=>{
    // guardando un nuevo usuario
    const persona:IPersona = new Persona({
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Email:req.body.Email,
        Usuario:req.body.Usuario,
        FotoPerfil:req.body.FotoPerfil,
        Password:req.body.Password,
        TipoUsuario:req.body.TipoUsuario,
        Identificacion:req.body.Identificacion,
        Estado:req.body.Estado        
    })
    try {
        const personaSave = await persona.save();
        const partidaI = await PartidaVocabulario.find().limit(6);
        //UNO
        const juegosVocabulario:IJugadoresConVocabulario = new JugadoresConVocabularios({
            Estudiante:{id:personaSave._id,
                Nombre:personaSave.Nombre,
                Usuario:personaSave.Usuario,
            },
            Partida:partidaI[0],
            Avance:modeloPartida(partidaI[0].Rompecabeza.Pieza),
        });
        juegosVocabulario.save();
//dos
const juegosVocabulario2:IJugadoresConVocabulario = new JugadoresConVocabularios({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[1],
    Avance:modeloPartida(partidaI[1].Rompecabeza.Pieza),
});
juegosVocabulario2.save();
//tres
const juegosVocabulario3:IJugadoresConVocabulario = new JugadoresConVocabularios({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[2],
    Avance:modeloPartida(partidaI[2].Rompecabeza.Pieza),
});
juegosVocabulario3.save();
//cuatro
const juegosVocabulario4:IJugadoresConVocabulario = new JugadoresConVocabularios({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[3],
    Avance:modeloPartida(partidaI[3].Rompecabeza.Pieza),
});
juegosVocabulario4.save();

//cinco
const juegosVocabulario5:IJugadoresConVocabulario = new JugadoresConVocabularios({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[4],
    Avance:modeloPartida(partidaI[4].Rompecabeza.Pieza),
});
juegosVocabulario5.save();
//seis
const juegosVocabulario6:IJugadoresConVocabulario = new JugadoresConVocabularios({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[5],
    Avance:modeloPartida(partidaI[5].Rompecabeza.Pieza),
});
juegosVocabulario6.save();
res.json({"titulo":"Excelente","respuesta":'guardado con exito',"type":"success"});

    } catch (e:any) {
    res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(e.keyPattern)} ya existe`, "type":"error"})
    /*res.json(Object.keys(e.keyPattern))  */    
    }
    
};
//para el login
export const signin =  async (req:Request, res:Response)  =>{
    if(!req.body.Password||!req.body.Email)   return res.status(400).json({'respuesta':'falta correo y contraseña'})

    const persona = await Persona.findOne({"Email":req.body.Email})
    
    if(!persona)    return res.json({'respuesta':'Correo o contraseña incorrecta'}); 
   const isMatch:boolean = await persona.compararPassword(req.body.Password)
   if(!isMatch) return res.json({'respuesta':"Contraseña incorrecta"});//res.status(400).json('Contraseña incorrecta');
//crea el token
   //if(isMatch)  return res.header('t', createToken(persona)).json({});//lo envia 
   //if(isMatch)  return res.json({'token':createToken(persona)});//forma insegura de enviar el token
   if(isMatch)  return res.json(persona);
} 
// datos del usuario
export const profile    =  async (req: Request, res:Response)=>{
        const user = await  Persona.findById(req.body.personaId,{password:0});
    if(!user)   return res.status(400).json('no User Found');
    res.json(user);
}
// rompecabeza
export const rompeacabezaAdmn = async (req:Request,res:Response)=>{
 //   const rommpecabezasave = await rompeacabezaAdmn.save()
}

export const perfilesActivos = async (req:Request, res:Response) => {
    try {
        const users = await Persona.find({TipoUsuario:'ESTUDIANTE'},{'createdAt':0, 'updatedAt':0, 'Password':0});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}
//perfiles no activos
export const perfilesNoActivos = async (req:Request, res:Response) => {
    try {
        const users = await Persona.find({/*Estado:"DESACTIVADO"*/},{'createdAt':0, 'updatedAt':0, 'Password':0});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}
export const perfilesTotales = async (req:Request, res:Response) => {
    try {
        const users = await Persona.find({},{'createdAt':0, 'updatedAt':0, 'Password':0});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}
export const borrarPerfiles =  async (req:Request, res:Response) => {
    try {
        const usersd= await Persona.deleteMany({Identificacion:req.body.Identificacion})
        res.json({"titulo":"Excelente","respuesta":'Borrado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const editarUser =async (req:Request, res:Response) => {
    try {
        const Data  = await Persona.findByIdAndUpdate({
            _id:req.body._id
        },{
            $set:{
                Nombre: req.body.Nombre,
                Apellido:req.body.Apellido,
                Email:req.body.Email,
                Usuario:req.body.Usuario,
                FotoPerfil:req.body.FotoPerfil,
                Password:req.body.Password,
                TipoUsuario:req.body.TipoUsuario,
                Identificacion:req.body.Identificacion,
                Estado:req.body.Estado
            }
        })
        res.json("Actualizado")
    } catch (error) {
        res.json("Error de Actualizacion")
    }
}
export const test =async (req:Request,res:Response) => {
    
        const Data = await Persona.findById(req.body._id)
        if(Data){
            Data.Nombre = req.body.Nombre
            Data.Apellido   =  req.body.Apellido
            Data.Email  =   req.body.Email,
            Data. Usuario    =   req.body.Usuario,
            Data.FotoPerfil  = req.body.FotoPerfil,
            Data.Password    =   req.body.Password,
            Data.TipoUsuario =   req.body.TipoUsuario,
            Data.Identificacion  =   req.body.Identificacion,
            Data.Estado  =   req.body.Estado
            Data.save()
                res.json({"titulo":"Excelente","respuesta":'Actualizado con exito',"type":"success"})
        }else{
            res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"})
        }
        
}


export const SoloEstudiantes =async (req:Request,res:Response) => {
    try {
        const users = await Persona.find({TipoUsuario:"ESTUDIANTE"},{'createdAt':0, 'updatedAt':0, 'Password':0});
        res.json(users);
    } catch (error) {
        res.json(error)
    }
}