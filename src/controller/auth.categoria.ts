import Categoria,{ICategoria} from "../models/Categoria";
import {Request,Response} from 'express';


export const crearCategorias =async (req:Request,res:Response) => {
    try {
        const categoria:ICategoria = new Categoria({
            NombreCategoria:req.body.NombreCategoria,
            Estado:req.body.Estado
        })
        const guardar=categoria.save();
        res.json(guardar);
    } catch (error) {
    res.json(error);
    }
}

export const borrarCategoria    =  async (req:Request, res:Response) => {
    try {
        const borrar = await Categoria.deleteMany({NombreCategoria:req.body.NombreCategoria});
        res.json(borrar)
    } catch (error) {
        res.json(error);
    }
}
//mostrar todos
export const mostrarCateTodos  =async (req:Request, res:Response) => {
try {
    const Data = await Categoria.find({},{"createdAt":0,"updatedAt":0});
    res.json(Data);
   
} catch (error) {
    res.json(error);
}    
}
//buscar por Nombre
export const mostrarCatePala    =   async (req:Request,res:Response) => {
    try {
        const Data= await Categoria.find({NombreCategoria:req.body.NombreCategoria})
        res.json(Data);
    } catch (error) {
        res.json(error);   
    }
}
//actualizar


