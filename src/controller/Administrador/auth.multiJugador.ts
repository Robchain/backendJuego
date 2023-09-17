import { Request, Response } from 'express'
import MultiJugador, { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { GuardarRelacionEntreEquipoYJuegos, CrearModeloInicialSinJuegos } from '../Multijugador/Fase1';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import Persona from '../../models/Administrador/Persona';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';




export const CrearEvento = async (req: Request, res: Response) => {
  try {
    const { picker, TipoDeJuego, Curso, Paralelo, Segundo, NumeroDeIntegrantes, NumeroDeGrupos, NombreDeEquipo } = req.body;
    let fechaInicio = undefined;
    let fechaFin = undefined;
    const fechaActual = new Date();
    if (Array.isArray(picker) && picker.length > 0) {
      fechaInicio = new Date(picker[0]);
      fechaFin = new Date(picker[1]);

      const grupo: IGrupoDeTrabajo[] = await Grupos.find({ Curso: Curso, Paralelo: Paralelo });
      if (grupo.length !== 0) {
        for (let i = 0; grupo.length > 0; i++) {
          let fechafinjuegos = new Date(grupo[i].FechaDeFin);
          if (fechaInicio <= fechafinjuegos) {
            res.status(500).json({ "titulo": "Error", "respuesta": `La fecha inicial del juego está dentro del rango de otra actividad`, "type": "error" });
            break;
          }
        }
        const multiJugador: IMultiJuga = new MultiJugador({
          NombreDeEquipos: NombreDeEquipo,
          NumeroDeGrupos: NumeroDeGrupos,
          NumeroDeIntegrantes: NumeroDeIntegrantes,
          IntegrantesPorGrupos: Segundo,
          TipoDeJuego: TipoDeJuego,
          Curso: Curso,
          Paralelo: Paralelo,
          Fecha: picker,
          Estado: "ACTIVO"
        })
        const guardarmulti = await multiJugador.save();
        CrearModeloInicialSinJuegos(guardarmulti);
        //crear EquipoConJuego y lo guarda
        GuardarRelacionEntreEquipoYJuegos(guardarmulti);
        //crear el modelo base y lo guarda

        res.status(200).json({ "titulo": "Excelente", "respuesta": 'Colaborativo creado con éxito', "type": "success" })
      } else if (grupo.length === 0) {
        const multiJugador: IMultiJuga = new MultiJugador({
          NombreDeEquipos: NombreDeEquipo,
          NumeroDeGrupos: NumeroDeGrupos,
          NumeroDeIntegrantes: NumeroDeIntegrantes,
          IntegrantesPorGrupos: Segundo,
          TipoDeJuego: TipoDeJuego,
          Curso: Curso,
          Paralelo: Paralelo,
          Fecha: picker,
          Estado: "ACTIVO"
        })
        const guardarmulti = await multiJugador.save();
        CrearModeloInicialSinJuegos(guardarmulti);
        //crear EquipoConJuego y lo guarda
        GuardarRelacionEntreEquipoYJuegos(guardarmulti);
        //crear el modelo base y lo guarda

        res.status(200).json({ "titulo": "Excelente", "respuesta": 'Colaborativo creado con éxito', "type": "success" })
      }
    }else{
      res.status(500).json({ "titulo": "Error", "respuesta": `Error en las fechas`, "type": "error" });
    }
  } catch (error) {
    res.status(500).json({ "titulo": "Error", "respuesta": `No se pudo crear el colaborativo, reinicie la página y vuelva a intentarlo`, "type": "error" });
  }
}


export const BuscarPorCursoYParaleloMultijugador = async (req: Request, res: Response) => {
  try {
    const user = await Persona.find({ Curso: req.body.Curso, Paralelo: req.body.Paralelo }, { password: 0 });
    if (user.length === 0) {
      res.status(200).json([{ value: "NO HAY ESTUDIANTES", label: "NO HAY ESTUDIANTES" }]);
    } else {
      let respuesta = user.map((item) => ({
        value: item.Identificacion,
        label: `${item.Nombre} ${item.Apellido}`
      }));
      res.status(200).json(respuesta);
    }
  } catch (error) {
    res.status(500).json([{ value: "Error", label: "error" }]);
  }
}

export const PEvento = async (req: Request, res: Response) => {
  try {
    const data = await MultiJugador.find({}, { "createdAt": 0, "updatedAt": 0 })
    res.status(200).json(data)
  } catch (error) {
    res.json({ "titulo": "Error", "respuesta": `No se pudo encontrar`, "type": "error" });
  }
}


export const CreaJuegoMultijuador = async (req: Request, res: Response) => {
  try {
    let piezas = req.params.id;
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    if (parseInt(piezas) !== 1 && parseInt(piezas) !== 2 && parseInt(piezas) !== 3) {
      res.status(500).json("Numero no valido")
    }
    if (parseInt(piezas) === 1) {
      Juego1 = await CreaciondePartidasIndividualesVocabulario();
      Juego2 = await CreaciondePartidasIndividualesVocabulario();
      Juego3 = await CreaciondePartidasIndividualesVocabulario();
      Juego4 = await CreaciondePartidasIndividualesVocabulario();
      Juego5 = await CreaciondePartidasIndividualesVocabulario();
      res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
    } else if (parseInt(piezas) === 2) {
      Juego1 = await uniendoOracionesPorCategoria();
      Juego2 = await uniendoOracionesPorCategoria();
      Juego3 = await uniendoOracionesPorCategoria();
      Juego4 = await uniendoOracionesPorCategoria();
      Juego5 = await uniendoOracionesPorCategoria();
      res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
    } else if (parseInt(piezas) === 3) {
      Juego1 = await CreaciondePartidasIndividualesVocabulario();
      Juego2 = await uniendoOracionesPorCategoria();
      Juego3 = await CreaciondePartidasIndividualesVocabulario();
      Juego4 = await uniendoOracionesPorCategoria();
      Juego5 = await uniendoOracionesPorCategoria();
      res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
    }

  } catch (error) {
    res.json(error)
  }
}

export const CrearJuegoVocabularioIndividual = async (req: Request, res: Response) => {
  try {
    let piezas = req.params.id;
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    let Juego6 = {}
    let Juego7 = {}
    if (parseInt(piezas) !== 4 && parseInt(piezas) !== 6) {
      res.status(500).json("Numero no valido")
    }
    if (parseInt(piezas) === 4) {
      Juego1 = await CreaciondePartidasIndividualesVocabulario();
      Juego2 = await CreaciondePartidasIndividualesVocabulario();
      Juego3 = await CreaciondePartidasIndividualesVocabulario();
      Juego4 = await CreaciondePartidasIndividualesVocabulario();
      Juego5 = await CreaciondePartidasIndividualesVocabulario();
      res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
    } else if (parseInt(piezas) === 6) {
      Juego1 = await CreaciondePartidasIndividualesVocabulario();
      Juego2 = await CreaciondePartidasIndividualesVocabulario();
      Juego3 = await CreaciondePartidasIndividualesVocabulario();
      Juego4 = await CreaciondePartidasIndividualesVocabulario();
      Juego5 = await CreaciondePartidasIndividualesVocabulario();
      Juego6 = await CreaciondePartidasIndividualesVocabulario();
      Juego7 = await CreaciondePartidasIndividualesVocabulario();
      res.json({ Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7 })
    }
  } catch (error) {
    res.json(error)
  }
}