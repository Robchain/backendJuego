import { Request, Response } from "express";
import Grupos from "../../models/Juego/Multijugador/Grupos";
import JugadoresConOraciones, { IJugadoresConOraciones } from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import JugadoresConVocabularios, { IJugadoresConVocabulario } from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
import { IAvenceArriba } from "../../interface/Multijugador/Grupos.Interface";
import { IReporteInterfaceEstudiante, IReporteInterfaceCursoParalelo, IReporteInterfaceJuego, AvanceCoolaborativo, Documento, AvanceIndividual, Estudiante } from "../../interface/Reportes.inteface";
import { JuegoSimple } from "../../interface/ModeloPartida";
import { DocumentosColabo } from "../../interface/ReporteDos.interface";
import { isObject } from "@typegoose/typegoose/lib/internal/utils";
import { groupAndSortByDate } from "./FuncionHelpers";
import { pdfColaborativoEstudiante, pdfOracionEstudiante, pdfTodosEstudiante, pdfVocabularioEstudiante } from "../../pdf/pdfmakes";
import { OutputTodosJugador, Salida, SalidaDatum } from "../../interface/ouputTodosJugadorReporte.interface";
import { pdfJuegoColaborativo, pdfJuegoOracion, pdfJuegoTodos, pdfJuegoVocabulario } from "../../pdf/pdfmakesJuego";
import { CursoElement, Datum } from "../../interface/juegoReporteVocabulario.interface";




function seleccionarObjetosPorIntervalo(array: IAvenceArriba[], inicio: number, fin: number) {
  return array.slice(inicio, fin);
}


