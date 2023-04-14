import { Request, Response } from "express";
import Grupos from "../../models/Juego/Multijugador/Grupos";
import JugadoresConOraciones from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import JugadoresConVocabularios, { IJugadoresConVocabulario } from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { IModeloPartida } from "../../interface/ModeloPartida";

export const ReporteVocabulario = async (req: Request, res: Response) => {
  try {
    const objetosConAvance = await JugadoresConVocabularios.find({ "Estudiante.Usuario": req.body.Usuario },{ Partida: 0 })
    //
    let nuevoArray:any = [];
    // Recorre cada objeto del array original
    objetosConAvance.forEach(objeto => {
      // Accede al campo "Avance" de cada objeto
      const avance:any = objeto.Avance;
      // Itera a través de los objetos en "Avance"
      for (let key in avance) {
        // Agrega cada objeto a un nuevo array
        nuevoArray.push(avance[key]);
      }
    });
      //
    res.json(nuevoArray);
  } catch (error) {
res.status(500).json(null);
  }
}
export const ReporteOracion = async (req: Request, res: Response) => {
    try {
      const objetosConAvance = await JugadoresConOraciones.find({ "Estudiante._id": req.body._id },{ Partida: 0 })
      let nuevoArray:any = [];

      // Recorre cada objeto del array original
      objetosConAvance.forEach(objeto => {
        // Accede al campo "Avance" de cada objeto
        const avance:any = objeto.Avance;
        // Itera a través de los objetos en "Avance"
        for (let key in avance) {
          // Agrega cada objeto a un nuevo array
          nuevoArray.push(avance[key]);
        }
      });
        //
      res.json(nuevoArray);
    } catch (error) {
  res.status(500).json(null);
    }
  }
  export const ReporteMultiJugador = async (req: Request, res: Response) => {
    try {
      const objetosConAvance = await Grupos.find({ "Estudiante._id": req.body._id },{ Juegos: 0 })
      let nuevoArray:any = [];

      // Recorre cada objeto del array original
      objetosConAvance.forEach(objeto => {
        // Accede al campo "Avance" de cada objeto
        const avance:any = objeto.Avance;
        // Itera a través de los objetos en "Avance"
        for (let key in avance) {
          // Agrega cada objeto a un nuevo array
          nuevoArray.push(avance[key]);
        }
      });
        //
      res.json(nuevoArray);
    } catch (error) {
  res.status(500).json(null);
    }
  }
