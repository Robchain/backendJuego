import {Request, Response} from 'express';
import { ICategory } from '../interface/Categoria.interface';
import { IVocabulary } from '../interface/Vocabulario.Interface';
import Vocabulario, {IRecursosVocabulario} from '../models/Administrador/RecursosVocabulario'
import { IPieza } from '../interface/JuegoVoca.Interface';
import RecursosRompecabeza, {IRompecabeza} from '../models/Administrador/RecursosRompecabeza';
import Categoria from '../models/Administrador/Categoria';

export const LlamadoTest =async (req:Request, res:Response) => {
    
    try {
        let partida:number= 0
        const rompecabeza= await RecursosRompecabeza.aggregate([{'$sample':{size:1}}])
        const categoria = await Categoria.aggregate([{'$sample':{size:1}}])
        const opciones = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria': 'PLANTA'
              }
            },
            {'$sample':{size:2}}
          ]);
          const correcta = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria': 'PLANTA'
              }
            },
            {'$sample':{size:1}}
          ]);
        const resa:IPieza = {   
            Respuesta:'Correcta',
            Rompecabeza:rompecabeza,
            Categoria:categoria,
            Partidas:partida,
            Assets:opciones
        }
        res.json(resa);
    } catch (error) {
        res.json(error);
    }
}
//adasdasdasd

export const RecibirJson = async (req:Request, res:Response) => {
  
    try {
      const data = {Primero:req.body.primero,
                     Segundo:req.body.segundo,
                    Tercero:req.body.tercero,
                    Cuarto:req.body.cuarto }
      res.json(data)
      console.log(data)
    } catch (error) {
      res.json(error)
    }
}