import Persona from '../../models/Administrador/Persona';
import Oracion,{IRecursosOracion} from  '../../models/Administrador/RecursosOracion';
import { Request, Response} from "express";
import JugadoresConOraciones, { IJugadoresConOraciones } from '../../models/Jugadores/JugadoresOracion/JugadoresConOraciones';
import {  rompecabezas } from '../auth.TestDeLlamada';
import QuienImagen from '../../models/Administrador/QuienImagen';
import { ActivoJuego } from '../../interface/JuegoVoca.Interface';


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
        res.json({"titulo":"Excelente","respuesta":'Oración creada con éxito',"type":"success"})
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
    res.json({"titulo":"Excelente","respuesta":'Ítem editado con éxito',"type":"success"})
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
    res.json({"titulo":"Excelente","respuesta":' Ítem editado con éxito',"type":"success"})
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
        res.json({"titulo":"Excelente","respuesta":'Item borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
    }
}
export const HabilitarOracion =async (req:Request, res:Response) => {
    try {
        const data = await Oracion.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Item restaurado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar ítem`, "type":"error"});
    }
}

export const ActivarJuegoConEstudianteOracion = async (req:Request, res:Response)=>{

    try {
        const Estudiantes = await Persona.find({Estado:"ACTIVO",TipoUsuario:"ESTUDIANTE",Paralelo:req.body.Paralelo,Curso:req.body.Curso},{ 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        for (const estudiante of Estudiantes){
            await crearJuegoOraciones(estudiante)
        }
        res.json({"titulo":"Excelente","respuesta":'Juego Creado Con éxito',"type":"success"})
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


//--------------------------------------

export const ImagenQuienCrear = (req:Request, res:Response)=>{
    try {
        const quienImagen    = new QuienImagen({
            Nombre:req.body.Nombre,
            Imagen:req.body.Imagen,
            Estado:"ACTIVO",
        })
        const data = quienImagen.save();
        res.status(200).json({"titulo":"Excelente","respuesta":'Opcion creada con éxito',"type":"success"})
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
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}

export const ImagenQuienEliminar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.deleteOne({_id:req.body._id})
        res.status(200).json({"titulo":"Excelente","respuesta":'Item borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const ImagenQuienDesibilitar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.status(200).json({"titulo":"Excelente","respuesta":'Item borrado',"type":"success"})
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const ImagenQuienHabilitar =async (req:Request, res:Response) => {
    try {
        const data = await QuienImagen.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.status(200).json({"titulo":"Excelente","respuesta":'Item restaurado',"type":"success"})
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
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
              output.push({Curso:data[i].Estudiante[0].Curso, Paralelo:data[i].Estudiante[0].Paralelo,Activo:'Si' });
            }
          }
  
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
    }
  }