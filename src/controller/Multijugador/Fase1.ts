import { Request, Response } from 'express';
import Grupos, { IGrupoDeTrabajo } from "../../models/Juego/Multijugador/Grupos"
import { IMultiJuga } from '../../models/Administrador/MultiJugador';
import { CreaciondePartidasIndividualesVocabulario } from '../auth.TestDeLlamada';
import { uniendoOracionesPorCategoria } from '../Juego/OracionPartidas';
import { IAvanceInter, IAvenceArriba, IPartidaMulti } from '../../interface/Multijugador/Grupos.Interface';
import EquipoConJuegos, { IEquipoConJuego } from '../../models/Administrador/EquipoConJuegos';
import EquipoBase from '../../models/Administrador/Equipo';

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


const Los5Juegos = async () => {
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



export const DevuelveLaPosicionDentroDelArray = async (req: Request, res: Response) => {
    try {
     let  value= req.body.value;
       let label=  req.body.label;
       let objetoaBuscar = {label:label,value:value}
       const data = await Grupos.find({"Integrantes":{
        $elemMatch: {
            label:label,
            value: value
        }
      }}, { 'createdAt': 0, 'updatedAt': 0});

    let pos = data[0].Integrantes.findIndex(obj =>JSON.stringify(obj) === JSON.stringify(objetoaBuscar));
        res.json({ _id:data[0].id,
            IdDeLaAsignacion:data[0].IdDeLaAsignacion,
            Equipo: data[0].Equipo,
            Integrantes:data[0].Integrantes,
            Juegos: data[0].Juegos,
            Avance: data[0].Avance,
            FechaDeInicio: data[0].FechaDeInicio,
            FechaDeFin: data[0].FechaDeFin,
            Estado:data[0].Estado,
            Posicion:pos});
    } catch (error) {
        res.json(error);
    }
}

export const UneIntegrantesConJuegos =async (req:Request, res:Response) => {
try {
       let input =  req.body.BaseUno as IEquipoConJuego;
       const data  = await  Grupos.updateOne({_id:req.body.idDeBase},{
        'Equipo':input.Equipo,
        'Juegos':input.Juegos,
        'Avance':input.Avance
       })
    res.json(data);
} catch (error) {
    res.json(error);
}

}
export const actualizarJuego1 =async (req:Request, res:Response) => {
    
    try {
        let   indice = req.body.indice as number;
        
       const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
        $set:{
            [`Avance.${indice}.Juego1.PalabraCorrecta`]:req.body.PalabraCorrecta,
            [`Avance.${indice}.Juego1.PalabraSeleccionada`]:req.body.PalabraSeleccionada,
            [`Avance.${indice}.Juego1.Resultado`]:req.body.Resultado,
            [`Avance.${indice}.Juego1.Terminado`]:req.body.Terminado
           }})
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}
export const actualizarJuego2 =async (req:Request, res:Response) => {
    
    try {
        let   indice = req.body.indice as Number;
        const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
            $set:{
                [`Avance.${indice}.Juego2.PalabraCorrecta`]:req.body.PalabraCorrecta,
                [`Avance.${indice}.Juego2.PalabraSeleccionada`]:req.body.PalabraSeleccionada,
                [`Avance.${indice}.Juego2.Resultado`]:req.body.Resultado,
                [`Avance.${indice}.Juego2.Terminado`]:req.body.Terminado
               }})
            res.json(data)
    } catch (error) {
        res.json(error)
    }
}
export const actualizarJuego3 =async (req:Request, res:Response) => {
    
    try {
        let   indice = req.body.indice as Number;
        const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
            $set:{
                [`Avance.${indice}.Juego3.PalabraCorrecta`]:req.body.PalabraCorrecta,
                [`Avance.${indice}.Juego3.PalabraSeleccionada`]:req.body.PalabraSeleccionada,
                [`Avance.${indice}.Juego3.Resultado`]:req.body.Resultado,
                [`Avance.${indice}.Juego3.Terminado`]:req.body.Terminado
               }})
            res.json(data)
    } catch (error) {
        res.json(error)
    }
}
export const actualizarJuego4 =async (req:Request, res:Response) => {
    
    try {
        let   indice = req.body.indice as Number;
        const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
            $set:{
                [`Avance.${indice}.Juego4.PalabraCorrecta`]:req.body.PalabraCorrecta,
                [`Avance.${indice}.Juego4.PalabraSeleccionada`]:req.body.PalabraSeleccionada,
                [`Avance.${indice}.Juego4.Resultado`]:req.body.Resultado,
                [`Avance.${indice}.Juego4.Terminado`]:req.body.Terminado
               }})
            res.json(data)
    } catch (error) {
        res.json(error)
    }
}
export const actualizarJuego5 =async (req:Request, res:Response) => {
    
    try {
        let   indice = req.body.indice as Number;
        const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
            $set:{
                [`Avance.${indice}.Juego5.PalabraCorrecta`]:req.body.PalabraCorrecta,
                [`Avance.${indice}.Juego5.PalabraSeleccionada`]:req.body.PalabraSeleccionada,
                [`Avance.${indice}.Juego5.Resultado`]:req.body.Resultado,
                [`Avance.${indice}.Juego5.Terminado`]:req.body.Terminado
               }})
            res.json(data)
    } catch (error) {
        res.json(error)
    }
}
export const actualizarJuegoTerminado =async (req:Request, res:Response) => {
    try {
        let   indice = req.body.indice as Number;
        const data  = await  Grupos.updateOne({_id:req.body.idOutput},{
            $set:{
                [`Avance.${indice}.Terminado`]:req.body.Terminado,
               }})
            res.json(data)
    } catch (error) {
        res.json(error)
    }
}