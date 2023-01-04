import {Request, Response} from 'express';
import Vocabulario from '../models/Administrador/RecursosVocabulario'
import PartidaVocabuario, {IPartidaVocabulario} from '../models/Juego/Vocabulario/PartidaVocabulario'
import Categoria from '../models/Administrador/Categoria';
import Rompecabeza from '../models/Administrador/RecursosRompecabeza';


export const RecibirJson = async (req:Request, res:Response) => { 
  try {
    let juego1 ={}
      let juego2 ={}
      let juego3 ={}
      let juego4 ={}
      let juego5 ={}
      let juego6={}
      let juego7={}
    let rompecabeza = await rompecabezas();
    if(rompecabeza.Pieza === 4){
       juego1 = await partidas5();  
       juego2 = await partidas5();
       juego3 = await partidas5();
       juego4 = await partidas5();
       juego5 = await partidas5();
       const PartidaVocabuarioN:IPartidaVocabulario  = new  PartidaVocabuario({
        Rompecabeza:rompecabeza,
        Juego1:juego1,
        Juego2:juego2,
        Juego3:juego3,
        Juego4:juego4,
        Juego5:juego5,
    })
    PartidaVocabuarioN.save();
      res.json({rompecabeza,juego1, juego2, juego3, juego4, juego5})
    }else if(rompecabeza.Pieza===6){
      juego1 = await partidas5();  
      juego2 = await partidas5();
      juego3 = await partidas5();
      juego4 = await partidas5();
      juego5 = await partidas5();
      juego6=await partidas5();
      juego7=await partidas5();
      const PartidaVocabuarioN:IPartidaVocabulario  = new   PartidaVocabuario({
        Rompecabeza:rompecabeza,
        Juego1:juego1,
        Juego2:juego2,
        Juego3:juego3,
        Juego4:juego4,
        Juego5:juego5,
        Juego6:juego6,
        Juego7:juego7
    })
    PartidaVocabuarioN.save();
      res.json({rompecabeza,juego1, juego2, juego3, juego4, juego5, juego6, juego7})
    }
    } catch (error) {
      res.json(error)
    }
}

const partidas5 = async () =>  { 
  let vocabulario: any[] = [];
  let categoria = []; 
  let Palabras=[];

categoria = await Categoria.aggregate([
{
  '$sample': {
    'size': 1
  }
}, {
  '$limit': 1
}
]);
vocabulario = await  Vocabulario.aggregate([
  {
    '$match': {
      'Categoria': categoria[0].NombreCategoria
    }
  }, {
    '$sample': {
      'size': 3
    }
  },  {
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
if(vocabulario[0].correcto[0]){
  let arrayId = [vocabulario[0].correcto[0]._id.toString(), vocabulario[0].incorrecto[0]._id.toString(),vocabulario[0].incorrecto[1]._id.toString()]
  arrayId.sort();
  console.log(arrayId);
  Palabras = arrayId.map( x =>{
    if(vocabulario[0].correcto[0]._id.toString() === x){
      return vocabulario[0].correcto[0];
    }
    if(vocabulario[0].incorrecto[0]._id.toString() === x){
      return vocabulario[0].incorrecto[0];
    }
    if(vocabulario[0].incorrecto[1]._id.toString() === x){
      return vocabulario[0].incorrecto[1];
    }
  })
}

let final = {
  categoria : categoria[0],
  vocabulario:{
  Palabra1:Palabras[0],
  Palabra2:Palabras[1],
  Palabra3:Palabras[2],
}}
return final;    
}
//--------------------------
const rompecabezas =async () => {
  let rompecabeza  = [];
  
  rompecabeza = await Rompecabeza.aggregate([
    {
      '$match':{
        "Estado":true
      }
    }
    ,{
      '$sample': {
        'size': 1
      }
    }
  ]);
  
let final=rompecabeza[0];
return final;

};
export const testas = async (req:Request, res:Response) =>  { 
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
 vocabulario = await  Vocabulario.aggregate([
    {
      '$match': {
        'Categoria': categoria[0].NombreCategoria
      }
    }, {
      '$sample': {
        'size': 3
      }
    },  {
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
  res.json( vocabulario);
}

export const partidaEstudiante =async (req:Request, res:Response) => {
  try { 
 const respuesta = await  PartidaVocabuario.aggregate([
  {
    '$sample': {
      'size': 6
    }
  }
]);
res.json({Juego1:respuesta[0],Juego2:respuesta[1],Juego3:respuesta[2],Juego4:respuesta[3],Juego5:respuesta[4],Juego6:respuesta[5],}) 
  } catch (error) { 
    res.json(error)
  }
}


export const prueba = async (req:Request, res:Response) =>  { 
  let vocabulario: any[] = [];
    let categoria = []; 
    let Palabras=[];
  
  categoria = await Categoria.aggregate([
  {
    '$sample': {
      'size': 1
    }
  }, {
    '$limit': 1
  }
]);
 vocabulario = await  Vocabulario.aggregate([
    {
      '$match': {
        'Categoria': categoria[0].NombreCategoria
      }
    }, {
      '$sample': {
        'size': 3
      }
    },  {
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
  if(vocabulario[0].correcto[0]){
    let arrayId = [vocabulario[0].correcto[0]._id.toString(), vocabulario[0].incorrecto[0]._id.toString(),vocabulario[0].incorrecto[1]._id.toString()]
    arrayId.sort();
    console.log(arrayId);
    Palabras = arrayId.map( x =>{
      if(vocabulario[0].correcto[0]._id.toString() === x){
        return vocabulario[0].correcto[0];
      }
      if(vocabulario[0].incorrecto[0]._id.toString() === x){
        return vocabulario[0].incorrecto[0];
      }
      if(vocabulario[0].incorrecto[1]._id.toString() === x){
        return vocabulario[0].incorrecto[1];
      }
    })
  }

  let final = {
    categoria : categoria[0],
    Palabra1:Palabras[0],
    Palabra2:Palabras[1],
    Palabra3:Palabras[2],
  }
res.json(final);    
}