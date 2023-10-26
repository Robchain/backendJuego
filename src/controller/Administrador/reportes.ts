import { Request, Response } from "express";
import Grupos from "../../models/Juego/Multijugador/Grupos";
import JugadoresConOraciones, { IJugadoresConOraciones } from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import JugadoresConVocabularios, { IJugadoresConVocabulario } from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { IAvenceArriba } from "../../interface/Multijugador/Grupos.Interface";
import { IReporteInterfaceEstudiante, IReporteInterfaceCursoParalelo, IReporteInterfaceJuego } from "../../interface/Reportes.inteface";
import { JuegoSimple } from "../../interface/ModeloPartida";




function seleccionarObjetosPorIntervalo(array: IAvenceArriba[], inicio: number, fin: number) {
  return array.slice(inicio, fin);
}


export const reporteGeneralPorEstudiante = async (req: Request, res: Response) => {
  try {
    const { Fecha, Pregunta, valorId } = req.body as IReporteInterfaceEstudiante;
    let fechaInicio = undefined;
    let fechaFin = undefined;
    let objetosConAvance: any[] = []
    let objectosalida: any[] = []
    let objectosalida2: any[] = []
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
    if (Array.isArray(Fecha) && Fecha.length > 0) {
      fechaInicio = new Date(Fecha[0]);
      fechaFin = new Date(Fecha[1]);
    } else if (Array.isArray(Fecha) && Fecha.length === 0) {
      fechaInicio = undefined;
    } else if (typeof Fecha === 'string') {
      fechaInicio = new Date(Fecha!);
    } else {
      fechaInicio = undefined;
    }
    switch (Pregunta) {
      case 'vocabulario':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId, 'updatedAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            },
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            })
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId, 'updatedAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);

        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvance[i].documentos)
            });
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await Grupos.aggregate([
            {
              //agregar el filtro de null
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                },
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (!fechaInicio) {
          //agregar el filtro de null
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        }
        if (objetosConAvance.length > 0) {
          let pos = -1
          let integrante = {};
          const nuevoarray = objetosConAvance.map(obj => {
            for (let i = 0; obj.documentos.length > 0; i++) {
              const { Integrantes, Avance, createdAt, updatedAt } = obj.documentos[i];
              if (Avance !== null) {
                for (let j = 0; j < Integrantes.length; j++) {
                  if (Integrantes[j].value === valorId) {
                    integrante = { value: Integrantes[j].value, label: Integrantes[j].label }
                    pos = j; // pasa saber la posicion del jugador dentro del equipo
                    break;
                  }
                }
                let inicio = ((pos + 1) * 5) - 5; //donde inicia, la busqueda del array de avance
                let nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos + 1) * 5 /*donde termina el array*/);
                if (nuevoAn.length > 0) {
                  for (let i = 0; nuevoAn.length > i; i++) {
                    objectosalida.push(modeladosalidaGeneralIndividualMultiIndiual(nuevoAn))
                  }
                  return {
                    documentos: {

                      Integrante: integrante,
                      Avance: objectosalida,
                      createdAt,
                      updatedAt
                    }
                  }
                } else if (nuevoAn.length === 0) {
                  return {
                    documentos: {
                      Integrante: integrante,
                      Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }],
                      createdAt,
                      updatedAt
                    }
                  }
                }

              } else if (Avance === null) {
                return {
                  documentos: {
                    Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }],
                    createdAt,
                    updatedAt
                  }
                }
              }
            }

          })
          res.status(200).json(nuevoarray);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([{ Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }], }])
        }
        break;
      case 'Todos':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId, 'updatedAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId, 'updatedAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              //agregar el filtro de null
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                },
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                'Integrantes': {
                  '$elemMatch': {
                    'value': valorId
                  }
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancedos.length > i; i++) {
            objectosalida2.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvance[i].documentos)
            })
          }
          res.status(200).json(objectosalida.concat(objectosalida2, multijugadorinter(objetosConAvancetres, valorId)));
        } else if (objetosConAvance.length === 0 && objetosConAvancedos.length === 0) {
          res.status(200).json([])
        }
        break;
      default:
        res.status(200).json([])
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json([]);
  }
}

