import Persona from '../../models/Administrador/Persona';
import Oracion,{IRecursosOracion} from  '../../models/Administrador/RecursosOracion';
import { Request, Response} from "express";
import JugadoresConOraciones, { IJugadoresConOraciones } from '../../models/Jugadores/JugadoresOracion/JugadoresConOraciones';
import {  rompecabezas } from '../auth.TestDeLlamada';


export const subirOracion = async (req:Request, res:Response) => {
    try {
        const oracion:IRecursosOracion  = new  Oracion({
            Categoria:req.body.Categoria,
            Oracion:req.body.Oracion,
            Verbo:req.body.Verbo,
            Adverbio:req.body.Adverbio,
            Sujeto:req.body.Sujeto,
            FileSujetoImagen:req.body.FileSujetoImagen,
            FileAdjetivoImagen:req.body.FileAdjetivoImagen,
            FileVideoPreguntaQue:req.body.FileVideoPreguntaQue,
            FileVideoPreguntaQuien:req.body.FileVideoPreguntaQuien,
            FileVideoMuestra:req.body.FileVideoMuestra,
            Estado:"ACTIVO"
        })
        const guardarOracion   =    await   oracion.save();
        res.json({"titulo":"Excelente","respuesta":'Oracion Creada con exito',"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})
    }
}
export const borrarOracion  =   async (req:Request,res:Response) => {
    try {
        const data = await Oracion.deleteMany({Oracion:req.body.Oracion})
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
} 
//muestra Oracion Todas
export const mostrarOracTodos = async (req:Request, res:Response) => {
    try {
        const Data= await   Oracion.find({},{"createdAt":0,"updatedAt":0});
        res.json(Data);
    } catch (error) {   
        res.json({"titulo":"Error","respuesta":`Algo salio mal`, "type":"error"});
    }    
}
//muestra Oracion por coincidencia
export const mostrarOracPala =async (req:Request,res:Response) => {
try {
    const Data= await Oracion.find({Oracion:req.body.Oracion});
    res.json(Data);
} catch (error) {
    res.json(error)
}    
}

export const editarOracion =async (req:Request, res:Response) => {
    try {
        const Data = await Oracion.findByIdAndUpdate(
            {
         _id:req.body._id
            },{
        $set:{
            Categoria:req.body.Categoria,
            Oracion:req.body.Oracion,
            Verbo:req.body.Verbo,
            Adverbio:req.body.Adverbio,
            FileSujetoImagen:req.body.FileSujetoImagen,
            FileAdjetivoImagen:req.body.FileAdjetivoImagen,
            FileVideoPreguntaQue:req.body.FileVideoPreguntaQue,
            FileVideoPreguntaQuien:req.body.FileVideoPreguntaQuien,
            FileVideoPreguntaCompleja:req.body.FileVideoPreguntaCompleja,
            FileVideoMuestra:req.body.FileVideoMuestra,
        }
    })
    res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}

export const editarOracionSinArchivo =async (req:Request, res:Response) => {
    try {
        const Data = await Oracion.findByIdAndUpdate(
            {
         _id:req.body._id
            },{
        $set:{
            Categoria:req.body.Categoria,
            Oracion:req.body.Oracion,
            Verbo:req.body.Verbo,
            Adverbio:req.body.Adverbio,
        }
    })
    res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}

export const DesibilitarOracion =async (req:Request, res:Response) => {
    try {
        const data = await Oracion.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const HabilitarOracion =async (req:Request, res:Response) => {
    try {
        const data = await Oracion.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Item Restaurado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}

export const ActivarJuegoConEstudianteOracion = async (req:Request, res:Response)=>{

    try {
        const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:req.body.Paralelo,Curso:req.body.Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        for (const estudiante of Estudiantes){
            await crearJuegoOraciones(estudiante)
        }
        res.json({"titulo":"Excelente","respuesta":'Juego Creado Con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`Hubo un error al crear el juego`, "type":"error"}); 
    }

}

const crearJuegoOraciones = async (estudiante:any)=>{
    for (let index = 0; index < 13; index++) {
        const juegosOracion: IJugadoresConOraciones = new JugadoresConOraciones({
            Estudiante: {
                _id: estudiante._id,
                Nombre: estudiante.Nombre,
                Usuario: estudiante.Usuario,
                Identificacion:estudiante.Identificacion,
                Curso:estudiante.Curso,
                Paralelo:estudiante.Paralelo
            },
            Rompecabeza: await rompecabezas(),
            Avance: null,
            Terminado:false
        });
        juegosOracion.save();
    }

}
