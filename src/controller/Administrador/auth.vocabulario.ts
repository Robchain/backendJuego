import Vocabulario,{IRecursosVocabulario} from "../../models/Administrador/RecursosVocabulario";
import { Request, Response } from "express";

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
   res.json({"titulo":"Excelente","respuesta":'Rompecabeza Creada con exito',"type":"success"})
   } catch (error:any) {
    res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})
   }
}

//borrar todas las coincidencias 
export const borrarVocabulario  = async (req:Request,res:Response) => {
  try {
    const Data  = await Vocabulario.deleteMany({Palabra:req.body.Palabra});
    res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
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
    res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
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
    res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
  } catch (error) {
    res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
  }
}
// test
export const testvi =async (req:Request, res:Response) => {
    try {
      const Data = await Vocabulario.findOne({Palabra:'PAN'})
      res.json(Data)
    } catch (error) {
      res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}


export const DesibilitarVocabulario =async (req:Request, res:Response) => {
  try {
      const data = await Vocabulario.findByIdAndUpdate({_id:req.body._id},
          {$set:
          {  Estado:"INACTIVO"  
          }})
      res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
  } catch (error) {
      res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
  }
}
export const HabilitarVocabulario =async (req:Request, res:Response) => {
  try {
      const data = await Vocabulario.findByIdAndUpdate({_id:req.body._id},
          {$set:
          {  Estado:"ACTIVO"  
          }})
      res.json({"titulo":"Excelente","respuesta":'Item Restaurado',"type":"success"})
  } catch (error) {
      res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
  }
}