export const reporteGeneralPorEstudiante = async (req: Request, res: Response) => {
  try {
    const { FechaInicio, FechaFin, Pregunta, valorId, datosPer } = req.body as IReporteInterfaceEstudiante;
    let fechaInicio = new Date(FechaInicio);
    let fechaFin = new Date(FechaFin);
    let objetosConAvance: any[] = []
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
    
    switch (Pregunta) {
      case 'vocabulario':
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
            '$addFields':{
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group':{
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ]);
        // if (fechaInicio && fechaFin) {
          
        // } else if (fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields':{
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':{
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // } else if (!fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields':{
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':{
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // }

        if (objetosConAvance.length > 0) {
          const nuevoarray = objetosConAvance.map(obj=>{
            const{updatedAtDay, } = obj._id 
              const data =  obj.documentos.map((doc:Documento)=>{
                const{Estudiante, Avance, Rompecabeza, Terminado} =doc;
                let Correcto:any[] = []
                let Incorrecto:any[] = []
                let NoContesto:any[] = []
                 Avance.length > 0 ? Avance.map(ava=>{
                  if(ava.Resultado === 'CORRECTO'){  
                      Correcto.push(ava.PalabraASeleccionada)
                  }
                if(ava.Resultado === 'INCORRECTO'){
                  Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                  }
                  if(ava.Resultado === "NO CONTESTO"){
                    NoContesto.push(ava.PalabraAEvaluar)
                  }
                
                }) : null
                return{
                  Estudiante,
                  Rompecabeza,
                  Avance:{Correcto,Incorrecto,NoContesto},
                  Terminado
                }
              })
              
            return {
              updatedAtDay,
              data,
              tipo:'vocabulario',
              nombre:datosPer.label,
              cedula:datosPer.value
            }
          })

          const datapdf = await pdfVocabularioEstudiante(nuevoarray);
          
          res.status(200).json({data:nuevoarray, pdf:datapdf});
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group':  {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort':  {
              '_id.updatedAtDay': -1
            }
          }
        ]);
        // if (fechaInicio && fechaFin) {
          

        // } else if (fechaInicio) {
        //   objetosConAvance = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':  {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // } else if (!fechaInicio) {
        //   objetosConAvance = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':  {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // }
        if (objetosConAvance.length > 0) {
          const nuevoarray = objetosConAvance.map(obj=>{
            const{updatedAtDay, } = obj._id 
              const data =  obj.documentos.map((doc:Documento)=>{
                const{Estudiante, Avance, Rompecabeza, Terminado} =doc;
                let Correcto:any[] = []
                let Incorrecto:any[] = []
                let NoContesto:any[] = []
                 Avance.map(ava=>{
                  if(ava.Resultado === 'CORRECTO'){  
                      Correcto.push(ava.OracionCorrecta)
                  }
                if(ava.Resultado === 'INCORRECTO'){
                  Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                  }
                  if(ava.Resultado === "NO CONTESTO"){
                    NoContesto.push(ava.PalabraAEvaluar)
                  }
                })
                return{
                  Estudiante,
                  Rompecabeza,
                  Avance:{Correcto,Incorrecto,NoContesto},
                  Terminado
                }
              })
            return {
              updatedAtDay,
              data,
               tipo:'oracion',
               nombre:datosPer.label,
              cedula:datosPer.value
            }
          })

          const datapdf = await pdfOracionEstudiante(nuevoarray);
          res.status(200).json({data:nuevoarray, pdf:datapdf});
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort':  {
              '_id.updatedAtDay': -1
            }
          }
        ])

        // if (fechaInicio && fechaFin) {
          
        // } else if (fechaInicio) {
        //   objetosConAvance = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         'Integrantes': {
        //           '$elemMatch': {
        //             'value': valorId
        //           }
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ])
        // } else if (!fechaInicio) {
        //   //agregar el filtro de null
        //   objetosConAvance = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         'Integrantes': {
        //           '$elemMatch': {
        //             'value': valorId
        //           }
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ])
        // }
        if (objetosConAvance.length > 0) {
          const nuevoarray = objetosConAvance.map(obj => {
                   const {Integrantes,Equipo, Avance, createdAt, updatedAt,updatedAtDay, FechaDeFin, FechaDeInicio} =obj.documentos[0]
                   let Correcto:any[] = []
                   let Incorrecto:any[] = []
                   let NoContesto:any[] = []
                   let motivo:string = ''
                    const index = Integrantes.findIndex((integrante:{value:string,label:string,Terminado:boolean}) => integrante.value === valorId);
                    (Avance[index].AvanceIndividual != null) &&  Avance[index].AvanceIndividual.map((dataindividual:AvanceIndividual) =>{
                    if(dataindividual.Resultado === 'CORRECTO'){
                      if(dataindividual.OracionCorrecta){
                        Correcto.push(dataindividual.OracionCorrecta)
                      }else{
                        Correcto.push(dataindividual.PalabraASeleccionada)
                      }
                    }
                  if(dataindividual.Resultado === 'INCORRECTO'){
                    Incorrecto.push({PalabraAEvaluar: dataindividual.PalabraAEvaluar, PalabraASeleccionada:dataindividual.PalabraASeleccionada, })
                    }
                    if(dataindividual.Resultado === "NO CONTESTO"){
                      NoContesto.push(dataindividual.PalabraAEvaluar)
                    }

                  })
                  
                  if(Equipo===null){
                    motivo = 'no eligieron un equipo'
                  }

                  if(Equipo!==null &&  Avance[index].AvanceIndividual === null  ){
                    motivo = 'no jugo'
                  }else if(Equipo!==null &&  Avance[index].AvanceIndividual.length === 0 ){
                    motivo = 'no jugo'
                  }


                   return{
                    FechaDeFin,
                    FechaDeInicio,
                    Avance: {Correcto,Incorrecto,NoContesto },
                    Equipo: (Equipo != null) ? Equipo : null,
                    createdAt,
                    updatedAtDay,
                    updatedAt,
                    tipo:'colaborativo',
                    motivo:motivo,
                    nombre:datosPer.label,
                    cedula:datosPer.value
                   }
          })

          const pdfdata = await pdfColaborativoEstudiante(nuevoarray);
          
          res.status(200).json({data:nuevoarray, pdf:pdfdata});
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([{ Avance: [{ Incorrecto: [{ PalabraAEvaluar: 'No ha jugado colaborativo', PalabraASeleccionada: 'No ha jugado colaborativo' }] }], }])
        }
        break;
      case 'Todos':
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
            '$addFields':{
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group':{
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort': {
              '_id.updatedAtDay': -1
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group':  {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort':  {
              '_id.updatedAtDay': -1
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d',
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          },
          {
            '$sort':  {
              '_id.updatedAtDay': -1
            }
          }
        ])
        // if (fechaInicio && fechaFin) {
         
        // } else if (fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields':{
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':{
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancedos = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     },{
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':  {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancetres = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         'Integrantes': {
        //           '$elemMatch': {
        //             'value': valorId
        //           }
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ])
        // } else if (!fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields':{
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':{
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancedos = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         'Estudiante.Identificacion': valorId
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group':  {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancetres = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         'Integrantes': {
        //           '$elemMatch': {
        //             'value': valorId
        //           }
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d',
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     },
        //     {
        //       '$sort':  {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ])
        // }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          const nuevoarray = objetosConAvance.length>0 ?objetosConAvance.map(obj=>{
            const{updatedAtDay, } = obj._id 
            const data =  obj.documentos.map((doc:Documento)=>{
              const{Estudiante, Avance, Rompecabeza, Terminado} =doc;
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
               Avance.length > 0 ? Avance.map(ava=>{
                if(ava.Resultado === 'CORRECTO'){  
                    Correcto.push(ava.PalabraASeleccionada)
                }
              if(ava.Resultado === 'INCORRECTO'){
                Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                }
                if(ava.Resultado === "NO CONTESTO"){
                  NoContesto.push(ava.PalabraAEvaluar)
                }
              
              }) : null
              return{
                Estudiante,
                Rompecabeza,
                Avance:{Correcto,Incorrecto,NoContesto},
                Terminado
              }
            })
            return {
              updatedAtDay,
              data,
              tipo:'vocabulario'
            }
          }):[]

          const nuevoarray2 = objetosConAvancedos.length >0 ? objetosConAvancedos.map(obj=>{
            const{updatedAtDay, } = obj._id 
            const data =  obj.documentos.map((doc:Documento)=>{
              const{Estudiante, Avance, Rompecabeza, Terminado} =doc;
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
              Avance.length > 0 ? Avance.map(ava=>{
                if(ava.Resultado === 'CORRECTO'){  
                    Correcto.push(ava.OracionCorrecta)
                }
              if(ava.Resultado === 'INCORRECTO'){
                Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                }
                if(ava.Resultado === "NO CONTESTO"){
                  NoContesto.push(ava.PalabraAEvaluar)
                }
              }) : null
              return{
                Estudiante,
                Rompecabeza,
                Avance:{Correcto,Incorrecto,NoContesto},
                Terminado
              }
            })
            return {
              updatedAtDay,
              data,
              tipo:'oracion'
            }
          }): []

          const nuevoarray3 = objetosConAvancetres.length>0  ? objetosConAvancetres.map(obj => {
            const {Integrantes,Equipo, Avance, createdAt, updatedAt,updatedAtDay,  FechaDeFin,
              FechaDeInicio,} =obj.documentos[0]

            let Correcto:any[] = []
            let Incorrecto:any[] = []
            let NoContesto:any[] = []
            let motivo:string = ''
             const index = Integrantes.findIndex((integrante:{value:string,label:string,Terminado:boolean}) => integrante.value === valorId);
             (Avance[index].AvanceIndividual != null) &&  Avance[index].AvanceIndividual.map((dataindividual:AvanceIndividual) =>{
             if(dataindividual.Resultado === 'CORRECTO'){
               if(dataindividual.OracionCorrecta){
                 Correcto.push(dataindividual.OracionCorrecta)
               }else{
                 Correcto.push(dataindividual.PalabraASeleccionada)
               }
             }
           if(dataindividual.Resultado === 'INCORRECTO'){
             Incorrecto.push({PalabraAEvaluar: dataindividual.PalabraAEvaluar, PalabraASeleccionada:dataindividual.PalabraASeleccionada, })
             }
             if(dataindividual.Resultado === "NO CONTESTO"){
              
               NoContesto.push(dataindividual.PalabraAEvaluar)
             }

           })
                if(Equipo===null){
                    motivo = 'no eligieron un equipo'
                  }

                  if( Equipo!==null &&  Avance[index].AvanceIndividual === null ){
                    motivo = 'no jugo'
                  }else if(Equipo!==null &&  Avance[index].AvanceIndividual.length === 0){
                     motivo = 'no jugo'
                  }
                  
                  // if( ){
                  //   motivo = 'no jugo'
                  // }
            return{
              FechaDeFin,
              FechaDeInicio,
              Avance: {Correcto,Incorrecto,NoContesto },
              Equipo: (Equipo != null) ? Equipo : null,
              createdAt,
              updatedAtDay,
              updatedAt,
              tipo:'colaborativo',
              motivo:motivo
            }
   }):[]
          
            let salidafinaljugador:any[] = []
            
            const salida2 = salidafinaljugador.concat(nuevoarray, nuevoarray2,nuevoarray3)
            // const salida3 = groupAndSortByDate(salida2)
            const groupedSortedArray:Salida[] = Object.entries(
              salida2.reduce((acc, obj) => {
                const key = obj.updatedAtDay;
                acc[key] = acc[key] || [];
                acc[key].push(obj);
                return acc;
              }, {} as Record<string, typeof Array>)
            )
              .map(([updatedAtDay, data]) => ({ updatedAtDay, data: data as SalidaDatum[] }))
              .sort((a, b) => new Date(b.updatedAtDay).getTime() - new Date(a.updatedAtDay).getTime());

          const final:OutputTodosJugador = {
            nombre:datosPer.label,
            cedula:datosPer.value,
            salida:groupedSortedArray
          }

            const datapdf = await  pdfTodosEstudiante(final);

            
            console.log({FechaInicio, FechaFin, Pregunta, valorId, datosPer})
          res.status(200).json({data:groupedSortedArray, pdf:''});
          // res.status(200).json(groupedSortedArray);

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
    const {  FechaInicio, FechaFin, Pregunta, Curso, Paralelo } = req.body as IReporteInterfaceCursoParalelo;
    let fechaInicio = new Date(FechaInicio);
    let fechaFin = new Date(FechaFin);
    let objetosConAvance: any[] = []
    let objectosalida: any[] = [];
    let objectosalida2: any[] = [];
    let objectosalida3: any[] = [];
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
   

    switch (Pregunta) {
      case 'vocabulario':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group':{
              '_id': {
                'updatedAtDay': '$updatedAtDay',
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ]);

        // if (fechaInicio && fechaFin) {
         
        // } else if (fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay',
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // } else if (!fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay',
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // }
        if (objetosConAvance.length > 0) {
          const salidaData = objetosConAvance.map(individual =>{
              const {updatedAtDay} = individual._id
            const data =  individual.documentos.map((i:Documento)=>{
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
                          const {Estudiante, Avance} = i
                Avance.map(ava=>{
                  if(ava.Resultado === 'CORRECTO'){  
                    Correcto.push(ava.PalabraASeleccionada)
                }
              if(ava.Resultado === 'INCORRECTO'){
                Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                }
                if(ava.Resultado === "NO CONTESTO"){
                  NoContesto.push(ava.PalabraAEvaluar)
                }
                })
                return{
                  Estudiante,
                  Avance: {Correcto, Incorrecto, NoContesto}
                }
              })

            return{
              updatedAtDay,
              data:data,
              tipo:"vocabulario"
            }
          })
          const actividadesUnidas = procesarActividades(salidaData);
          res.status(200).json(salidaData);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ]);

        if (objetosConAvance.length > 0) {
            const salidaData = objetosConAvance.map(individual=>{
              const {updatedAtDay} = individual._id
              const data = individual.documentos.map((i:Documento)=>{
                let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
                const {Estudiante, Avance} = i
                  const miAvance = Avance.map(ava=>{
                    if(ava.Resultado === 'CORRECTO'){  
                      Correcto.push(ava.PalabraAEvaluar)
                  }
                if(ava.Resultado === 'INCORRECTO'){
                  Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                  }
                  if(ava.Resultado === "NO CONTESTO"){
                    NoContesto.push(ava.PalabraAEvaluar)
                  }
                  })
                return{
                  Estudiante,
                  Avance: {Correcto, Incorrecto, NoContesto}
                }
              })
              return{
                updatedAtDay,
                data:data,
                 tipo:'oracion',
              }
            })
            
          res.status(200).json(salidaData);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
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
          }, {
            '$addFields': {
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ]);

        // if (fechaInicio && fechaFin) {
         
        // } else if (fechaInicio) {
        //   objetosConAvance = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         "Curso": Curso,
        //         "Paralelo": Paralelo,
        //       }
        //     },  {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }

        //   ]);
        // } else if (!fechaInicio) {
        //   objetosConAvance = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         "Curso": Curso,
        //         "Paralelo": Paralelo,
        //       }
        //     },  {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        // }
        if (objetosConAvance.length > 0) {
          const dataSalida = objetosConAvance.map(individual=>{
            const {updatedAtDay} = individual._id
           const data = individual.documentos.map((doc:DocumentosColabo) =>{
                const {Avance, Integrantes, FechaDeFin, FechaDeInicio, Equipo} = doc
            let motivo:string = ""
      
            let  nuevoar:any[] =[]
            for(let j = 0; j < Avance.length; j++){
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
              if(Avance[j].AvanceIndividual ==null){
                continue
              }
              for(let h=0; h<Avance[j].AvanceIndividual.length; h++){

                  if(Avance[j].AvanceIndividual[h].Resultado=='CORRECTO'){
                    if(Avance[j].AvanceIndividual[h].OracionCorrecta){
                      Correcto.push(Avance[j].AvanceIndividual[h].OracionCorrecta)
                    }else{
                      Correcto.push(Avance[j].AvanceIndividual[h].PalabraASeleccionada)
                    }
                  }
                  if(Avance[j].AvanceIndividual[h].Resultado==='INCORRECTO'){
                    Incorrecto.push({PalabraAEvaluar: Avance[j].AvanceIndividual[h].PalabraAEvaluar, PalabraASeleccionada:Avance[j].AvanceIndividual[h].PalabraASeleccionada, })
                  }
                  if(Avance[j].AvanceIndividual[h].Resultado==="NO CONTESTO"){
                    NoContesto.push(Avance[j].AvanceIndividual[h].PalabraAEvaluar)
                  }
                 
              } 
                nuevoar.push({Correcto,Incorrecto,NoContesto})
            }
                  if(Equipo == null){
                    motivo = 'no eligieron un equipo'
                  }
                  return{
                    Equipo,
                    FechaDeInicio,
                    FechaDeFin,
                    Integrantes,
                    Avance:nuevoar,
                    motivo:motivo
                  }
            })
            return{
              FechaDeInicio :data[0].FechaDeInicio,
                    FechaDeFin:data[0].FechaDeFin,
              updatedAtDay,
              data:data,
              tipo:'colaborativo'
            }
          })
          res.status(200).json(dataSalida);
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Todos':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay',
              },
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'updatedAtDay': '$updatedAtDay'
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }

        ]);

        // if (fechaInicio && fechaFin) {
        // } else if (fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay',
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancedos = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancetres = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         "Curso": Curso,
        //         "Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }

        //   ]);
        // } else if (!fechaInicio) {
        //   objetosConAvance = await JugadoresConVocabularios.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay',
        //         },
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancedos = await JugadoresConOraciones.aggregate([
        //     {
        //       '$match': {
        //         "Estudiante.Curso": Curso,
        //         "Estudiante.Paralelo": Paralelo,
        //       }
        //     }, {
        //       '$match': {
        //         'Avance': {
        //           '$ne': null
        //         }
        //       }
        //     }, {
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }
        //   ]);
        //   objetosConAvancetres = await Grupos.aggregate([
        //     {
        //       '$match': {
        //         "Curso": Curso,
        //         "Paralelo": Paralelo,
        //       }
        //     },{
        //       '$addFields': {
        //         'updatedAtDay': {
        //           '$dateToString': {
        //             'format': '%Y-%m-%d', 
        //             'date': '$updatedAt'
        //           }
        //         }
        //       }
        //     }, {
        //       '$group': {
        //         '_id': {
        //           'updatedAtDay': '$updatedAtDay'
        //         }, 
        //         'documentos': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$sort': {
        //         '_id.updatedAtDay': -1
        //       }
        //     }

        //   ]);
        // }
        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          
            const salidaData = objetosConAvance.map(individual =>{
              const {updatedAtDay} = individual._id
            const data =  individual.documentos.map((i:Documento)=>{
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
                          const {Estudiante, Avance} = i
                Avance.map(ava=>{
                  if(ava.Resultado === 'CORRECTO'){  
                    Correcto.push(ava.PalabraASeleccionada)
                }
              if(ava.Resultado === 'INCORRECTO'){
                Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                }
                if(ava.Resultado === "NO CONTESTO"){
                  NoContesto.push(ava.PalabraAEvaluar)
                }
                })
                return{
                  Estudiante,
                  Avance: {Correcto, Incorrecto, NoContesto}
                }
              })

            return{
              updatedAtDay,
              data:data,
              tipo:"vocabulario"
            }
          })
          const salidaData2 = objetosConAvancedos.map(individual=>{
            const {updatedAtDay} = individual._id
            const data = individual.documentos.map((i:Documento)=>{
              let Correcto:any[] = []
            let Incorrecto:any[] = []
            let NoContesto:any[] = []
              const {Estudiante, Avance} = i
                const miAvance = Avance.map(ava=>{
                  if(ava.Resultado === 'CORRECTO'){  
                    Correcto.push(ava.PalabraAEvaluar)
                }
              if(ava.Resultado === 'INCORRECTO'){
                Incorrecto.push({PalabraAEvaluar: ava.PalabraAEvaluar, PalabraASeleccionada:ava.PalabraASeleccionada, })
                }
                if(ava.Resultado === "NO CONTESTO"){
                  NoContesto.push(ava.PalabraAEvaluar)
                }
                })
              return{
                Estudiante,
                Avance: {Correcto, Incorrecto, NoContesto}
              }
            })
            return{
              updatedAtDay,
              data:data,
               tipo:'oracion',
            }
          })

          const dataSalida = objetosConAvancetres.map(individual=>{
            const {updatedAtDay} = individual._id
           const data = individual.documentos.map((doc:DocumentosColabo) =>{
                const {Avance, Integrantes, FechaDeFin, FechaDeInicio, Equipo} = doc
            let motivo:string =''
      
            let  nuevoar:any[] =[]
            for(let j = 0; j < Avance.length; j++){
              let Correcto:any[] = []
              let Incorrecto:any[] = []
              let NoContesto:any[] = []
              if(Avance[j].AvanceIndividual ==null){
                continue
              }
              for(let h=0; h<Avance[j].AvanceIndividual.length; h++){

                  if(Avance[j].AvanceIndividual[h].Resultado=='CORRECTO'){
                    if(Avance[j].AvanceIndividual[h].OracionCorrecta){
                      Correcto.push(Avance[j].AvanceIndividual[h].OracionCorrecta)
                    }else{
                      Correcto.push(Avance[j].AvanceIndividual[h].PalabraASeleccionada)
                    }
                  }
                  if(Avance[j].AvanceIndividual[h].Resultado==='INCORRECTO'){
                    Incorrecto.push({PalabraAEvaluar: Avance[j].AvanceIndividual[h].PalabraAEvaluar, PalabraASeleccionada:Avance[j].AvanceIndividual[h].PalabraASeleccionada, })
                  }
                  if(Avance[j].AvanceIndividual[h].Resultado==="NO CONTESTO"){
                    NoContesto.push(Avance[j].AvanceIndividual[h].PalabraAEvaluar)
                  }
                 
              } 
                nuevoar.push({Correcto,Incorrecto,NoContesto})
            }
                  if(Equipo == null){
                    motivo = 'no eligieron un equipo'
                  }
                  return{
                    Equipo,
                    FechaDeInicio,
                    FechaDeFin,
                    Integrantes,
                    Avance:nuevoar,
                    motivo:motivo
                  }
            })
            return{
              FechaDeInicio :data[0].FechaDeInicio,
                    FechaDeFin:data[0].FechaDeFin,
              updatedAtDay,
              data:data,
              tipo:'colaborativo'
            }
          })
        
          let salidafinaljugador:any[] = []
          const salida2 = salidafinaljugador.concat(salidaData, salidaData2,dataSalida)
          const groupedSortedArray = Object.entries(
            salida2.reduce((acc, obj) => {
              const key = obj.updatedAtDay;
              acc[key] = acc[key] || [];
              acc[key].push(obj);
              return acc;
            }, {} as Record<string, typeof Array>)
          )
            .map(([updatedAtDay, data]) => ({ updatedAtDay, data }))
            .sort((a, b) => new Date(b.updatedAtDay).getTime() - new Date(a.updatedAtDay).getTime());

          res.status(200).json(groupedSortedArray);
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

//por juego ------------------------------------------------------------
export const reporteGeneralPorJuego = async (req: Request, res: Response) => {
  try {
    const { FechaInicio, FechaFin,  Pregunta, Curso, Paralelo } = req.body as IReporteInterfaceJuego;
    let fechaInicio = new Date(FechaInicio);
    let fechaFin = new Date(FechaFin);;
    let objectosalida: any[] = [];
    let objectosalida2: any[] = [];
    let objectosalida3: any[] = [];
    let objetosConAvanceVocabulario: Datum[] = []
    let objetosConAvance: any[] = []
    let objetosConAvancedos: any[] = []
    let objetosConAvancetres: any[] = []
    switch (Pregunta) {
      case 'vocabulario':
        objetosConAvanceVocabulario = await JugadoresConVocabularios.aggregate([
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'Nombre': '$Estudiante.Nombre', 
                'Identificacion': '$Estudiante.Identificacion', 
                'Curso': '$Estudiante.Curso', 
                'Paralelo': '$Estudiante.Paralelo',
                  'tipo':'vocabulario',
                   'Docente':"$Docente"
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
        ]);

        if (objetosConAvanceVocabulario.length > 0) {
          const uniqueCourses:CursoElement[] = [];

          objetosConAvanceVocabulario.forEach(item => {
              const { Curso, Paralelo } = item._id;
              const courseParalelo = { Curso, Paralelo };
          
              // Verificar si ya existe en el array de cursos únicos
              if (!uniqueCourses.some(c => c.Curso === Curso && c.Paralelo === Paralelo)) {
                  uniqueCourses.push(courseParalelo);
              }
          });
          
          let echaInicio =  FechaInicio.toString() ;
          
          let echaFin=    FechaFin.toString();
          
          const final ={
            Juego:'vocabulario',
            Cursos:uniqueCourses,
            data:objetosConAvanceVocabulario,
            fechaInicio: echaInicio,
            fechaFin:    echaFin,
            Curso, 
            Paralelo 
          }
          const pdfdata =await pdfJuegoVocabulario(final);

        
          res.status(200).json({data:final, pdf:pdfdata});
        
        } else if (objetosConAvanceVocabulario.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'oracion':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'Nombre': '$Estudiante.Nombre', 
                'Identificacion': '$Estudiante.Identificacion', 
                'Curso': '$Estudiante.Curso', 
                'Paralelo': '$Estudiante.Paralelo',
                 'Docente':"$Docente"
              }, 
              'documentos': {
                '$push': '$$ROOT'
              }
            }
          }
        ]);

        if (objetosConAvance.length > 0) {
          const uniqueCourses:any[] = [];

          objetosConAvance.forEach(item => {
              const { Curso, Paralelo } = item._id;
              const courseParalelo = { Curso, Paralelo };
          
              // Verificar si ya existe en el array de cursos únicos
              if (!uniqueCourses.some(c => c.Curso === Curso && c.Paralelo === Paralelo)) {
                  uniqueCourses.push(courseParalelo);
              }
          });
          let echaInicio =  FechaInicio.toString() ;
          
          let echaFin=    FechaFin.toString();
          const final ={
            Juego:'oracion',
            Cursos:uniqueCourses,
            data:objetosConAvance,
            fechaInicio: echaInicio,
            fechaFin:    echaFin,
            Curso, 
            Paralelo 
          }
          const pdfdata = await pdfJuegoOracion(final);
          console.log({ FechaInicio, FechaFin,  Pregunta, Curso, Paralelo })
          res.status(200).json({data:final, pdf:pdfdata});
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Colaborativo':
        objetosConAvance = await Grupos.aggregate([
          {
            '$match': {
              "Curso": Curso,
              "Paralelo": Paralelo,
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
                'integrantes': {
                  'cedula': '$Integrantes.value', 
                  'nombre': '$Integrantes.label'
                }, 
                'curso': '$Curso', 
                'paralelo': '$Paralelo',
                'Docente':"$Docente"
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ])

        if (objetosConAvance.length > 0) {
         
          const courseParallelNameCounts: CourseParallelNameCount[] = [];
          function findOrCreateCourseParallel(curso: string, paralelo: string) {
            let courseParallel = courseParallelNameCounts.find(
                cp => cp.curso === curso && cp.paralelo === paralelo
            );
        
            if (!courseParallel) {
                courseParallel = {
                    curso,
                    paralelo,
                    nameCounts: []
                };
                courseParallelNameCounts.push(courseParallel);
            }
        
            return courseParallel;
        }
        const uniqueDocentes = Array.from(
          new Set(objetosConAvance.map(item => item._id.Docente))
        );
        objetosConAvance.forEach(item => {
          const { curso, paralelo } = item._id;
          const nombres = item._id.integrantes.nombre;
      
          // Obtener o crear la entrada para el curso y paralelo
          const courseParallel = findOrCreateCourseParallel(curso, paralelo);
      
          // Contar las ocurrencias de cada nombre
          nombres.forEach((nombre: string) => {
              let nameCount = courseParallel.nameCounts.find(nc => nc.nombre === nombre);
              if (nameCount) {
                  nameCount.count++;
              } else {
                  courseParallel.nameCounts.push({ nombre, count: 1 });
              }
          });
      });
      let echaInicio =  FechaInicio.toString() ;
          
      let echaFin=    FechaFin.toString();
    const final ={
    Juego:'colaborativo',
    data:courseParallelNameCounts,
      docentes:uniqueDocentes,
      fechaInicio: echaInicio,
            fechaFin:    echaFin,
            Curso, 
            Paralelo 
        }

        const pdfdata = await pdfJuegoColaborativo(final);
        console.log({ FechaInicio, FechaFin,  Pregunta, Curso, Paralelo })
        res.status(200).json({data:final, pdf:pdfdata});
        } else if (objetosConAvance.length === 0) {
          res.status(200).json([])
        }
        break;
      case 'Todos':
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'Nombre': '$Estudiante.Nombre', 
                'Identificacion': '$Estudiante.Identificacion', 
                'Curso': '$Estudiante.Curso', 
                'Paralelo': '$Estudiante.Paralelo',
                  'tipo':'vocabulario',
                   'Docente':"$Docente"
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
              'updatedAtDay': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$updatedAt'
                }
              }
            }
          }, {
            '$group': {
              '_id': {
                'Nombre': '$Estudiante.Nombre', 
                'Identificacion': '$Estudiante.Identificacion', 
                'Curso': '$Estudiante.Curso', 
                'Paralelo': '$Estudiante.Paralelo',
                 'Docente':"$Docente"
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
                'integrantes': {
                  'cedula': '$Integrantes.value', 
                  'nombre': '$Integrantes.label'
                }, 
                'curso': '$Curso', 
                'paralelo': '$Paralelo',
                'Docente':"$Docente"
              }
            }
          }, {
            '$sort': {
              '_id.updatedAtDay': -1
            }
          }
        ])


        if (objetosConAvance.length > 0 || objetosConAvancedos.length > 0 || objetosConAvancetres.length > 0) {
          const uniqueCoursesVoca:any[] = [];

          objetosConAvance.forEach(item => {
              const { Curso, Paralelo } = item._id;
              const courseParalelo = { Curso, Paralelo };
          
              // Verificar si ya existe en el array de cursos únicos
              if (!uniqueCoursesVoca.some(c => c.Curso === Curso && c.Paralelo === Paralelo)) {
                uniqueCoursesVoca.push(courseParalelo);
              }
          });


          const uniqueCoursesOrac:any[] = [];

          objetosConAvancedos.forEach(item => {
              const { Curso, Paralelo } = item._id;
              const courseParalelo = { Curso, Paralelo };
          
              // Verificar si ya existe en el array de cursos únicos
              if (!uniqueCoursesOrac.some(c => c.Curso === Curso && c.Paralelo === Paralelo)) {
                uniqueCoursesOrac.push(courseParalelo);
              }
          });

        
          const courseParallelNameCounts: CourseParallelNameCount[] = [];
          function findOrCreateCourseParallel(curso: string, paralelo: string) {
            let courseParallel = courseParallelNameCounts.find(
                cp => cp.curso === curso && cp.paralelo === paralelo
            );
        
            if (!courseParallel) {
                courseParallel = {
                    curso,
                    paralelo,
                    nameCounts: []
                };
                courseParallelNameCounts.push(courseParallel);
            }
        
            return courseParallel;
        }
        const uniqueDocentes = Array.from(
          new Set(objetosConAvancetres.map(item => item._id.Docente))
        );
        objetosConAvancetres.forEach(item => {
          const { curso, paralelo } = item._id;
          const nombres = item._id.integrantes.nombre;
      
          // Obtener o crear la entrada para el curso y paralelo
          const courseParallel = findOrCreateCourseParallel(curso, paralelo);
          
          // Contar las ocurrencias de cada nombre
          nombres.forEach((nombre: string) => {
              let nameCount = courseParallel.nameCounts.find(nc => nc.nombre === nombre);
              if (nameCount) {
                  nameCount.count++;
              } else {
                  courseParallel.nameCounts.push({ nombre, count: 1 });
              }
          });
      });
      let echaInicio =  FechaInicio.toString() ;
          
      let echaFin=    FechaFin.toString();
      
              const  final = {
                juego:'Todos',
                fechaInicio: echaInicio,
                fechaFin:    echaFin,
                Curso, 
                Paralelo,
                dataVocabulario:{
                  Cursos:uniqueCoursesVoca,
                  data:objetosConAvance,
                },
                dataOracion:{
                  Cursos:uniqueCoursesOrac,
                  data:objetosConAvancedos,
                },
                dataColaborativo:{
                  data:courseParallelNameCounts,
                  docentes:uniqueDocentes
                }

              }
              const pdfdata = await pdfJuegoTodos(final);
        console.log({ FechaInicio, FechaFin,  Pregunta, Curso, Paralelo })
          res.status(200).json({data:final, pdf:pdfdata});
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



export const multijugadorinter = (objetosConAvance: any[], id: String) => {
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



export const modeladosalidaGeneralIndividualPorJugador = (input: any[]) => {
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
export const modeladosalidaGeneralIndividualOracion = (input: any[]) => {
  let Correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let avance: any[] = []
  let id:any[] = [];
  let NoContesto :any[] =[]
  if (input.length > 0) {
    for (let j = 0; input.length > j; j++) {
      Correcto =[]
      Incorrecto=[]
      if (input[j].Avance !== null) {
        id.push(input[j]._id)
        if (input[j].Avance.length >= 0) {
          for (let i = 0; input[j].Avance.length > i; i++) {
            if (input[j].Avance[i].Resultado === "CORRECTO") {
              Correcto.push(input[j].Avance[i].OracionCorrecta);
            } else if (input[j].Avance[i].Resultado === "INCORRECTO") {
              Incorrecto.push({ PalabraAEvaluar: input[j].Avance[i].PalabraAEvaluar, PalabraASeleccionada: input[j].Avance[i].PalabraASeleccionada })
            }else if (input[j].Avance[i].Resultado === "NO CONTESTO") {
              NoContesto.push({ PalabraAEvaluar: input[j].Avance[i].PalabraAEvaluar, PalabraASeleccionada: "NO CONTESTO" })
            }
          }
          avance.push({ Correcto: Correcto, Incorrecto: Incorrecto,NoContesto:NoContesto ,id:id})
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

export const modeladosalidaGeneralIndividualMultiIndiual = (input: any) => {
  let correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let Avance: any[] = []
  let NoContesto:any[] = []
  if (input !== null) {
    if (input.length >= 0) {
      for (let i = 0; input.length > i; i++) {
        if (input[i].Resultado === "CORRECTO") {
          if (!input[i].OracionCorrecta) {
            correcto.push(input[i].PalabraASeleccionada);
          } else {
            correcto.push(input[i].OracionCorrecta);
          }
        } else if (input[i].Resultado === "INCORRECTO") {
          Incorrecto.push({ PalabraAEvaluar: input[i].PalabraAEvaluar, PalabraASeleccionada: input[i].PalabraASeleccionada })
        }
        else if (input[i].Resultado === "NO CONTESTO") {
          NoContesto.push({ PalabraAEvaluar: input[i].PalabraAEvaluar, PalabraASeleccionada: "NO CONTESTO" })
        }
      }
      Avance.push({ Correcto: correcto, Incorrecto: Incorrecto,NoContesto:NoContesto });
    }
  } else {
    Avance.push({ Correcto: null, Incorrecto: null });
  }
  return Avance
}

export const modeladosalidaGeneralIndividualMulti = (input: any) => {
  let correcto: string[] = [];
  let Incorrecto: JuegoSimple[] = [];
  let Avance = null
  let NoContesto:any[] = []
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
        }else if (input[i].Resultado === "NO CONTESTO") {
          NoContesto.push({ PalabraAEvaluar: input[i].PalabraAEvaluar, PalabraASeleccionada: "NO CONTESTO" })
        }
      }
      Avance = { Correcto: correcto, Incorrecto: Incorrecto,NoContesto:NoContesto }
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



interface Avance {
  Correcto: string[];
  Incorrecto: { PalabraAEvaluar: string; PalabraASeleccionada: string }[];
  NoContesto: { PalabraAEvaluar: string }[];
}

interface Actividad {
  Estudiante: Estudiante;
  Avance: Avance;
}

interface DiaActividad {
  updatedAtDay: string;
  data: Actividad[];
  tipo: string;
}



const procesarActividades = (actividades: DiaActividad[]): DiaActividad[] => {
  const resultado: { [key: string]: { estudiante: Estudiante; avance: Avance } } = {};

  actividades.forEach(diaActividad => {
      diaActividad.data.forEach(actividad => {
          const id = actividad.Estudiante.Identificacion;
          if (!resultado[id]) {
              resultado[id] = {
                  estudiante: actividad.Estudiante,
                  avance: {
                      Correcto: [],
                      Incorrecto: [],
                      NoContesto: []
                  }
              };
          }
          resultado[id].avance.Correcto.push(...actividad.Avance.Correcto);
          resultado[id].avance.Incorrecto.push(...actividad.Avance.Incorrecto);
          resultado[id].avance.NoContesto.push(...actividad.Avance.NoContesto);
      });
  });

  return Object.values(resultado).map(({ estudiante, avance }) => ({
      updatedAtDay: actividades[0].updatedAtDay,
      data: [{ Estudiante: estudiante, Avance: avance }],
      tipo: actividades[0].tipo
  }));
};



interface Integrante{
  cedula:string[];
  nombre:string[];
}

interface DataItem{
  _id:{
    createdAtDay:string;
    integrantes:Integrante;
    curso:string;
    paralelo:string;
  }
}
interface NameCount {
  nombre: string;
  count: number;
}

interface CourseParallelNameCount {
  curso: string;
  paralelo: string;
  nameCounts: NameCount[];
}