// por curso-----------------------------------------------------------------------
export const reporteGeneralPorCurso = async (req: Request, res: Response) => {
  try {
    const { Fecha, Pregunta, Curso, Paralelo } = req.body as IReporteInterfaceCursoParalelo;
    let fechaInicio = undefined;
    let fechaFin = undefined;
    let objetosConAvance: any[] = []
    let objectosalida: any[] = [];
    let objectosalida2: any[] = [];
    let objectosalida3: any[] = [];
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
    if (Array.isArray(Fecha) && Fecha.length > 0) {
      fechaInicio = new Date(Fecha[0]);
      fechaFin = new Date(Fecha[1]);
    } else if (Array.isArray(Fecha) && Fecha.length === 0) {
      fechaInicio = undefined;
    } else if (typeof Fecha === 'string') {
      fechaInicio = new Date(Fecha!);
    } else {
      fechaInicio = undefined;
    }
    switch (Pregunta) {
      case 'vocabulario':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':

        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvance[i].documentos)
            });
          }

          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            },{
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                "Curso": Curso,
                "Paralelo": Paralelo,
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }

          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                "Curso": Curso,
                "Paralelo": Paralelo,
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }

          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            for (let j = 0; objetosConAvance[i].documentos.length > j; j++) {
              objectosalida.push({ documentos: modeladosalidaGeneralIndividualMulti(objetosConAvance[i].documentos[j]) })
            }
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Todos':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                "Curso": Curso,
                "Paralelo": Paralelo,
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }

          ]);

        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                "Curso": Curso,
                "Paralelo": Paralelo,
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }

          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                "Estudiante.Curso": Curso,
                "Estudiante.Paralelo": Paralelo,
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                "Curso": Curso,
                "Paralelo": Paralelo,
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }

          ]);
        }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancedos.length > i; i++) {
            objectosalida2.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancetres.length > i; i++) {
            for (let j = 0; objetosConAvancetres[i].documentos.length > j; j++) { 
             objectosalida3.push({documentos:modeladosalidaGeneralIndividualMulti(objetosConAvancetres[i].documentos[j])})
          }}
          res.status(200).json(objectosalida.concat(objectosalida2, objectosalida3));
        } else if (objetosConAvance.length === 0 && objetosConAvancedos.length === 0 && objetosConAvancetres.length === 0) {
          res.status(200).json([])
        }
        break;
      default:
        res.status(200).json([])
        break;
    }
  } catch (error) {
    res.status(500).json([]);
  }
}

