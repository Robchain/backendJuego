import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import MultiJugador, { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';


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
//aqui guarda en base, la relacion entre juegos y Equipo

export const GuardarRelacionEntreEquipoYJuegos =async () => {
    
    
    
    CreaRelacionEntreEquipoYJuegos();



 

    
}




 
export const  CreaRelacionEntreEquipoYJuegos = async ()=>{
    let juego1 = {}
    let juego2 = {}
    let juego3 = {}
    let juego4 = {}
    let juego5 = {}

    try {
      juego1 =  await  CreaciondePartidasIndividualesVocabulario();
      juego2 =  await  CreaciondePartidasIndividualesVocabulario();
      juego3 =  await  CreaciondePartidasIndividualesVocabulario();
      juego4 =  await  uniendoOracionesPorCategoria();
      juego5 =  await uniendoOracionesPorCategoria();
    

      let modeloFinal:any = {
        juego1,
        juego2,
        juego3,
        juego4,
        juego5,
      }
      return modeloFinal;

    } catch (error) {
     
        return error;
    }
}





export const MostrandoGruposConUsuarioInicial =(req:Request, res:Response)=>{
    try {
       


        res.json("mostrar");
    } catch (error) {
        res.json(error);
    }
}


