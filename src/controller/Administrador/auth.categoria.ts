import Categoria,{ICategoria} from "../../models/Administrador/Categoria";
import {Request,Response} from 'express';


export const crearCategorias =async (req:Request,res:Response) => {
    try {
        const categoria:ICategoria = new Categoria({
            NombreCategoria:req.body.NombreCategoria,
            Estado:req.body.Estado
        })
        const guardar=categoria.save();
        res.json({"titulo":"Excelente","respuesta":'Categoria creada con exito',"type":"success"})
    } catch (error:any) {
        res.json({"titulo":"Error","respuesta":`el dato: ${Object.keys(error.keyPattern)} ya existe`, "type":"error"})
    }
}

export const borrarCategoria    =  async (req:Request, res:Response) => {
    try {
        const borrar = await Categoria.deleteMany({NombreCategoria:req.body.NombreCategoria});
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
//mostrar todos
export const mostrarCateTodos  =async (req:Request, res:Response) => {
try {
    const Data = await Categoria.find({},{"createdAt":0,"updatedAt":0});
    res.json(Data);
   
} catch (error) {
    res.json({"titulo":"Error","respuesta":`Algo salio mal`, "type":"error"});
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
export const EditarCategoria = async (req:Request, res:Response) => {
    try {
        const Data= await Categoria.findByIdAndUpdate({
            _id:req.body._id
        },{
            $set:{
                NombreCategoria:req.body.NombreCategoria,
                Estado:req.body.Estado
            }
        })
        res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}


