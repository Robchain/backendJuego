import  {Request, Response} from 'express'
import Persona, {IPersona} from '../models/Persona';
import jwt from 'jsonwebtoken';


//funcion del token 
function   createToken(persona:IPersona){
    return jwt.sign({id:persona.id, Email:persona.Email},process.env.TOKKEN_SCRET||'tokendidactico',{
        expiresIn: 60*60
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
    
    const personaSave = await persona.save();

    res.json(personaSave);

    
};
//para el login
export const signin =  async (req:Request, res:Response)  =>{
    if(!req.body.Password||!req.body.Email)   return res.status(400).json('falta correo y contraseña')

    const persona = await Persona.findOne({Email:req.body.Email})
    if(!persona)    return res.status(400).json('Correo o contraseña incorrecta'); 
   const isMatch:boolean = await persona.compararPassword(req.body.Password)
   if(!isMatch) return res.status(400).json('Contraseña incorrecta');
//crea el token
   if(isMatch)  return res.header('token', createToken(persona)).json({});//lo envia 

} 
// datos del usuario
export const profile    =  async (req: Request, res:Response)=>{
        const user = await  Persona.findById(req.personaId,{password:0});
    if(!user)   return res.status(400).json('no User Found');
    res.json(user);



}
