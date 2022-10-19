import {Request, Response} from 'express';
import { ICategory } from '../interface/Categoria.interface';
import { IVocabulary } from '../interface/Vocabulario.Interface';
import Vocabulario, {IRecursosVocabulario} from '../models/Administrador/RecursosVocabulario'
import { IPieza } from '../interface/JuegoVoca.Interface';
import RecursosRompecabeza, {IRompecabeza} from '../models/Administrador/RecursosRompecabeza';
import Categoria from '../models/Administrador/Categoria';
import { IPuzzle } from '../interface/Rompecabeza.Interface';

export const LlamadoTest =  async (req:Request, res:Response) => {
    try {
        let data:string= '';
        let partida:number=0;
        var i = 0;
        let opciones:IVocabulary[];
       
        
        let rompecabeza:IPuzzle[]
        let categoria:ICategory[]
       

        rompecabeza = await RecursosRompecabeza.aggregate<IPuzzle>([{'$sample':{size:1}}])
        rompecabeza.map(i=>{if(i.Pieza){
          partida = i.Pieza + 1
        }})
         
        categoria= await Categoria.aggregate<ICategory>([{'$sample':{size:1}}])
        categoria.map(i=>{if(i.NombreCategoria){
           data =  i.NombreCategoria.toString()
        }})


       opciones = await Vocabulario.aggregate<IVocabulary>([
        {
          '$match': {
            'Categoria': data
          }
        },
        {'$sample':{size:3}}
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

