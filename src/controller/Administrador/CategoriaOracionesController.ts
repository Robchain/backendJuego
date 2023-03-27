import { Request, Response } from "express";
import CategoriaOraciones, { ICategoriaOraciones } from "../../models/Administrador/CategoriaOraciones";


export const crearCategoriasOraciones = async (req: Request, res: Response) => {
    try {
        const categoria  = CategoriaOraciones.find({Estado: "ACTIVO"},{"createdAt":0,"updatedAt":0});
        res.json(categoria);
    } catch (error: any) {
        res.json(null);
    }
}
// crear el resto del crud