//por juego
export const reporteGeneralPorJuego = async (req: Request, res: Response) => {
  try {
    const { Fecha, Pregunta } = req.body as IReporteInterfaceJuego;
    let fechaInicio = undefined;
    let fechaFin = undefined;
    let objectosalida: any[] = [];
    let objectosalida2: any[] = [];
    let objectosalida3: any[] = [];
    let objetosConAvance: any = []
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
    if (Array.isArray(Fecha) && Fecha.length > 0) {
      fechaInicio = new Date(Fecha[0]);
      fechaFin = new Date(Fecha[1]);
    } else if (Array.isArray(Fecha) && Fecha.length === 0) {
      fechaInicio = undefined;
    } else if (typeof Fecha === 'string') {
      fechaInicio = new Date(Fecha!);
    } else {
      fechaInicio = undefined;
    }
    switch (Pregunta) {
      case 'vocabulario':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'createdAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'createdAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvance[i].documentos)
            });
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$match': {
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            },
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (!fechaInicio) {
          objetosConAvance = await Grupos.aggregate([
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            for (let j = 0; objetosConAvance[i].documentos.length > j; j++) {
            objectosalida.push({documentos:modeladosalidaGeneralIndividualMulti(objetosConAvance[i].documentos[j])})
          }}
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Todos':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'createdAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([
            {
              '$match': {
                'createdAt': {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            }, {
              '$match': {
                'Avance': {
                  '$ne': null
                }
              }
            }, {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                  'Identificacion': '$Estudiante.Identificacion'
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$match': {
                "updatedAt": {
                  $gte: fechaInicio,
                  $lte: fechaFin
                }
              }
            },
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ])
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
          objetosConAvancedos = await JugadoresConOraciones.aggregate([{
            '$match': {
              'Avance': {
                '$ne': null
              }
            }
          },
          {
            '$addFields': {
              'createdAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'createdAtDay': '$createdAtDay',
                'Identificacion': '$Estudiante.Identificacion'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
          ]);
          objetosConAvancetres = await Grupos.aggregate([
            {
              '$addFields': {
                'createdAtDay': {
                  '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$updatedAt'
                  }
                }
              }
            }, {
              '$group': {
                '_id': {
                  'createdAtDay': '$createdAtDay',
                },
                'documentos': {
                  '$push': '$$ROOT'
                }
              }
            }
          ]);
        }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancedos.length > i; i++) {
            objectosalida2.push({
              _id: objetosConAvancedos[i]._id,
              documentos: modeladosalidaGeneralIndividualOracion(objetosConAvancedos[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancetres.length > i; i++) {
            for (let j = 0; objetosConAvancetres[i].documentos.length > j; j++) {
             objectosalida3.push({documentos:modeladosalidaGeneralIndividualMulti(objetosConAvancetres[i].documentos[j])})
              }  }
          res.status(200).json(objectosalida.concat(objectosalida2, objectosalida3));
        } else if (objetosConAvance.length === 0 && objetosConAvancedos.length === 0 && objetosConAvancetres.length === 0) {
          res.status(200).json([])
        }
        break;
      default:
        res.status(200).json([])
        break;
    }
  } catch (error) {
    res.status(500).json([]);
  }
}



const multijugadorinter = (objetosConAvance: any[], id: String) => {
  let pos = -1
  let integrante = {};
  let objectosalida: any[] = []
  try {
    if (objetosConAvance.length === 0) {
      return [{ Avance: [{ PalabraAEvaluar: 'No existe juego', PalabraASeleccionada: 'No existe juego', Resultado: 'No existe juego' }] }]
    } else if (objetosConAvance.length > 0) {
      const nuevoarray = objetosConAvance.map(obj => {
        for (let i = 0; obj.documentos.length > 0; i++) {
          const { Integrantes, Avance, createdAt, updatedAt } = obj.documentos[i];
          if (Avance !== null) {
            for (let j = 0; j < Integrantes.length; j++) {
              if (Integrantes[j].value === id) {
                integrante = { value: Integrantes[j].value, label: Integrantes[j].label };
                pos = j;
                break;
              }
            }
            let inicio = ((pos + 1) * 5) - 5;
            let nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos + 1) * 5);
            if (nuevoAn.length > 0) {
              for (let i = 0; nuevoAn.length > i; i++) {
                objectosalida.push(modeladosalidaGeneralIndividualMultiIndiual(nuevoAn))
              }
              return {
                documentos: {
                  Integrante: integrante,
                  Avance: objectosalida,
                  createdAt,
                  updatedAt
                }
              }
            } else if (nuevoAn.length === 0) {
              return {
                documentos: {
                  Integrante: integrante,
                  Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }],
                  createdAt,
                  updatedAt
                }
              }
            }

          } else if (Avance === null) {
            return {
              documentos: {

                Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }],
                createdAt,
                updatedAt
              }
            }
          }
        }
      })
      return nuevoarray;
    }

  } catch (error) {
    return [{ Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }], }]
  }

}



