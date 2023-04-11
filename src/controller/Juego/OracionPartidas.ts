import RecursosOracion, {IRecursosOracion} from "../../models/Administrador/RecursosOracion";
import { Request, Response } from "express"
import PartidaOracion,{IPartidaOracion} from "../../models/Juego/Oracion/PartidaOracion";
import Rompecabeza from "../../models/Administrador/RecursosRompecabeza";
import CategoriaOraciones,{ICategoriaOraciones} from "../../models/Administrador/CategoriaOraciones";
import { IPersona } from "../../models/Administrador/Persona";
import JugadoresConOracion, { IJugadoresConOraciones } from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import { modeloPartida } from "../auth.TestDeLlamada";
//une un rompecabeza con un juego
export const armandoJuegosOracionesPorPiezas = async (req: Request, res: Response) => {
    try {
      let juego1 = {}
      let juego2 = {}
      let juego3 = {}
      let juego4 = {}
      let juego5 = {}
      let juego6 = {}
      let juego7 = {}
      let rompecabeza = await rompecabezas();
      if (rompecabeza.Pieza === 4) {
        juego1 = await uniendoOracionesPorCategoria();
        juego2 = await uniendoOracionesPorCategoria();
        juego3 = await uniendoOracionesPorCategoria();
        juego4 = await uniendoOracionesPorCategoria();
        juego5 = await uniendoOracionesPorCategoria();
        const PartidaOracionN: IPartidaOracion = new PartidaOracion({
          Rompecabeza: rompecabeza,
          Juego1: juego1,
          Juego2: juego2,
          Juego3: juego3,
          Juego4: juego4,
          Juego5: juego5,
        })
        PartidaOracionN.save();
        res.json({ rompecabeza, juego1, juego2, juego3, juego4, juego5 })
      } else if (rompecabeza.Pieza === 6) {
        juego1 = await uniendoOracionesPorCategoria();
        juego2 = await uniendoOracionesPorCategoria();
        juego3 = await uniendoOracionesPorCategoria();
        juego4 = await uniendoOracionesPorCategoria();
        juego5 = await uniendoOracionesPorCategoria();
        juego6 = await uniendoOracionesPorCategoria();
        juego7 = await uniendoOracionesPorCategoria();
        const PartidaOracionN: IPartidaOracion = new PartidaOracion({
          Rompecabeza: rompecabeza,
          Juego1: juego1,
          Juego2: juego2,
          Juego3: juego3,
          Juego4: juego4,
          Juego5: juego5,
          Juego6: juego6,
          Juego7: juego7
        })
        PartidaOracionN.save();
        res.json({ rompecabeza, juego1, juego2, juego3, juego4, juego5, juego6, juego7 })
      }
    } catch (error) {
      res.json(error)
    }
  }

//une oraciones por categoria
export const uniendoOracionesPorCategoria= async ()=>{
   let categoriaOra = [];
   let oraciones:any[]=[];
   let Palabras = [];
   categoriaOra = await CategoriaOraciones.aggregate([{
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
        Palabras = arrayId.map(x => {
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
        Oraciones: {
          Oracion1: Palabras[0],
          Oracion2: Palabras[1],
          Oracion3: Palabras[2],
        },
        TipoPregunta:Seleccion(Palabras[0])
      }
     return final;
}
//busca un rompecabeza al azar
const rompecabezas = async () => {
    let rompecabeza = [];
  
    rompecabeza = await Rompecabeza.aggregate([
      {
        '$match': {
          "Estado": true
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
  
  export const UpdateTerminadoOracion1 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego1.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego1.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego1.Resultado': req.body.Resultado,
        'Avance.Juego1.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion2 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego2.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego2.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego2.Resultado': req.body.Resultado,
        'Avance.Juego2.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion3 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego3.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego3.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego3.Resultado': req.body.Resultado,
        'Avance.Juego3.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion4 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego4.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego4.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego4.Resultado': req.body.Resultado,
        'Avance.Juego4.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion5 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego5.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego5.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego5.Resultado': req.body.Resultado,
        'Avance.Juego5.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion6 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego6.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego6.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego6.Resultado': req.body.Resultado,
        'Avance.Juego6.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracion7 = async (req: Request, res: Response) => {
    try {
const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Juego7.PalabraCorrecta': req.body.PalabraCorrecta,
        'Avance.Juego7.PalabraSeleccionada': req.body.PalabraSeleccionada,
        'Avance.Juego7.Resultado': req.body.Resultado,
        'Avance.Juego7.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }
  export const UpdateTerminadoOracionFinal = async (req: Request, res: Response) => {
    try {
      const dad = await JugadoresConOracion.updateOne({ _id: req.body.id }, {
        'Avance.Terminado': req.body.Terminado
      });
      res.json(dad);
    } catch (error) {
  
    }
  }