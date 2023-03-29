import { Request, Response } from "express";
import CategoriaOraciones, { ICategoriaOraciones } from "../../models/Administrador/CategoriaOraciones";


export const crearCategoriasOraciones = async (req: Request, res: Response) => {
    try {
        const categoria  = await  CategoriaOraciones.find({},{"createdAt":0,"updatedAt":0});
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
            }
        })
        res.json({"titulo":"Excelente","respuesta":'Editado con exito',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`No se pudo editar`, "type":"error"});
    }
}

export const DesibilitarCategoriaOraciones =async (req:Request, res:Response) => {
    try {
        const data = await CategoriaOraciones.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Item Borrado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}
export const HabilitarCategoriaOraciones =async (req:Request, res:Response) => {
    try {
        const data = await CategoriaOraciones.findByIdAndUpdate({_id:req.body._id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
        res.json({"titulo":"Excelente","respuesta":'Item Restaurado',"type":"success"})
    } catch (error) {
        res.json({"titulo":"Error","respuesta":`no se puedo borrar`, "type":"error"});
    }
}


