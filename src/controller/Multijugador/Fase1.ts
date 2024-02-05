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

  res.json(data);
} else {
  res.json();
}
} else {
    res.json();
}
        //busca, encuentra, verifica si hay una antes, si no, lo guarda directemente, si si hay, captura la que estaba, anexa la nueva al final y guarda todo
    //     let id = req.body.idOutput;
    //     let input:any[] = req.body.Avance;
    //     let pos = req.body.pos
    //     let finished:boolean=false
    //     console.log(id)
    //     console.log(input)
    //     console.log(pos)
    //     const data = await Grupos.findOne({_id:id});
    //     data!.Avance[0].AvanceIndividual = []
    //   await data!.save();
    //     res.json(data)
//         //-------
// console.log(data);
//         if (data !== null && input.length === 5) {
//             if (data.Avance[pos].AvanceIndividual !== null) {
//                 let aux = data.Avance[pos].AvanceIndividual;
//                 let nuevo = aux!.concat(input);
//                 data.Avance[pos].AvanceIndividual = nuevo;
//                 const cantidadCorrectos = nuevo.filter(objeto => objeto.Resultado === "CORRECTO").length;
//                 if(cantidadCorrectos >= 5){
//                     finished=true;
//                 }else{
//                     finished = false;
//                 }
//                 data.Integrantes[pos].Terminado=finished;
//                 await data.save();
//                 res.json(data)
//             } else if (data.Avance[pos].AvanceIndividual === null) {
//                 data.Avance[pos].AvanceIndividual = input;
//                 console.log(data.Avance[pos].AvanceIndividual)
//                 const cantidadCorrectos =  data.Avance[pos].AvanceIndividual!.filter(objeto  => objeto.Resultado === "CORRECTO").length;
//                 if(cantidadCorrectos >= 5){
//                     finished=true;
                    
//                 }else{
//                     finished = false;
//                 }
//                 data.Integrantes[pos].Terminado=finished;
//                 await data.save();
//                 console.log(data);
//                 res.json(data)
//             }
         
//         } else {
//             //no hay data
//             res.json()
//         }
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