import { Request, Response } from "express";
import { IReporteNuevoCursoParalelo } from "../../interface/Reportes.inteface";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { modeladosalidaGeneralIndividualMulti, modeladosalidaGeneralIndividualOracion, modeladosalidaGeneralIndividualPorJugador } from "./reportes";
import JugadoresConOraciones from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import Grupos from "../../models/Juego/Multijugador/Grupos";

import { Salidavocabylario } from "../../interface/Reportes.interfaces";



export const vocabulario =()=>{


    
}