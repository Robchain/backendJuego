import { Request, Response } from 'express';
import Vocabulario from '../models/Administrador/RecursosVocabulario'
import PartidaVocabuario from '../models/Juego/Vocabulario/PartidaVocabulario'
import Categoria from '../models/Administrador/Categoria';
import Rompecabeza from '../models/Administrador/RecursosRompecabeza';
import JugadoresConVocabularios from '../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios';

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
    if(parseInt(piezas) !== 4 && parseInt(piezas) !==6){
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
//-------------------------------
export const CreaciondePartidasIndividualesVocabulario = async () => {
  let vocabulario: any[] = [];
  let categoria = [];
  let Palabras = [];
  
  categoria = await Vocabulario.aggregate([
    {
      '$match': {
        'Estado': 'ACTIVO'
      }
    }, {
      '$group': {
        '_id': '$Categoria', 
        'total': {
          '$sum': 1
        }
      }
    }, {
      '$match': {
        'total': {
          '$gte': 3
        }
      }
    }, {
      '$project': {
        '_id': 1
      }
    }, {
      '$sample': {
        'size': 1
      }
    }
  ]);
  vocabulario = await Vocabulario.aggregate([
    {
      '$match': {
        'Categoria': categoria[0]._id,
        'Estado':"ACTIVO"
      }
    }, {
      '$sample': {
        'size': 3
      }
    }, {
      $facet: {
        correcto: [
          {
            $addFields: {
              Respuesta: "CORRECTO"
            }
          },
          {
            $limit: 1
          }
        ],
        incorrecto: [
          {
            $addFields: {
              Respuesta: "INCORRECTO"
            }
          },
          {
            $skip: 1
          }
        ]
      }
    },
  ]);

  if (vocabulario[0].correcto[0]) {
    let arrayId = [vocabulario[0].correcto[0]._id.toString(), vocabulario[0].incorrecto[0]._id.toString(), vocabulario[0].incorrecto[1]._id.toString()]
    arrayId.sort();
    Palabras = arrayId.map(x => {
      if (vocabulario[0].correcto[0]._id.toString() === x) {
        return vocabulario[0].correcto[0];
      }
      if (vocabulario[0].incorrecto[0]._id.toString() === x) {
        return vocabulario[0].incorrecto[0];
      }
      if (vocabulario[0].incorrecto[1]._id.toString() === x) {
        return vocabulario[0].incorrecto[1];
      }
    })
  }

  let final = {
    categoria: categoria[0],
    Palabras
  }
  return final;
}
//--------------------------
export const rompecabezas = async () => {
  let rompecabeza = [];

  rompecabeza = await Rompecabeza.aggregate([
    {
      '$match': {
        "Estado": "ACTIVO"
      }
    }
    , {
      '$sample': {
        'size': 1
      }
    }
  ]);

  let final = rompecabeza[0];
  return final;
};
export const testas = async (req: Request, res: Response) => {
  let vocabulario = [];
  let categoria = [];

  categoria = await Categoria.aggregate([
    {
      '$sample': {
        'size': 1
      }
    }, {
      '$limit': 1
    }
  ]);
  vocabulario = await Vocabulario.aggregate([
    {
      '$match': {
        'Categoria': categoria[0].NombreCategoria
      }
    }, {
      '$sample': {
        'size': 3
      }
    }, {
      $facet: {
        correcto: [
          {
            $addFields: {
              Respuesta: "correcto"
            }
          },
          {
            $limit: 1
          }
        ],
        incorrecto: [
          {
            $addFields: {
              Respuesta: "incorrecto"
            }
          },
          {
            $skip: 1
          }
        ]
      }
    },
    {
      $unwind: "$correcto"
    },
  ]);
  res.json(vocabulario);
}

export const partidaEstudiantess = async (req: Request, res: Response) => {
  let Terminado = false;
  let modelo1;
  let modelo2;
  let modelo3;
  let modelo4;
  let modelo5;
  let modelo6;
  try {
    const respuesta = await PartidaVocabuario.find().limit(6);
    modelo1 = modeloPartida(respuesta[0].Rompecabeza.Pieza);
    modelo2 = modeloPartida(respuesta[1].Rompecabeza.Pieza);
    modelo3 = modeloPartida(respuesta[2].Rompecabeza.Pieza);
    modelo4 = modeloPartida(respuesta[3].Rompecabeza.Pieza);
    modelo5 = modeloPartida(respuesta[4].Rompecabeza.Pieza);
    modelo6 = modeloPartida(respuesta[5].Rompecabeza.Pieza);
    res.json({ Juego1: { Juego: respuesta[0], Avances0: modelo1 }, Juego2: { Juego: respuesta[1], Avance1: modelo2 }, Juego3: { Juego: respuesta[2], Avance2: modelo3 }, Juego4: { Juego: respuesta[3], Avance2: modelo4 }, Juego5: { Juego: respuesta[4], Avance4: modelo5 }, Juego6: { Juego: respuesta[5], Avance5: modelo6 } })
  } catch (error) {
    res.json(error)
  }
}

export const partidaEstudiante = async (req: Request, res: Response) => {
  try {
    const respuesta = await PartidaVocabuario.aggregate([
      {
        '$sample': {
          'size': 6
        }
      }
    ]);

    res.json({ Juego1: respuesta[0], Juego2: respuesta[1], Juego3: respuesta[2], Juego4: respuesta[3], Juego5: respuesta[4], Juego6: respuesta[5], })
  } catch (error) {
    res.json(error)
  }
}


export const prueba = async (req: Request, res: Response) => {
  let vocabulario: any[] = [];
  let categoria = [];
  let Palabras = [];

  categoria = await Categoria.aggregate([
    {
      '$sample': {
        'size': 1
      }
    }, {
      '$limit': 1
    }
  ]);
  vocabulario = await Vocabulario.aggregate([
    {
      '$match': {
        'Categoria': categoria[0].NombreCategoria
      }
    }, {
      '$sample': {
        'size': 3
      }
    }, {
      $facet: {
        correcto: [
          {
            $addFields: {
              Respuesta: "CORRECTO"
            }
          },
          {
            $limit: 1
          }
        ],
        incorrecto: [
          {
            $addFields: {
              Respuesta: "INCORRECTO"
            }
          },
          {
            $skip: 1
          }
        ]
      }
    },
  ]);
  if (vocabulario[0].correcto[0]) {
    let arrayId = [vocabulario[0].correcto[0]._id.toString(), vocabulario[0].incorrecto[0]._id.toString(), vocabulario[0].incorrecto[1]._id.toString()]
    arrayId.sort();
    console.log(arrayId);
    Palabras = arrayId.map(x => {
      if (vocabulario[0].correcto[0]._id.toString() === x) {
        return vocabulario[0].correcto[0];
      }
      if (vocabulario[0].incorrecto[0]._id.toString() === x) {
        return vocabulario[0].incorrecto[0];
      }
      if (vocabulario[0].incorrecto[1]._id.toString() === x) {
        return vocabulario[0].incorrecto[1];
      }
    })
  }

  let final = {
    categoria: categoria[0],
    Palabra1: Palabras[0],
    Palabra2: Palabras[1],
    Palabra3: Palabras[2],
  }
  res.json(final);
}

// MODELO BASE
export const modeloPartida = (rompecabeza: number) => {
  let modelo = {
    PalabraCorrecta: "SIN JUGAR",
    PalabraSeleccionada: "SIN JUGAR",
    Resultado: "SIN JUAGAR",
    Terminado: false
  };
  let Juego1 = {};
  let Juego2 = {};
  let Juego3 = {};
  let Juego4 = {};
  let Juego5 = {};
  let Juego6 = {};
  let Juego7 = {};
  let Terminado = false;
  try {
    if (4 === rompecabeza) {
      Juego1 = modelo;
      Juego2 = modelo;
      Juego3 = modelo;
      Juego4 = modelo;
      Juego5 = modelo;
      return { Juego1, Juego2, Juego3, Juego4, Juego5, Terminado }
    }
    if (6 === rompecabeza) {
      Juego1 = modelo;
      Juego2 = modelo;
      Juego3 = modelo;
      Juego4 = modelo;
      Juego5 = modelo;
      Juego6 = modelo;
      Juego7 = modelo;
      return { Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7, Terminado };
    }
  } catch (error) {
    return `error al guardar el model de la partida${error}`
  }
}


//
export const AdjuntarPartidaVocabulario = async (req: Request, res: Response) => {
  try {
    const respuesta = await PartidaVocabuario.aggregate([
      {
        '$sample': {
          'size': 6
        }
      }
    ]);
    res.json({ Juego1: respuesta[0], Juego2: respuesta[1], Juego3: respuesta[2], Juego4: respuesta[3], Juego5: respuesta[4], Juego6: respuesta[5], })
  } catch (error) {
    res.json(error)
  }
}


export const llamadaPartidaVocabulario = async (req: Request, res: Response) => {
  try {
    const objetos = await JugadoresConVocabularios.find({ "Estudiante.Usuario": req.body.Usuario }).limit(6);
   if(objetos.length >=1){
    res.json(objetos);
   }else {
    res.json(null);
   }
  } catch (error) {
res.status(500).json(null);
  }
}

// actualizacion

export const UpdateTerminadoVocabulario = async (req: Request, res: Response) => {
  try {
   let input:any[] = req.body.Avance
let finished:boolean=false
    if( input.length === 4 && input.filter(obj => obj.Resultado === "CORRECTO").length===4){
      finished=true;
    }else if(input.length === 5 && input.filter(obj => obj.Resultado === "CORRECTO").length===4){
      finished=true;
    }else if(input.length === 6 && input.filter(obj => obj.Resultado === "CORRECTO").length===6){
      finished=true;
    }else if(input.length === 7 && input.filter(obj => obj.Resultado === "CORRECTO").length===6){
      finished=true;
    }else{
      finished=false;
    }
    const dad = await JugadoresConVocabularios.findByIdAndUpdate({ _id: req.body.id }, {$set:
      {   
          Avance:input,
          Terminado:finished
      }});
      
    res.json(dad);
  } catch (error) {

  }
}

