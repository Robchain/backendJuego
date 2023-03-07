import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import MultiJugador, { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { IAvanceInter, IAvenceArriba, IEquipoInterno, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface';
import EquipoConJuegos, { IEquipoConJuego } from '../../models/Administrador/EquipoConJuegos';
import EquipoBase, { IEquipo } from '../../models/Administrador/Equipo';

//creacion de partida
export const CrearModeloInicialSinJuegos = async (BaseMulti: IMultiJuga) => {
    let IdDeLaAsignacion: string;
    let Estado: string = "ACTIVO";
    try {
        IdDeLaAsignacion = BaseMulti.id;
        for (let i = 0; i < parseInt(BaseMulti.NumeroDeGrupos.value); i++) {
            let integrantes = null;
            if (i === 0) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo0
            } else if (i === 1) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo1;
            } else if (i === 2) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo2;
            } else if (i === 3) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo3;
            } else if (i === 4) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo4;
            } else if (i === 5) {
                integrantes = BaseMulti.IntegrantesPorGrupos.equipo5;
            }
            const GrupoInicialsinJuegos: IGrupoDeTrabajo = new Grupos({
                IdDeLaAsignacion: IdDeLaAsignacion,
                Equipo: null,
                Integrantes: integrantes,
                Juegos: null,
                Avance: null,
                FechaDeInicio: BaseMulti.Fecha[0],
                FechaDeFin: BaseMulti.Fecha[1],
                Estado:Estado
            })
            GrupoInicialsinJuegos.save()

        }
    } catch (error) {
return null;
    }
}
//aqui guarda en base, la relacion entre juegos y Equipo

export const GuardarRelacionEntreEquipoYJuegos = async (inputObject: IMultiJuga) => {
    let IdDeLaAsignacion: string;
    let fecha;
    let Estado: string = "ACTIVO";
    try {

        IdDeLaAsignacion = inputObject.id;
        inputObject
        fecha = inputObject.Fecha;
        inputObject.NombreDeEquipos.length;
        for (let i = 0; i < inputObject.NombreDeEquipos.length; i++) {
            let Juegos = [];
            let Avances = [];
            let idactual = inputObject.NombreDeEquipos[i].value;
            const data = await EquipoBase.find({ _id: idactual }, { "createdAt": 0, "updatedAt": 0 })
            for (let i = 0; i < parseInt(inputObject.NumeroDeIntegrantes.value); i++) {
                Juegos.push(await Los5Juegos());
                Avances.push(await creacionDeAvance());
            }
            const equipo: IEquipoConJuego = new EquipoConJuegos({
                IdDeLaAsignacion: IdDeLaAsignacion,
                Equipo: data[0],
                Juegos: Juegos,
                Avance: Avances,
                Fecha: fecha,
                Estado: Estado,
            })
            equipo.save()
        }
    } catch (error) {
        return null;
    }

}


export const Los5Juegos = async () => {
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    let modeloFinal: IPartidaMulti;
    try {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await CreaciondePartidasIndividualesVocabulario();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await uniendoOracionesPorCategoria();

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

const creacionDeAvance = async () => {
    try {
        let modelo:IAvanceInter = {
            PalabraCorrecta: "",
            PalabraSeleccionada: "",
            Resultado: "",
            Terminado: false
        };
        let modelofinal: IAvenceArriba
        let Juego1:IAvanceInter;
        let Juego2:IAvanceInter;
        let Juego3:IAvanceInter;
        let Juego4:IAvanceInter;
        let Juego5:IAvanceInter;
        let Terminado = false;
        Juego1 = modelo;
        Juego2 = modelo;
        Juego3 = modelo;
        Juego4 = modelo;
        Juego5 = modelo;
        modelofinal = { 
            Juego1, 
            Juego2, 
            Juego3, 
            Juego4, 
            Juego5, 
            Terminado };
        return modelofinal;
    }
    catch (error) {
        return `error al guardar el model de la partida${error}`
    }
}



export const MostrandoGruposConUsuarioInicial = (req: Request, res: Response) => {
    try {



        res.json("mostrar");
    } catch (error) {
        res.json(error);
    }
}


