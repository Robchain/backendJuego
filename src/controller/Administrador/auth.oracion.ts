import Persona from '../../models/Administrador/Persona';
import Oracion,{IRecursosOracion} from  '../../models/Administrador/RecursosOracion';
import { Request, Response} from "express";
import JugadoresConOraciones, { IJugadoresConOraciones } from '../../models/Jugadores/JugadoresOracion/JugadoresConOraciones';
import {  rompecabezas } from '../auth.TestDeLlamada';
import QuienImagen from '../../models/Administrador/QuienImagen';
import { ActivoJuego } from '../../interface/JuegoVoca.Interface';
import { responseformualrio } from '../../lib';
import { CrearHabilitarJuego } from './auth.HabilitarJuego';


export const subirOracion = async (req:Request, res:Response) => {
    try {
        const oracion:IRecursosOracion  = new  Oracion({
            Categoria:req.body.Categoria,
            Oracion:req.body.Oracion,
            Verbo:req.body.Verbo,
            Adverbio:req.body.Adverbio,
            Sujeto:req.body.Sujeto,
            Que:req.body.Que,
            // FileSujetoImagen:req.body.FileSujetoImagen,
            // FileAdjetivoImagen:req.body.FileAdjetivoImagen,
            FileVideoPreguntaQue:req.body.FileVideoPreguntaQue,
            FileVideoPreguntaQuien:req.body.FileVideoPreguntaQuien,
            FileVideoMuestra:req.body.FileVideoMuestra,
            Estado:"ACTIVO"
        })
        const guardarOracion   =    await   oracion.save();
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Creado.Creado,"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})
    }
}
export const borrarOracion  =   async (req:Request,res:Response) => {
    try {
        const data = await Oracion.deleteMany({Oracion:req.body.Oracion})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Borrar.BorrarItem,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Borrar.NoBorrarItem, "type":"error"});
    }
} 
//muestra Oracion Todas
export const mostrarOracTodos = async (req:Request, res:Response) => {
    try {
        const Data= await   Oracion.find({},{"createdAt":0,"updatedAt":0});
        res.json(Data);
    } catch (error) {   
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});
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
            Sujeto:req.body.Sujeto,
            Que:req.body.Que,
            // FileSujetoImagen:req.body.FileSujetoImagen,
            // FileAdjetivoImagen:req.body.FileAdjetivoImagen,
            FileVideoPreguntaQue:req.body.FileVideoPreguntaQue,
            FileVideoPreguntaQuien:req.body.FileVideoPreguntaQuien,
            FileVideoPreguntaCompleja:req.body.FileVideoPreguntaCompleja,
            FileVideoMuestra:req.body.FileVideoMuestra,
        }
    })
    res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
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
            Sujeto:req.body.Sujeto,
            Que:req.body.Que,
        }
    })
    res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}

export const DesibilitarOracion =async (req:Request, res:Response) => {
    try {
        const data = await Oracion.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const HabilitarOracion =async (req:Request, res:Response) => {
    try {
        const data = await Oracion.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
    }
}

export const ActivarJuegoConEstudianteOracion = async (req:Request, res:Response)=>{

    try {
        const {Paralelo, Curso} = req.body;
        const jugadoresConOracion = await JugadoresConOraciones.find({"Estudiante.Curso":Curso, "Estudiante.Paralelo":Paralelo});
        if(jugadoresConOracion.length >0){
            res.json({"titulo":"Error","respuesta":'Los estudiantes ya tienen juegos asignados',"type":"error"})
        }else if(jugadoresConOracion.length ===0){
        const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:Paralelo,Curso:Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
       if(Estudiantes.length> 0){
        for (const estudiante of Estudiantes){
            await crearJuegoOraciones(estudiante)
        }
       CrearHabilitarJuego({Curso:Curso, Juego:"ORACION", Paralelo:Paralelo});
        res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    }else{
        res.json({"titulo":"Error","respuesta":'No hay estudiantes para asignar juego',"type":"error"})
    }
}
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`Hubo un error al crear el juego`, "type":"error"}); 
    }

}

export const crearJuegoOraciones = async (estudiante:any)=>{
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
            Terminado:false,
            Estado:true
        });
        juegosOracion.save();
    }

}
export const crearJuegoOracionesConCursoYParalelo = async (estudiante:any, Curso:string, Paralelo:string )=>{
    for (let index = 0; index < 13; index++) {
        const juegosOracion: IJugadoresConOraciones = new JugadoresConOraciones({
            Estudiante: {
                _id: estudiante._id,
                Nombre: estudiante.Nombre,
                Usuario: estudiante.Usuario,
                Identificacion:estudiante.Identificacion,
                Curso:Curso,
                Paralelo:Paralelo
            },
            Rompecabeza: await rompecabezas(),
            Avance: null,
            Terminado:false,
            Estado:true
        });
        juegosOracion.save();
    }

}


//--------------------------------------

export const ImagenQuienCrear = (req:Request, res:Response)=>{
    try {
        const quienImagen    = new QuienImagen({
            Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
            Estado:"ACTIVO",
        })
        const data = quienImagen.save();
        res.status(200).json({"titulo":"Excelente","respuesta":responseformualrio.Creado.Creado,"type":"success"})
    } catch (error:any) {
        res.status(500).json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})  
    }
}

// TODO agregar el de editar

export const ImagenQuienMostrar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.find({},{"createdAt":0,"updatedAt":0})
        res.status(200).json(data)
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Mostrar.NoMostrar, "type":"error"});
    }
}
export const editarQuien = async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
        {$set:
        {   Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
        }})
            res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}
export const editarQuienSinImagen = async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
        {$set:
        {   Nombre:req.body.Nombre
        }})
            res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"});
    }
}
export const ImagenQuienEliminar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.deleteOne({_id:req.body._id})
        res.status(200).json({"titulo":"Excelente","respuesta":responseformualrio.Borrar.BorrarItem,"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Borrar.NoBorrarItem, "type":"error"});
    }
}
export const ImagenQuienDesibilitar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.status(200).json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"});
    }
}
export const ImagenQuienHabilitar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.status(200).json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"});
    }
}



export const JuegosActivosOracion =async (req:Request, res:Response) => {
    try {
      let output:ActivoJuego[]=[];
        const data = await JugadoresConOraciones.aggregate([
          {
            '$group': {
              '_id': {
                'Curso': '$Estudiante.Curso', 
                'Paralelo': '$Estudiante.Paralelo'
              }, 
              'Estudiante': {
                '$push': '$Estudiante'
              }
            }
          }
        ])
          for(let i=0; data.length>i;i++){
            if(data[i].Estudiante[0].Curso ||data[i].Estudiante[0].Paralelo){
              output.push({Curso:data[i].Estudiante[0].Curso, Paralelo:data[i].Estudiante[0].Paralelo,Activo:'ACTIVO' });
            }
          }
  
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
    }
  }