import Oracion,{IRecursosOracion} from  '../models/RecursosOracion';
import { Request, Response} from "express";


export const subirOracion = async (req:Request, res:Response) => {
    
    try {
        const oracion:IRecursosOracion  = new  Oracion({
            Categoria:req.body.Categoria,
            Oracion:req.body.Oracion,
            Verbo:req.body.Verbo,
            FileSujetoImagen:req.body.FileSujetoImagen,
            FileAdjetivoImagen:req.body.FileAdjetivoImagen,
            FileVideoPreguntaQue:req.body.FileVideoPreguntaQue,
            FileVideoPreguntaQuien:req.body.FileVideoPreguntaQuien,
            FileVideoPreguntaCompleja:req.body.FileVideoPreguntaCompleja,
            FileVideoMuestra:req.body.FileVideoMuestra,
            Estado:req.body.Estado
        })
        const guardarOracion   =    await   oracion.save();
        res.json(guardarOracion);
    } catch (error) {
        res.json(error)
    }
}
export const borrarOracion  =   async (req:Request,res:Response) => {
    try {
        const data = await Oracion.findOneAndDelete(req.body.Oracion)
        res.json(data);
    } catch (error) {
        res.json(error);
    }


} 