const modeladosalidaGeneralIndividualPorJugador = (input: any[]) => {
  let Correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let avance: any[] = [];
  if (input.length > 0) {
    for (let j = 0; input.length > j; j++) {
      Correcto =[]
      Incorrecto=[]
      if (input[j].Avance !== null) {
        if (input[j].Avance.length >= 0) {
          for (let i = 0; input[j].Avance.length > i; i++) {
            if (input[j].Avance[i].Resultado === "CORRECTO") {
              Correcto.push(input[j].Avance[i].PalabraASeleccionada);
            } else if (input[j].Avance[i].Resultado === "INCORRECTO") {
              Incorrecto.push({ PalabraAEvaluar: input[j].Avance[i].PalabraAEvaluar, PalabraASeleccionada: input[j].Avance[i].PalabraASeleccionada })
            }

          }
          avance.push({ Correcto: Correcto, Incorrecto: Incorrecto });
        }

      } else if (input[j].Avance === null) {
        avance.push({ Correcto: null, Incorrecto: null });
      }
    }
  }

  return {
    Estudiante: input[0].Estudiante,
    Rompecabeza: input[0].Rompecabeza,
    Avance: avance,
    Terminado: input[0].Terminado,
    createdAt: input[0].createdAt,
    updatedAt: input[0].updatedAt
  }
}
const modeladosalidaGeneralIndividualOracion = (input: any[]) => {
  let Correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let avance: any[] = []
  if (input.length > 0) {
    for (let j = 0; input.length > j; j++) {
      Correcto =[]
      Incorrecto=[]
      if (input[j].Avance !== null) {
        if (input[j].Avance.length >= 0) {
          for (let i = 0; input[j].Avance.length > i; i++) {
            if (input[j].Avance[i].Resultado === "CORRECTO") {
              Correcto.push(input[0].Avance[i].OracionCorrecta);
            } else if (input[0].Avance[i].Resultado === "INCORRECTO") {
              Incorrecto.push({ PalabraAEvaluar: input[j].Avance[i].PalabraAEvaluar, PalabraASeleccionada: input[j].Avance[i].PalabraASeleccionada })
            }
          }
          avance.push({ Correcto: Correcto, Incorrecto: Incorrecto })
        }
      } else if (input[j].Avance === null) {
        avance.push({ Correcto: null, Incorrecto: null });
      }
    }
  }
  return {
    Estudiante: input[0].Estudiante,
    Rompecabeza: input[0].Rompecabeza,
    Avance: avance,
    Terminado: input[0].Terminado,
    createdAt: input[0].createdAt,
    updatedAt: input[0].updatedAt
  }
}

const modeladosalidaGeneralIndividualMultiIndiual = (input: any) => {
  let correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let Avance: any[] = []
  if (input !== null) {
    if (input.length >= 0) {
      for (let i = 0; input.length > i; i++) {
        if (input[i].Resultado === "CORRECTO") {
          if (!input[i].OracionCorrecta) {
            correcto.push(input[i].PalabraASeleccionada);
          } else {
            correcto.push(input[i].OracionCorrecta);
          }
        } else if (input.Resultado === "INCORRECTO") {
          Incorrecto.push({ PalabraAEvaluar: input[i].PalabraAEvaluar, PalabraASeleccionada: input[i].PalabraASeleccionada })
        }
      }
      Avance.push({ Correcto: correcto, Incorrecto: Incorrecto });
    }
  } else {
    Avance.push({ Correcto: null, Incorrecto: null });
  }
  return Avance
}

const modeladosalidaGeneralIndividualMulti = (input: any) => {
  let correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let Avance = null
  if (input.Avance !== null) {
    if (input.Avance.length >= 0) {
      for (let i = 0; input.Avance.length > i; i++) {
        if (input.Avance[i].Resultado === "CORRECTO") {
          if (!input.Avance[i].OracionCorrecta) {
            correcto.push(input.Avance[i].PalabraASeleccionada);
          } else {
            correcto.push(input.Avance[i].OracionCorrecta);
          }
        } else if (input.Avance[i].Resultado === "INCORRECTO") {
          Incorrecto.push({ PalabraAEvaluar: input.Avance[i].PalabraAEvaluar, PalabraASeleccionada: input.Avance[i].PalabraASeleccionada })
        }
      }
      Avance = { Correcto: correcto, Incorrecto: Incorrecto }
    }
  } else {
    Avance=[{Incorrecto:[{ PalabraAEvaluar: 'No han jugado colaborativo', PalabraASeleccionada: 'No han jugado colaborativo' }]}] ;
  }
  return {
    Equipo: input.Equipo,
    Integrantes: input.Integrantes,
    Avance: Avance,
    Terminado: input.Terminado,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt
  }
}