import Vocabulario,{IRecursosVocabulario} from "../../models/Administrador/RecursosVocabulario";
import { Request, Response } from "express";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { ActivoJuego } from "../../interface/JuegoVoca.Interface";

export const subirVocabulario =async (req:Request, res:Response) => {    
   try {
    const vocabulario:IRecursosVocabulario= new  Vocabulario({
      Categoria:req.body.Categoria,
      Palabra:req.body.Palabra,
      Silaba:req.body.Silaba,
      FileMuestra:req.body.FileMuestra,
      FilePregunta:req.body.FilePregunta,
      FileImagen:req.body.FileImagen,
      Estado:"ACTIVO"
    })

   const vocabularioGuardar = await vocabulario.save();
   res.status(200).json({"titulo":"Excelente","respuesta":'Vocabulario creado con éxito',"type":"success"})
   } catch (error:any) {
    res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})
   }
}

//borrar todas las coincidencias 
export const borrarVocabulario  = async (req:Request,res:Response) => {
  try {
    const Data  = await Vocabulario.deleteMany({Palabra:req.body.Palabra});
    res.status(200).json({"titulo":"Excelente","respuesta":'Item borrado',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`No se puedo borrar`, "type":"error"});
  }
}
//mostrar toddos en la data
export const mostrarVocaTodos =async (req:Request, res:Response) => {
  try {
    const Data = await Vocabulario.find({},{"createdAt":0,"updatedAt":0});
    res.json(Data);
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`Algo salio mal`, "type":"error"});
  }
}
export const mostrarVocaPala = async (req:Request,res:Response)=>{
  try {
    const Data = await Vocabulario.find({Palabra:req.body.Palabra})
    res.json(Data);
  } catch (error) {
    res.json(error)
  }
}

export const editarVocabulario =async (req:Request, res:Response) => {
  try {
    const Data= await Vocabulario.findByIdAndUpdate({_id:req.body._id}, 
      { $set:
        {Categoria:req.body.Categoria,
        Palabra:req.body.Palabra,
        Silaba:req.body.Silaba,
        FileMuestra:req.body.FileMuestra,
        FilePregunta:req.body.FilePregunta,
        FileImagen:req.body.FileImagen,
      }
    })
    res.json({"titulo":"Excelente","respuesta":'Ítem editado con éxito',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`No se pudo editar el ítem`, "type":"error"});
  }
}
export const editarVocabularioSinArchivos =async (req:Request, res:Response) => {
  try {
    const Data= await Vocabulario.findByIdAndUpdate({_id:req.body._id}, 
      { $set:
        {Categoria:req.body.Categoria,
        Palabra:req.body.Palabra,
        Silaba:req.body.Silaba,
      }
    })
    res.json({"titulo":"Excelente","respuesta":'Ítem editado con éxito',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`No se pudo editar el ítem`, "type":"error"});
  }
}


export const DesibilitarVocabulario =async (req:Request, res:Response) => {
  try {
      const data = await Vocabulario.findByIdAndUpdate({_id:req.body._id},
          {$set:
          {  Estado:"INACTIVO"  
          }})
      res.json({"titulo":"Excelente","respuesta":'Ítem desactivado',"type":"success"})
  } catch (error) {
      res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
  }
}
export const HabilitarVocabulario =async (req:Request, res:Response) => {
  try {
      const data = await Vocabulario.findByIdAndUpdate({_id:req.body._id},
          {$set:
          {  Estado:"ACTIVO"  
          }})
      res.json({"titulo":"Excelente","respuesta":'Ítem restaurado',"type":"success"})
  } catch (error) {
      res.json({"titulo":"Error","respuesta":`no se puedo borrar el ítem`, "type":"error"});
  }
}



export const JuegosActivos =async (req:Request, res:Response) => {
  try {
    let output:ActivoJuego[]=[];
      const data = await JugadoresConVocabularios.aggregate([
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
