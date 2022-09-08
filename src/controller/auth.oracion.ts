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
        const data = await Oracion.deleteMany({Oracion:req.body.Oracion})
        res.json(data);
    } catch (error) {
        res.json(error);
    }
} 
//muestra Oracion Todas
export const mostrarOracTodos = async (req:Request, res:Response) => {
    try {
        const Data= await   Oracion.find({},{"createdAt":0,"updatedAt":0});
        res.json(Data);
    } catch (error) {
        res.json(error)
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


/*
export const example = async (req:Request, res:Response) => {
    try {
        const data = await Oracion.aggregate([
            {
                $lookup:{
                    from:"categorias", //coleccion a llamar
                    localField:"Categoria", // campo donde esta la la Object id
                    foreignField:"NombreCategoria", // campo donde esta el object id inicial a llamar
                    as:"Data"   // el nombre del nuevo campo
                }
                
            }

        ])
        
        res.json(data);
        console.log(data);
    } catch (error) {
        res.json(error);
    }
}*/

