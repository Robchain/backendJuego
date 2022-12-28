import {Request, Response} from 'express';
import { ICategory } from '../interface/Categoria.interface';
import { IVocabulary } from '../interface/Vocabulario.Interface';
import Vocabulario, {IRecursosVocabulario} from '../models/Administrador/RecursosVocabulario'
import { IJuegoV, IPrePartida, IVocabularioP, Palabra1Class } from '../interface/JuegoVoca.Interface';
import RecursosRompecabeza, {IRompecabeza} from '../models/Administrador/RecursosRompecabeza';
import Persona, {IPersona} from '../models/Administrador/Persona';
import Categoria from '../models/Administrador/Categoria';
import { IPuzzle } from '../interface/Rompecabeza.Interface';
import Rompecabeza from '../models/Administrador/RecursosRompecabeza';

//adasdasdasd

export const RecibirJson = async (req:Request, res:Response) => { 
  try {
    let rompecabeza = await rompecabezas();
    let juego1 = await partidas5();  
    let juego2 = await partidas5();
    let juego3 = await partidas5();
    let juego4 = await partidas5();
    let juego5 = await partidas5();

    res.json({rompecabeza,juego1, juego2, juego3, juego4, juego5})

    } catch (error) {
      res.json(error)
    }
}

const partidas5 = async () =>  { 
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

  let final = {
    categoria : categoria[0],
    vocabulario :{correcto:vocabulario[0].correcto[0],incorrecto1:vocabulario[0].incorrecto[0]}

  }

return final;    
}


const rompecabezas =async () => {
  let rompecabeza  = [];
  
  rompecabeza = await Rompecabeza.aggregate([
    {
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
      $project: {
        correcto: {
          $arrayElemAt: ["$correcto", 0]
        },
        incorrecto: {
          $arrayElemAt: ["$incorrecto", 0]
        }
      }
    }
  ]);
  res.json( vocabulario);


}

