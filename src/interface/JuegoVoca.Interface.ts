import { IRecursosVocabulario } from "../models/Administrador/RecursosVocabulario"
import { ICategoria } from '../models/Administrador/Categoria';
import { IPuzzle } from './Rompecabeza.Interface';
import { ICategory } from "./Categoria.interface";
import { IVocabulary } from './Vocabulario.Interface';

export interface IPieza {
    Respuesta:string;
    Rompecabeza:IPuzzle[];
    Categoria:ICategory[];
    Partidas:number;
    Assets:IVocabulary[];
}

