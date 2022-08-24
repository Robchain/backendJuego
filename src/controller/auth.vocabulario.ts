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


export const borrarVocabulario  = async (req:Request,res:Response) => {
  try {
    const Data  = await Vocabulario.findOneAndDelete(req.body.Palabra);
   res.json(Data);
  } catch (error) {
    res.json(error);
  }
}



