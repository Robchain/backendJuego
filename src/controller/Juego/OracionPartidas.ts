import PartidaOracion, {IPartidaOracion} from "../../models/Juego/Oracion/PartidaOracion";
import { Request, Response } from "express"

export const uniendoPartida= (req:Request, res:Response)=>{

    const data = PartidaOracion.aggregate([])


    

    
    res.json(data);
}
