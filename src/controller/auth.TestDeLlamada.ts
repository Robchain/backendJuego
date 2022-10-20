import {Request, Response} from 'express';
import { ICategory } from '../interface/Categoria.interface';
import Vocabulario, {IRecursosVocabulario} from '../models/Administrador/RecursosVocabulario'
import { IPieza } from '../interface/JuegoVoca.Interface';
import RecursosRompecabeza, {IRompecabeza} from '../models/Administrador/RecursosRompecabeza';
import Categoria,{ICategoria} from '../models/Administrador/Categoria';

export const LlamadoTest =async (req:Request, res:Response) => {
    
    try {
        let datas:any
        let partida:number= 0
        const rompecabeza= await RecursosRompecabeza.aggregate([{'$sample':{size:1}}])
       const categoria:any = await Categoria.aggregate([{'$sample':{size:1}}])
        datas = categoria.NombreCategoria.toString() 
        const opciones = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria':datas
              }
            },
            {'$sample':{size:2}}
          ]);
          const correcta = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria':datas
              }
            },
            {'$sample':{size:1}}
          ]);
        const resa:IPieza = {   
            Respuesta:'Correcta',
            Rompecabeza:rompecabeza,
            Categoria:categoria,
            Partida:partida,
            Opciones:opciones,
            Correcta:correcta
        }
        res.json(resa);
    } catch (error) {
        res.json(error);
    }
}

