import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { IAvanceInter, IAvenceArriba, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface';
import EquipoConJuegos, { IEquipoConJuego } from '../../models/Administrador/EquipoConJuegos';
import EquipoBase from '../../models/Administrador/Equipo';
import { responseformualrio } from '../../lib';

//creacion de partida
export const CrearModeloInicialSinJuegos = async (BaseMulti: IMultiJuga) => {
    try {
        let cantidad = Object.keys(BaseMulti.IntegrantesPorGrupos).length;
        for (let i = 0; i < cantidad; i++) {
            let integrantes = null;
            integrantes = BaseMulti.IntegrantesPorGrupos[`Equipo ${cantidad-i}`];
            // if (i === 0) {
                
            // } else if (i === 1) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 2'];
            // } else if (i === 2) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 3'];
            // } else if (i === 3) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 4'];
            // } else if (i === 4) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 5'];
            // } else if (i === 5) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 6'];
            // }else if (i === 6) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 7'];
            // }else if (i === 7) {
            //     integrantes = BaseMulti.IntegrantesPorGrupos['Equipo 8'];
            // }
            const GrupoInicialsinJuegos: IGrupoDeTrabajo = new Grupos({
                IdDeLaAsignacion: BaseMulti.id,
                Equipo: null,
                Integrantes: integrantes,
                Curso: BaseMulti.Curso,
                Paralelo: BaseMulti.Paralelo,
                TipoDeJuego: BaseMulti.TipoDeJuego,
                Avance: null,
                FechaDeInicio: BaseMulti.Fecha[0],
                FechaDeFin: BaseMulti.Fecha[1],
                Estado: "ACTIVO"
            })
            GrupoInicialsinJuegos.save()

        }
    } catch (error) {
        return null;
    }
}
//aqui guarda en base, la relacion entre juegos y Equipo

export const GuardarRelacionEntreEquipoYJuegos = async (inputObject: IMultiJuga) => {
    try {
        for (let i = 0; i < inputObject.NombreDeEquipos.length; i++) {
            let idactual = inputObject.NombreDeEquipos[i].value;
            const data = await EquipoBase.find({ _id: idactual }, { "createdAt": 0, "updatedAt": 0 });
            const equipo: IEquipoConJuego = new EquipoConJuegos({
                IdDeLaAsignacion: inputObject.id,
                Equipo: data[0],
                TipoDeJuego: inputObject.TipoDeJuego,
                Avance: null,
                Curso: inputObject.Curso,
                Paralelo: inputObject.Paralelo,
                YaAsignado: false,
                Fecha: inputObject.Fecha,
                Estado: "ACTIVO",
            })
            equipo.save()
        }
    } catch (error) {
        return null;
    }

}


const Los5JuegosTIPO1 = async () => {
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    let modeloFinal: IPartidaMulti;
    try {
        Juego1 = await CreaciondePartidasIndividualesVocabulario();
        Juego2 = await uniendoOracionesPorCategoria();
        Juego3 = await CreaciondePartidasIndividualesVocabulario();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await CreaciondePartidasIndividualesVocabulario();

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
const Los5JuegosTIPO2 = async () => {
    let Juego1 = {}
    let Juego2 = {}
    let Juego3 = {}
    let Juego4 = {}
    let Juego5 = {}
    let modeloFinal: IPartidaMulti;
    try {
        Juego1 = await uniendoOracionesPorCategoria()
        Juego2 = await uniendoOracionesPorCategoria()
        Juego3 = await uniendoOracionesPorCategoria()
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

const Los5JuegosTIPO3 = async () => {
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
        Juego4 = await CreaciondePartidasIndividualesVocabulario();
        Juego5 = await CreaciondePartidasIndividualesVocabulario();

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
        let modelo: IAvanceInter = {
            PalabraCorrecta: "",
            PalabraSeleccionada: "",
            Resultado: "",
            Terminado: false
        };
        let modelofinal: IAvenceArriba
        let Juego1: IAvanceInter;
        let Juego2: IAvanceInter;
        let Juego3: IAvanceInter;
        let Juego4: IAvanceInter;
        let Juego5: IAvanceInter;
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
            Terminado
        };
        return modelofinal;
    }
    catch (error) {
        return `error al guardar el model de la partida${error}`
    }
}

export const LlamadaDeJuegosBasesPorAsignar = async (req: Request, res: Response) => {
    try {
        let finalsalida = [];
        let idDeLaAsignacion = req.body.IdDeLaAsignacion;
        const data = await EquipoConJuegos.find({ 'IdDeLaAsignacion': idDeLaAsignacion }, { 'createdAt': 0, 'updatedAt': 0 });

        for (let i = 0; i < data.length; i++) {
            if (data[i].YaAsignado === false) {
                finalsalida.push(data[i])
            }
        }
        res.json(finalsalida);
    } catch (error) {
        res.json(error);
    }

}

export const DevuelveLaPosicionDentroDelArray = async (req: Request, res: Response) => {
    try {
        let value = req.body.value;
        let label = req.body.label;
        let situacion: string = "";
        let objetoaBuscar = { value: value, label: label }
        const data = await Grupos.find({
            "Integrantes": {
                $elemMatch: {
                    label: label,
                    value: value
                }
            }
        }, { 'createdAt': 0, 'updatedAt': 0 });
        if (data.length !== 0) {
            let pos = data[0].Integrantes.findIndex(obj => JSON.stringify(obj) === JSON.stringify(objetoaBuscar));
            if (data[0].Equipo === null) {
                if (pos === 0) {
                    situacion = "Eleccion Equipo";
                } else if (pos > 0) {
                    situacion = "Sala de espera";
                }
            } else if (data[0].Equipo !== null) {
                if (data[0].Avance === null) {
                    if (pos === 0) {
                        situacion = "Jugar";
                    } else if (pos > 0) {
                        situacion = "Sala de espera";
                    }
                } else if (Array.isArray(data[0].Avance)) {
                    if (data[0].Avance.length === (pos * 5)) {
                        situacion = "Jugar";
                    } else if (data[0].Avance.length !== (pos * 5)) {
                        if (data[0].Avance.length === (data[0].Integrantes.length * 5)) {
                            situacion = "Podio";
                        } else {
                            situacion = "Sala de espera";
                        }

                    }
                }
            }

            res.json({
                _id: data[0].id,
                IdDeLaAsignacion: data[0].IdDeLaAsignacion,
                Equipo: data[0].Equipo,
                Integrantes: data[0].Integrantes,
                TipoDeJuego: data[0].TipoDeJuego,
                Avance: data[0].Avance,
                Curso: data[0].Curso,
                Paralelo: data[0].Paralelo,
                FechaDeInicio: data[0].FechaDeInicio,
                FechaDeFin: data[0].FechaDeFin,
                Estado: data[0].Estado,
                Posicion: pos,
                Situacion: situacion
            });
        } else {
            res.json(null);
        }
    } catch (error) {
        res.json(null);
    }
}

export const UneIntegrantesConJuegos = async (req: Request, res: Response) => {
    try {
        let input = req.body.BaseUno as IEquipoConJuego;
        const data = await Grupos.updateOne({ _id: req.body.idDeBase }, {
            'Equipo': input.Equipo,
            'Juegos': input.TipoDeJuego,
            'Avance': input.Avance
        })
        const updetate = await EquipoConJuegos.updateOne({ _id: input._id }, { 'YaAsignado': true })
        res.json(updetate);
    } catch (error) {
        res.json([]);
    }

}


export const actualizarJuegoTerminado = async (req: Request, res: Response) => {
    try {
        //busca, encuentra, verifica si hay una antes, si no, lo guarda directemente, si si hay, captura la que estaba, anexa la nueva al final y guarda todo
        let id = req.body.idOutput;
        let input = req.body.Avance;
        const data = await Grupos.findOne({ _id: id });
        if (data !== null) {
            if (data.Avance !== null) {
                let aux = data.Avance;
                let nuevo = aux.concat(input);
                data.Avance = nuevo;
                await data.save();
                res.json()
            } else if (data.Avance === null) {
                data.Avance = input;
                await data.save()
                res.json()
            }
        } else {
            //no hay data
            res.json()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

///--------------------------------------------------

export const historialJuego = async (req: Request, res: Response) => {
    try {
        let { Curso, Paralelo } = req.body

        const data = await Grupos.aggregate([
            {
                '$match': {
                    'Curso': Curso,
                    'Paralelo': Paralelo
                }
            }, {
                '$group': {
                    '_id': {
                        'IdDeLaAsignacion': '$IdDeLaAsignacion'
                      },
                    'documentos': {
                        '$push': '$$ROOT'
                    }
                }
            }
        ]);
        if (data.length !== 0) {
            res.json(data)
        } else if (data.length === 0) {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const ActualizarCoolaborativo = async (req: Request, res: Response) => {
    try {
      
        let {_id, picker,picker2, TipoDeJuego} = req.body;
        if(picker!=undefined && picker2!=undefined){
             const data = await Grupos.findByIdAndUpdate({ _id: _id },
            {$set:
            {   FechaDeFin:picker2,
                FechaDeInicio:picker,
                TipoDeJuego:TipoDeJuego
            }})
          res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
        } else if(picker==undefined && picker2==undefined) {
            const data = await Grupos.findByIdAndUpdate({ _id: _id },
                {$set:
                { 
                    TipoDeJuego:TipoDeJuego
                }})
              res.json({"titulo":"Excelente","respuesta":responseformualrio.Editadar.editadoExito,"type":"success"})
        }else {
            res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"})
        }
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Editadar.editadoFracaso, "type":"error"})
    }
}

export const DesactivarCoolaborativo = async (req: Request, res: Response) => {
    try {
        let {_id} = req.body;
        const data = await Grupos.findByIdAndUpdate({_id:_id},
            {$set:
            {  Estado:"INACTIVO"  
            }})
          res.status(200).json({"titulo":"Excelente","respuesta":responseformualrio.Desactivar.Desactivar,"type":"success"})
        
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Desactivar.NoDesactivar, "type":"error"})
    }
}

export const ActivarCoolaborativo = async (req: Request, res: Response) => {
    try {
        let {_id} = req.body;
        const data = await Grupos.findByIdAndUpdate({_id:_id},
            {$set:
            {  Estado:"ACTIVO"  
            }})
          res.json({"titulo":"Excelente","respuesta":responseformualrio.Activar.Activar,"type":"success"})
        
    } catch (error) {
        res.json({"titulo":"Error","respuesta":responseformualrio.Activar.NoActivar, "type":"error"})
    }
}