import  {Request, Response} from 'express'
import Persona, {IPersona} from '../models/Persona';
import jwt from 'jsonwebtoken';


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
        res.json(personaSave);
    } catch (error) {
     console.log(error);   
    }
    

};
//para el login
export const signin =  async (req:Request, res:Response)  =>{
    if(!req.body.Password||!req.body.Email)   return res.status(400).json({'respuesta':'falta correo y contraseña'})

    const persona = await Persona.findOne({Email:req.body.Email})
    
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
        const user = await  Persona.findById(req.personaId,{password:0});
    if(!user)   return res.status(400).json('no User Found');
    res.json(user);
}
// rompecabeza
export const rompeacabezaAdmn = async (req:Request,res:Response)=>{
 //   const rommpecabezasave = await rompeacabezaAdmn.save()
}
