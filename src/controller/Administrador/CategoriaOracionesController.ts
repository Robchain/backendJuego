import { Request, Response } from "express";
import CategoriaOraciones, { ICategoriaOraciones } from "../../models/Administrador/CategoriaOraciones";


export const crearCategoriasOraciones = async (req: Request, res: Response) => {
    try {
        const categoria  = await  CategoriaOraciones.find({Estado:"ACTIVO"},{"createdAt":0,"updatedAt":0});
        res.json(categoria);
    } catch (error: any) {
        res.json([]);
    }
}
// crear el resto del crud
export const borrarCategoriaOracion    =  async (req:Request, res:Response) => {
    try {
        const borrar = await CategoriaOraciones.deleteOne({_id:req.body._id});
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}

export const EditarCategoriaOracion = async (req:Request, res:Response) => {
    try {
        const Data= await CategoriaOraciones.findByIdAndUpdate({
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




