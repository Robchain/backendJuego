import { Request, Response } from "express";
import CategoriaOraciones, { ICategoriaOraciones } from "../../models/Administrador/CategoriaOraciones";


export const crearCategoriasOraciones = async (req: Request, res: Response) => {
    try {
        const categoria: ICategoriaOraciones = new CategoriaOraciones({
            NombreCategoria: req.body.NombreCategoria,
            Estado: req.body.Estado
        })
        const guardar = categoria.save();
        res.json({ "titulo": "Excelente", "respuesta": 'Categoria creada con exito', "type": "success" })
    } catch (error: any) {
        res.json({ "titulo": "Error", "respuesta": `el dato: ${Object.keys(error.keyPattern)} ya existe`, "type": "error" })
    }
}
// crear el resto del crud




