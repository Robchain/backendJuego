import  {Request, Response} from 'express'
import Persona, {IPersona} from '../models/Persona';
import jwt from 'jsonwebtoken';

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
    //toker
    const token:string = jwt.sign({_id: personaSave._id}, process.env.TOKKEN_SCRET||'tokendidactico');

    res.header('Token_entrada',token).json(personaSave);

    
};
//para el login
export const signin =   (req:Request, res:Response)  =>{
    res.send('signin');

}
// datos del usuario
export const profile    =   (req: Request, res:Response)=>{
    res.send('profile');
}