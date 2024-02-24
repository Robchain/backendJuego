import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { IEquipoInterno, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface';
import EquipoConJuegos, { IEquipoConJuego } from '../../models/Administrador/EquipoConJuegos';
import EquipoBase from '../../models/Administrador/Equipo';
import { responseformualrio } from '../../lib';
import { Juego } from '../../interface/ModeloPartida';

interface ObjetoConTerminado {
    value: string;
    label: string;
    Terminado: boolean;
  }
  
  function agregarPropiedadTerminado(array: IEquipoInterno[]): ObjetoConTerminado[] {
    return array.map(item => ({
      ...item,
      Terminado: false
    }));
  }
  
  export interface ObjetoConAvance {
    AvanceIndividual: Juego[];
  }
  
  function generarArrayDeObjetos(numero: number): ObjetoConAvance[] {
    return Array.from({ length: numero }, () => ({ AvanceIndividual: [] }));
  }
  
//creacion de partida
export const CrearModeloInicialSinJuegos = async (BaseMulti: IMultiJuga) => {
    try {
       
        let cantidad = Object.keys(BaseMulti.IntegrantesPorGrupos).length;
        for (let i = 0; i < cantidad; i++) {
            let integrantes = null;
            integrantes = BaseMulti.IntegrantesPorGrupos[`Equipo ${cantidad-i}`];
            const arrayModificado: ObjetoConTerminado[] = agregarPropiedadTerminado(integrantes!);
            const arraydeAvance:ObjetoConAvance[] = generarArrayDeObjetos(arrayModificado.length);
            const GrupoInicialsinJuegos: IGrupoDeTrabajo = new Grupos({
                IdDeLaAsignacion: BaseMulti.id,
                Equipo: null,
                Integrantes: arrayModificado,
                Curso: BaseMulti.Curso,
                Paralelo: BaseMulti.Paralelo,
                TipoDeJuego: BaseMulti.TipoDeJuego,
                Avance: arraydeAvance,
                FechaDeInicio: BaseMulti.Fecha[0],
                FechaDeFin: BaseMulti.Fecha[1],
                Medalla:'',
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
       const data:IGrupoDeTrabajo[] = await Grupos.aggregate(
        [
            {
              '$match': {
                'Integrantes.label': label, 
                'Integrantes.value': value,
                "Estado":"ACTIVO"
              }
            }
          ])
        if (data.length !== 0) {
            let pos = data[0].Integrantes.findIndex(obj => JSON.stringify(obj.value) === JSON.stringify(objetoaBuscar.value));
            const vecesTerminadoEsTrue = data[0].Integrantes.filter(elemento => elemento.Terminado).length;
            const faltaPorCompletar = data[0].Avance[pos].AvanceIndividual.length > 2 ?  5 - data[0].Avance[pos].AvanceIndividual.filter(objeto  => objeto.Resultado === "CORRECTO").length : 5;
            
            if (data[0].Equipo === null) {
                if (pos === 0) {
                    situacion = "Eleccion Equipo";
                } else if (pos > 0) {
                    situacion = "Sala de espera";
                }
            } else if (data[0].Equipo !== null) {
                if(vecesTerminadoEsTrue < data[0].Integrantes.length ){
                if(pos === 0){   
                if(data[0].Integrantes[pos].Terminado === false){
                    situacion = "Jugar";
                }else if(data[0].Integrantes[pos].Terminado === true){
                    situacion = "Sala de espera";
                }
            }else if(pos >0){
                if(data[0].Integrantes[pos-1].Terminado === false && data[0].Integrantes[pos].Terminado === false ){
                    situacion = "Sala de espera";
                }else if(data[0].Integrantes[pos-1].Terminado === true && data[0].Integrantes[pos].Terminado === false ){
                    situacion = "Jugar";
                }else if(data[0].Integrantes[pos-1].Terminado === true && data[0].Integrantes[pos].Terminado === true ){
                    situacion = "Sala de espera";
                }
            }
        }else if(vecesTerminadoEsTrue === data[0].Integrantes.length){
            situacion = "Podio";

        }
            }
            res.json({
                _id: data[0]._id,
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
                FaltaPorCompletar:faltaPorCompletar,
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
        let id = req.body.idDeBase ;
        console.log(id)
        const data = await Grupos.updateOne({ _id: id }, {
            'Equipo': input.Equipo,
            'Juegos': input.TipoDeJuego,
        })
        const updetate = await EquipoConJuegos.updateOne({ _id: input._id }, { 'YaAsignado': true })
        res.json(updetate);
    } catch (error) {
        res.json([]);
    }

}


export const actualizarJuegoTerminado = async (req: Request, res: Response) => {
    try {
        const id = req.body.idOutput;
const pos = req.body.pos;
    const input = req.body.Avance;
    let medalla = ''
    let terminado = false
const filter = { _id: id };

const update = {
  $push: {
    [`Avance.${pos}.AvanceIndividual`]: { $each: input }
  }
};
        console.log(id)
        console.log(input)
        console.log(pos)
const options = { new: true, runValidators: true };
if(input.length <= 5){
const data = await Grupos.findOneAndUpdate(filter, update, options);

//----------
if (data !== null) {
  const cantidadCorrectos =  data!.Avance[pos].AvanceIndividual === null || data!.Avance[pos].AvanceIndividual === undefined  ? 0 : data.Avance[pos].AvanceIndividual.filter(objeto => objeto.Resultado === "CORRECTO").length; 

  if (cantidadCorrectos >= 5) {
    terminado = true;
  } else {
    terminado = false;
  }
  const update2 = {
    $set: {
        [`Integrantes.${pos}.Terminado`]: terminado
      }
  };
  const data2 = await Grupos.findOneAndUpdate(filter, update2, options);

  if(data2 !==null){
    const vecesTerminadoEsTrue = data2.Integrantes.filter(elemento => elemento.Terminado).length; 
    if(vecesTerminadoEsTrue === data2.Integrantes.length){
        const final = await Grupos.aggregate([
            {
              '$match': {
                'IdDeLaAsignacion': data2.IdDeLaAsignacion
              }
            }, {
              '$unwind': '$Avance'
            }, {
              '$project': {
                '_id': 1, 
                'integrantes': '$Integrantes', 
                'avanceIndividual': '$Avance.AvanceIndividual'
              }
            }, {
              '$group': {
                '_id': {
                  '_id': '$_id', 
                  'integrantes': '$integrantes'
                }, 
                'sumaAvanceIndividual': {
                  '$sum': {
                    '$size': '$avanceIndividual'
                  }
                }
              }
            }, {
              '$project': {
                '_id': '$_id._id', 
                'integrantes': '$_id.integrantes', 
                'sumaAvanceIndividual': 1
              }
            },{
                '$sort': {
                  'sumaAvanceIndividual': 1
                }
              }
          ])

          if(final!==null){
            for(let i=0; i < final.length;i++){
                if(final[i].sumaAvanceIndividual >0){
                    if(i===0){
                        medalla = "ORO"
                        
                    }
                    if(i===1){
                        medalla = "PLATA"
                    }
                    if(i>=2){
                        medalla = "BRONCE"
                    }
                }
            }
          }

    }
  }
  
  
  res.json(data2);
} else {
  res.json();
}
} else {
    res.json();
}
    } catch (error) {
        console.log(error)
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