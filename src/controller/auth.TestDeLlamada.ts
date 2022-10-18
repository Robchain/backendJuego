import {Request, Response} from 'express';
import { ICategory } from '../interface/Categoria.interface';
import Vocabulario, {IRecursosVocabulario} from '../models/Administrador/RecursosVocabulario'
import { IPieza } from '../interface/JuegoVoca.Interface';
import RecursosRompecabeza, {IRompecabeza} from '../models/Administrador/RecursosRompecabeza';
import Categoria from '../models/Administrador/Categoria';

export const LlamadoTest =async (req:Request, res:Response) => {
    try {
      let data;
      
        let partida:number= 0
        const rompecabeza= await RecursosRompecabeza.aggregate([{'$sample':{size:1}}])
        rompecabeza.map(i=>{if(i.Pieza){
          partida = parseInt(i.Pieza) + 1
        }})
        const categoria = await Categoria.aggregate([{'$sample':{size:1}}])
        categoria.map(i=>{if(i.NombreCategoria){
           data =  i.NombreCategoria.toString()
        }})
        const opciones = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria': data
              }
            },
            {'$sample':{size:2}}
          ]);
          const correcta = await Vocabulario.aggregate([
            {
              '$match': {
                'Categoria':data
              }
            },
            {'$sample':{size:1}}
          ]);
        const resa:IPieza = {   
            Respuesta:'Correcta',
            Rompecabeza:rompecabeza,
            Categoria:categoria,
            Partidas:{
            Juego:partida,
            Opciones:opciones,
            Correcta:correcta
            }
        }//corregir esto, terminarlo hoy
        res.json(resa);
    } catch (error) {
        res.json(error);
    }
}


