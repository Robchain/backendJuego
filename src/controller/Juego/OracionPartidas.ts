import RecursosOracion, {IRecursosOracion} from "../../models/Administrador/RecursosOracion";
import { Request, Response } from "express"
import PartidaOracion from "../../models/Juego/Oracion/PartidaOracion";
import Rompecabeza from "../../models/Administrador/RecursosRompecabeza";
import CategoriaOraciones from "../../models/Administrador/CategoriaOraciones";
import { IPersona } from "../../models/Administrador/Persona";
import JugadoresConOracion, { IJugadoresConOraciones } from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import { modeloPartida } from "../auth.TestDeLlamada";
//une un rompecabeza con un juego
export const armandoJuegosOracionesPorPiezas = async (req: Request, res: Response) => {
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
        Juego1 = await uniendoOracionesPorCategoria();
        Juego2 = await uniendoOracionesPorCategoria();
        Juego3 = await uniendoOracionesPorCategoria();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await uniendoOracionesPorCategoria();
        res.json({ Juego1, Juego2, Juego3, Juego4, Juego5 })
      } else if (parseInt(piezas) === 6) {
        Juego1 = await uniendoOracionesPorCategoria();
        Juego2 = await uniendoOracionesPorCategoria();
        Juego3 = await uniendoOracionesPorCategoria();
        Juego4 = await uniendoOracionesPorCategoria();
        Juego5 = await uniendoOracionesPorCategoria();
        Juego6 = await uniendoOracionesPorCategoria();
        Juego7 = await uniendoOracionesPorCategoria();
        res.json({  Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7 })
      }
    } catch (error) {
      res.json(error)
    }
  }

//une oraciones por categoria
export const uniendoOracionesPorCategoria= async ()=>{
   let categoriaOra = [];
   let oraciones:any[]=[];
   let Oraciones = [];
   
    
   categoriaOra = await RecursosOracion.aggregate([
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
oraciones = await RecursosOracion.aggregate([
        {
          '$match': {
            'Categoria': categoriaOra[0]._id,
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
      
      if (oraciones[0].correcto[0]) {
        let arrayId = [oraciones[0].correcto[0]._id.toString(), oraciones[0].incorrecto[0]._id.toString(), oraciones[0].incorrecto[1]._id.toString()]
        arrayId.sort();
        Oraciones = arrayId.map(x => {
          if (oraciones[0].correcto[0]._id.toString() === x) {
            return oraciones[0].correcto[0];
          }
          if (oraciones[0].incorrecto[0]._id.toString() === x) {
            return oraciones[0].incorrecto[0];
          }
          if (oraciones[0].incorrecto[1]._id.toString() === x) {
            return oraciones[0].incorrecto[1];
          }
        })
      }
      
      
      
      let final = {
        Categoria: categoriaOra[0],
        Oraciones,
        TipoPregunta:Seleccion(Oraciones[0])
      }
     return final;
}
//busca un rompecabeza al azar
const rompecabezas = async () => {
  let categoriaOra = [];
  let oraciones:any[]=[];
  let Oraciones = [];
   
  categoriaOra = await CategoriaOraciones.aggregate([{'$match': {
     'Estado': 'ACTIVO'
   }
 }, 
 {
     '$sample': {
       'size': 1
     }
   }, {
     '$limit': 1
   }
]);
oraciones = await RecursosOracion.aggregate([
  {
    '$match': {
      'Categoria': categoriaOra[0].NombreCategoria
    }
  },
  {
    '$sample': {
      'size': 3
    }
  },
  {
    '$group': {
      '_id': '$Sujeto.label',
      'docs': {
        '$push': '$$ROOT'
      }
    }
  },
  {
    '$replaceRoot': {
      'newRoot': {
        '$arrayElemAt': ['$docs', 0]
      }
    }
  }
]);
  
  };


//esta unido al singup para enlazar las primeras piezas 6 rompecabezas
  export const UnirUsuarioConOraciones =async(personaSave:IPersona,  )=>{
    try {
        const partidaI = await PartidaOracion.find().limit(6);
        //UNO
        const juegosOracion:IJugadoresConOraciones = new JugadoresConOracion({
            Estudiante:{id:personaSave._id,
                Nombre:personaSave.Nombre,
                Usuario:personaSave.Usuario,
            },
            Partida:partidaI[0],
            Avance:modeloPartida(partidaI[0].Rompecabeza.Pieza),
        }); 
        juegosOracion.save();
//dos
const juegosOracion2:IJugadoresConOraciones = new JugadoresConOracion({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[1],
    Avance:modeloPartida(partidaI[1].Rompecabeza.Pieza),
});
juegosOracion2.save();
//tres
const juegosOracion3:IJugadoresConOraciones = new JugadoresConOracion({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[2],
    Avance:modeloPartida(partidaI[2].Rompecabeza.Pieza),
});
juegosOracion3.save();
//cuatro
const juegosOracion4:IJugadoresConOraciones = new JugadoresConOracion({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[3],
    Avance:modeloPartida(partidaI[3].Rompecabeza.Pieza),
});
juegosOracion4.save();

//cinco
const juegosOracion5:IJugadoresConOraciones = new JugadoresConOracion({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[4],
    Avance:modeloPartida(partidaI[4].Rompecabeza.Pieza),
});
juegosOracion5.save();
//seis
const juegosOracion6:IJugadoresConOraciones = new JugadoresConOracion({
    Estudiante:{id:personaSave._id,
        Nombre:personaSave.Nombre,
        Usuario:personaSave.Usuario,
    },
    Partida:partidaI[5],
    Avance:modeloPartida(partidaI[5].Rompecabeza.Pieza),
});
juegosOracion6.save();
  }catch(e){

  }
}
//------------------------------
export const llamadaPartidaOracion = async (req: Request, res: Response) => {
    try {
      const objetos = await JugadoresConOracion.find({ "Estudiante.Usuario": req.body.Usuario }).limit(6);
      if(objetos.length >=1){
        res.json(objetos)
      }else{
        res.json(null)
      }
    } catch (error) {
      res.status(500).json(null);
    }
  }



  const Seleccion =(palabra:IRecursosOracion)=>{
let opc=0;
    opc = randomBetween(1,4)
    if(palabra.Adverbio){
    switch (opc) {
      case 1:
        return "QUIEN";
        case 2:
        return "QUE";
    case 3 :
      return "ADVERBIO";
      case 4:
        return "TODOS";
      default:
        break;
    }
  }else{
    switch (opc) {
      case 1:
        return "QUIEN";
        case 2:
        return "QUE";
      default:
        return "TODOS";
  }
  }
}
  function randomBetween(a:number, b:number) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  
  export const UpdateTerminadoOracion = async (req: Request, res: Response) => {
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
const dad = await JugadoresConOracion.findByIdAndUpdate({ _id: req.body.id }, {$set:
  {   
      Avance:input,
        Terminado:finished
  }});
      res.json(dad);
    } catch (error) {
  
    }
  }
