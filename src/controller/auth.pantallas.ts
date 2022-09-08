import Pantalla,{IPantalla} from "../models/Pantalla";
import {Response, Request} from 'express';


export const personaPantalla = async (req:Request, res:Response) => {
    try {
        const pantallaU:IPantalla = new Pantalla({
            Nombre:'MenuJuego',
            Descripcion:'Este sera el menu donde se muestra los Juegos',
            Url:'/MenuJuego',
            Estado:'Activo',
            Perfil:'Estudiante'
        })
            const Guardar = pantallaU.save();
        res.json(Guardar);
    } catch (error) {
       res.json(error);
    }
    
}

