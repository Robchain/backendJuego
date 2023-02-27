import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import MultiJugador, { IMultiJuga } from '../../models/Administrador/MultiJugador';

//creacion de partida
export const CrearModeloInicialSinJuegos =(BaseMulti:IMultiJuga)=>{
    try {

           let Jugador1;
           let Jugador2;
           let Jugador3;
           let Jugador4;
           let Jugador5;
           let Jugador6;           
           
        const GrupoInicialsinJuegos: IGrupoDeTrabajo = new Grupos({
            Equipo:null,
            Integrantes:null,
            Juegos:null,
            Avance:null,
            FechaDeInicio:null,
            FechaDeFin:null,
        })
        GrupoInicialsinJuegos.save()



    } catch (error) {
       
    }
}


export const MostrandoGruposConUsuarioInicial =(req:Request, res:Response)=>{
    try {
       


        res.json("mostrar");
    } catch (error) {
        res.json(error);
    }
}
