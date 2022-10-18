import { IRecursosVocabulario } from "../models/Administrador/RecursosVocabulario"
import { IRompecabeza } from '../models/Administrador/RecursosRompecabeza';
import { ICategoria } from '../models/Administrador/Categoria';
export interface IPieza {
    Respuesta:string;
    Rompecabeza:IRompecabeza[];
    Categoria:ICategoria[];
    Partidas?:Partida;
}



export interface Partida{
    Juego:number;
    Opciones:IRecursosVocabulario[];
    Correcta:IRecursosVocabulario[];

}

