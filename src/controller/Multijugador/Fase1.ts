import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import MultiJugador, { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface';
import EquipoConJuegos, { IEquipoConJuego } from '../../models/Administrador/EquipoConJuegos';
import EquipoBase, { IEquipo } from '../../models/Administrador/Equipo';

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

export const GuardarRelacionEntreEquipoYJuegos =async (inputObject:IMultiJuga) => {
    let IdDeLaAsignacion:string ;
    let Equipo:IEquipo;
    
    let fecha;
    let Estado:string = "ACTIVO";
try {
    
    IdDeLaAsignacion = inputObject.id;
        inputObject
        fecha = inputObject.Fecha;
     inputObject.NombreDeEquipos.length;
     for (let i = 0; i < inputObject.NombreDeEquipos.length; i++){
        let Juegos=[];
        let idactual = inputObject.NombreDeEquipos[i].value;
       const data =  await EquipoBase.find({_id:idactual},{"createdAt":0,"updatedAt":0})
        for(let i = 0; i < parseInt(inputObject.NumeroDeIntegrantes.value); i++){
      Juegos.push(await Los5Juegos());   
        }
        const  equipo:IEquipoConJuego  = new  EquipoConJuegos({
            IdDeLaAsignacion:IdDeLaAsignacion,
        Equipo:data[0],
        Juegos:Juegos,
            Fecha:fecha,
            Estado:Estado,
        })
        equipo.save()
     }
} catch (error) {
    return null;
}
    
}




 
export const  Los5Juegos = async  ()=>{
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    let modeloFinal:IPartidaMulti ;
    try {
      Juego1 =  await  CreaciondePartidasIndividualesVocabulario();
      Juego2 =  await  CreaciondePartidasIndividualesVocabulario();
      Juego3 =  await  CreaciondePartidasIndividualesVocabulario();
      Juego4 =  await  uniendoOracionesPorCategoria();
      Juego5 =  await uniendoOracionesPorCategoria();
    
      modeloFinal = {
        Juego1,
        Juego2,
        Juego3,
        Juego4,
        Juego5,
      }
      return modeloFinal;

    } catch (error) {
        
        return null;
    }
}





export const MostrandoGruposConUsuarioInicial =(req:Request, res:Response)=>{
    try {
       


        res.json("mostrar");
    } catch (error) {
        res.json(error);
    }
}


