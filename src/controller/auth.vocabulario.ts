import Vocabulario,{IRecursosVocabulario} from "../models/RecursosVocabulario";
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
      Estado:req.body.Estado
    })

   const vocabularioGuardar = await vocabulario.save();
   res.json(vocabularioGuardar);
   } catch (error) {
    res.json(error);
   }

}

//borrar todas las coincidencias 
export const borrarVocabulario  = async (req:Request,res:Response) => {
  try {
    const Data  = await Vocabulario.deleteMany({Palabra:req.body.Palabra});
   res.json(Data);
  } catch (error) {
    res.json(error);
  }
}
//mostrar toddos en la data
export const mostrarVocaTodos =async (req:Request, res:Response) => {
  try {
    const Data = await Vocabulario.find({},{"createdAt":0,"updatedAt":0});
    res.json(Data);
  } catch (error) {
    res.json(error);
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


