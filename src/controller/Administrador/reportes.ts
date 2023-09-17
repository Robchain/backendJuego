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
                'Estudiante.Identificacion': valorId, 'createdAt': {
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
                'Estudiante.Identificacion': valorId, 'createdAt': {
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
          objetosConAvance = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            },
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          });
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            }
          });
        } else if (!fechaInicio) {
          objetosConAvance = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            }
          });
        }
        if (objetosConAvance.length > 0) {
          let pos = -1
          const nuevoarray = objetosConAvance.map(obj => {
            for(let i =0;obj.documentos.length>0; i++ ){
              const { Integrantes, Avance, createdAt, updatedAt } = obj.documentos[i];
              if (Avance !== null) {
                for (let i = 0; i < Integrantes.length; i++) {
                  if (Integrantes[i].value === valorId) {
                    pos = i;
                    break;
                  }
                }
                let inicio = ((pos + 1) * 5) - 5;
                let nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos + 1) * 5);
                if (nuevoAn.length > 0) {
                  for (let i = 0; nuevoAn.length > i; i++) {//////aqui me quede revisar bien, si es necesario volverlo hacer 
                    objectosalida.push(modeladosalidaGeneralIndividualMultiIndiual(nuevoAn[i]))
                  }
                  return {
                    Avance: objectosalida,
                    createdAt,
                    updatedAt
                  }
                } else if (nuevoAn.length === 0) {
                  return {
                    Avance: [{ PalabraAEvaluar: 'No a jugado', PalabraASeleccionada: 'No a jugado'}],
                    createdAt,
                    updatedAt
                  }
                }
  
              } else if (Avance === null) {
                return {
                  Avance: [{ PalabraAEvaluar: 'No a jugado', PalabraASeleccionada: 'No a jugado'}],
                  createdAt,
                  updatedAt
                }
              }
            }
            
          })
          res.status(200).json(nuevoarray);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([{ Avance: [{ PalabraAEvaluar: 'No existe Juego', PalabraASeleccionada: 'No existe juego'}] }])
        }
        break;
      case 'Todos':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.aggregate([
            {
              '$match': {
                'Estudiante.Identificacion': valorId, 'createdAt': {
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
                    'date': '$createdAt'
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
                'Estudiante.Identificacion': valorId, 'createdAt': {
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
                    'date': '$createdAt'
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
          objetosConAvancetres = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            },
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          });
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
          objetosConAvancetres = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            }
          });
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
          objetosConAvancetres = await Grupos.find({
            "Integrantes": {
              $elemMatch: {
                value: valorId
              }
            }
          });
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
                "createdAt": {
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
                    'date': '$createdAt'
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
          objetosConAvance = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo, "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }, { Rompecabeza: 0 })
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo
          }, { Rompecabeza: 0 })
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo
          }, { Rompecabeza: 0 })
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push(modeladosalidaGeneralIndividualOracion(objetosConAvance[i]))
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await Grupos.find({
            "Curso": Curso, "Paralelo": Paralelo,
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }, { updatedAt: 0 });
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.find({
            "Curso": Curso, "Paralelo": Paralelo
          }, { updatedAt: 0 });
        } else if (!fechaInicio) {
          objetosConAvance = await Grupos.find({
            "Curso": Curso, "Paralelo": Paralelo
          }, { updatedAt: 0 });
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push(modeladosalidaGeneralIndividualMulti(objetosConAvance[i]))
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
                "createdAt": {
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
                    'date': '$createdAt'
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
          objetosConAvancedos = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo, "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }, { Rompecabeza: 0 })
          objetosConAvancetres = await Grupos.find({
            "Curso": Curso, "Paralelo": Paralelo,
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }, { updatedAt: 0 });
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
                    'date': '$createdAt'
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
          objetosConAvancedos = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo
          }, { Rompecabeza: 0 })
          objetosConAvancetres = await Grupos.find({ "Curso": Curso, "Paralelo": Paralelo }, { updatedAt: 0 });
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
                    'date': '$createdAt'
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
          objetosConAvancedos = await JugadoresConOraciones.find({
            "Estudiante.Curso": Curso, "Estudiante.Paralelo": Paralelo
          }, { Rompecabeza: 0 })
          objetosConAvancetres = await Grupos.find({ "Curso": Curso, "Paralelo": Paralelo }, { updatedAt: 0 });
        }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancedos.length > i; i++) {
            objectosalida2.push(modeladosalidaGeneralIndividualOracion(objetosConAvancedos[i]))
          }
          for (let i = 0; objetosConAvancetres.length > i; i++) {
            objectosalida3.push(modeladosalidaGeneralIndividualMulti(objetosConAvancetres[i]))
          }
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
                    'date': '$createdAt'
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
                  'date': '$createdAt'
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
                  'date': '$createdAt'
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
          objetosConAvance = await JugadoresConOraciones.find({
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          })
        } else if (fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.find();
        } else if (!fechaInicio) {
          objetosConAvance = await JugadoresConOraciones.find();
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push(modeladosalidaGeneralIndividualOracion(objetosConAvance[i]))
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await Grupos.find({
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          }, { updatedAt: 0 })
        } else if (fechaInicio) {
          objetosConAvance = await Grupos.find({}, { updatedAt: 0 })
        } else if (!fechaInicio) {
          objetosConAvance = await Grupos.find({}, { updatedAt: 0 })
        }
        if (objetosConAvance.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push(modeladosalidaGeneralIndividualMulti(objetosConAvance[i]))
          }
          res.status(200).json(objectosalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Todos':
        if (fechaInicio && fechaFin) {
          objetosConAvance = await JugadoresConVocabularios.find({
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          })
          objetosConAvancedos = await JugadoresConOraciones.find({
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          })
          objetosConAvancetres = await Grupos.find({
            "createdAt": {
              $gte: fechaInicio,
              $lte: fechaFin
            }
          });
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
                  'date': '$createdAt'
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
          objetosConAvancedos = await JugadoresConOraciones.find();
          objetosConAvancetres = await Grupos.find();
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
                  'date': '$createdAt'
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
          objetosConAvancedos = await JugadoresConOraciones.find();
          objetosConAvancetres = await Grupos.find();
        }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          for (let i = 0; objetosConAvance.length > i; i++) {
            objectosalida.push({
              _id: objetosConAvance[i]._id,
              documentos: modeladosalidaGeneralIndividualPorJugador(objetosConAvance[i].documentos)
            });
          }
          for (let i = 0; objetosConAvancedos.length > i; i++) {
            //     objectosalida2.push(modeladosalidaGeneralIndividualOracion(objetosConAvancedos[i]))
          }
          for (let i = 0; objetosConAvancetres.length > i; i++) {
            //  objectosalida3.push(modeladosalidaGeneralIndividualMulti(objetosConAvancetres[i]))
          }
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
  let objectosalida: any[] = []
  try {
    if (objetosConAvance.length === 0) {
      return [{ Avance: [{ PalabraAEvaluar: 'No existe juego', PalabraASeleccionada: 'No existe juego', Resultado: 'No existe juego' }] }]
    } else if (objetosConAvance.length > 0) {
      const nuevoarray = objetosConAvance.map(obj => {
        const { Integrantes, Avance, createdAt, updatedAt } = obj;
        if (Avance !== null) {
          for (let i = 0; i < Integrantes.length; i++) {
            if (Integrantes[i].value === id) {
              pos = i;
              break;
            }
          }
          let inicio = ((pos + 1) * 5) - 5;
          let nuevoAn = seleccionarObjetosPorIntervalo(Avance, inicio, (pos + 1) * 5);
          if (nuevoAn.length > 0) {
            for (let i = 0; nuevoAn.length > i; i++) {
              objectosalida.push(modeladosalidaGeneralIndividualMultiIndiual(nuevoAn[i]))
            }
            return {
              Avance: objectosalida,
              createdAt,
              updatedAt
            }
          } else if (nuevoAn.length === 0) {
            return {
              Avance: [{ PalabraAEvaluar: 'No a jugado', PalabraASeleccionada: 'No a jugado', Resultado: 'No a jugado' }],
              createdAt,
              updatedAt
            }
          }

        } else if (Avance === null) {
          return {
            Avance: [{ PalabraAEvaluar: 'No a jugado', PalabraASeleccionada: 'No a jugado', Resultado: 'No a jugado' }],
            createdAt,
            updatedAt
          }
        }
      })
      return nuevoarray;
    }
  } catch (error) {
    return [{ Avance: [{ PalabraAEvaluar: 'No existe juego', PalabraASeleccionada: 'No existe juego', Resultado: 'No existe juego' }] }]
  }

}



const modeladosalidaGeneralIndividualPorJugador = (input: any[]) => {
  let Correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let avance: any[] = [];
  if (input.length > 0) {
    for (let j = 0; input.length > j; j++) {
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
  let Avance:any[] =[]
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
    Avance = null;
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