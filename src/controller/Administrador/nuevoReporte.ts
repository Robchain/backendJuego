import { Request, Response } from "express";



export const reportePrimero = async (req: Request, res: Response) => {

const {Curso, Paralelo, Juego,FechaInicio, FechaFin,isChecked} = req.body;

    
res.json({Curso, Paralelo, Juego,FechaInicio, FechaFin,isChecked});





    
}