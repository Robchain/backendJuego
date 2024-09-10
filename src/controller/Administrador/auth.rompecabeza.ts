import { responseformualrio } from "../../lib";
import HabilitarJuego from "../../models/Administrador/HabilitarJuego";
import Persona from "../../models/Administrador/Persona";
import Rompecabeza, { IRompecabeza } from "../../models/Administrador/RecursosRompecabeza";
import { Request, Response } from "express";
import mongoose from 'mongoose';
import { crearJuegoVocabularioIndividualAsignar } from "./auth.JuegoVoca";
import { crearJuegoOracionrioIndividualAsignar } from "./auth.oracion";
import JugadoresConOraciones from "../../models/Jugadores/JugadoresOracion/JugadoresConOraciones";
import JugadoresConVocabularios from "../../models/Jugadores/JugadoresVocabulario/JugadoresConVocabularios";
export const subirRom = async (req: Request, res: Response) => {
    try {
        const rompecabeza: IRompecabeza = new Rompecabeza({
            Nombre: req.body.Nombre,
            Pieza: req.body.Pieza,
            FileBlanco: req.body.FileBlanco,
            FileColor: req.body.FileColor,
            Juego: obtenerFraseAlAzar(),
            Estado: "ACTIVO"
        })
        const rompecabezaGuardar = await rompecabeza.save();


        
        if (rompecabezaGuardar.Juego === "VOCABULARIO") {
            await AsiganarNuevaRompecabezaVocabulario(rompecabezaGuardar);
        }

        if (rompecabezaGuardar.Juego === "ORACION") {
            await AsiganarNuevaRompecabezaOracion(rompecabezaGuardar);
        }

        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Creado.Creado, "type": "success" })
    } catch (e: any) {
        res.json({ "titulo": "Error", "respuesta": `el dato: ${Object.keys(e.keyPattern)} ya existe`, "type": "error" })
    }
}
//borra todas las coincidencia
export const borrarRom = async (req: Request, res: Response) => {
    try {
        const data = await Rompecabeza.deleteOne({ _id: req.body._id });
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Borrar.BorrarItem, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Borrar.NoBorrarItem, "type": "error" });
    }
}
//muestra las coincidencia
export const mostrarRom = async (req: Request, res: Response) => {
    try {
        const imagenM = await Rompecabeza.find({ Nombre: req.body.Nombre });
        res.json(imagenM);
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Mostrar.NoMostrar, "type": "error" });;
    }
}
//muestra todos
export const mostrarRomTodos = async (req: Request, res: Response) => {
    try {
        const imagenM = await Rompecabeza.find({}, { "createdAt": 0, "updatedAt": 0 });
        res.json(imagenM);
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Mostrar.NoMostrar, "type": "error" });;
    }
}
export const DesibilitarRompecabeza = async (req: Request, res: Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({ _id: req.body._id },
            {
                $set:
                {
                    Estado: "INACTIVO"
                }
            })
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Desactivar.Desactivar, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Desactivar.NoDesactivar, "type": "error" });
    }
}
export const HabilitarRompecabeza = async (req: Request, res: Response) => {
    try {
        const data = await Rompecabeza.findByIdAndUpdate({ _id: req.body._id },
            {
                $set:
                {
                    Estado: "ACTIVO"
                }
            })
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Activar.Activar, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Activar.NoActivar, "type": "error" });
    }
}


export const EditarRompecabeza = async (req: Request, res: Response) => {
    try {
        const { _id, Nombre, Pieza, FileBlanco, FileColor } = req.body;
        const objectId = new mongoose.Types.ObjectId(_id);
        const data = await Rompecabeza.findByIdAndUpdate({
            _id: objectId
        }, {
            $set: {
                Nombre: Nombre,
                Pieza: Pieza,
                FileBlanco: FileBlanco,
                FileColor: FileColor,
            }
        })

        // verifica si es oracion o vocabulario, busca en los juegos asignados, y actualiza todos los juegos con su rompecabeza buscado por id

        if (data?.Juego === "ORACION") {
            JugadoresConOraciones.updateMany({ "Rompecabeza._id": objectId }, {
                $set: {
                    "Rompecabeza.Nombre": Nombre,
                    "Rompecabeza.Pieza": Pieza,
                    "Rompecabeza.FileBlanco": FileBlanco,
                    "Rompecabeza.FileColor": FileColor,
                }
            })
        }

        if (data?.Juego === "VOCABULARIO") {
            JugadoresConVocabularios.updateMany({ "Rompecabeza._id": objectId }, {
                $set: {
                    "Rompecabeza.Nombre": Nombre,
                    "Rompecabeza.Pieza": Pieza,
                    "Rompecabeza.FileBlanco": FileBlanco,
                    "Rompecabeza.FileColor": FileColor,
                }
            })
        }
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Editadar.editadoExito, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Editadar.editadoFracaso, "type": "error" });
    }
}
export const EditarRompecabezaSinArchivo = async (req: Request, res: Response) => {
    try {
        const { _id, Nombre, Pieza } = req.body;
        const objectId = new mongoose.Types.ObjectId(_id);
        const data = await Rompecabeza.findByIdAndUpdate({
            _id: objectId
        }, {
            $set: {
                Nombre: Nombre,
                Pieza: Pieza,
            }
        })

        if (data?.Juego === "ORACION") {
            JugadoresConOraciones.updateMany({ "Rompecabeza._id": objectId }, {
                $set: {
                    "Rompecabeza.Nombre": Nombre,
                    "Rompecabeza.Pieza": Pieza
                }
            })
        }

        if (data?.Juego === "VOCABULARIO") {
            JugadoresConVocabularios.updateMany({ "Rompecabeza._id": objectId }, {
                $set: {
                    "Rompecabeza.Nombre": Nombre,
                    "Rompecabeza.Pieza": Pieza
                }
            })
        }
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Editadar.editadoExito, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Editadar.editadoFracaso, "type": "error" });
    }
}



const obtenerFraseAlAzar = (): string => {
    const opciones = ["VOCABULARIO", "ORACION"];
    const indiceAleatorio = Math.floor(Math.random() * opciones.length);
    return opciones[indiceAleatorio];
};



const AsiganarNuevaRompecabezaVocabulario = async (rompecabeza: any) => {
    // buscar cursos activos -> extrar curso y paralelos
    // buscar estudiantes por curso y paralelos para asignar este nuevo rompecabeza por cada uno que esta en estos cursos y paralelos
  try {
    const cursosYParalelosActivosPorJuego = await HabilitarJuego.aggregate([
        {
            '$match': {
                'Juego': 'VOCABULARIO',
            }
        }
    ]);
if(cursosYParalelosActivosPorJuego.length === 0){
    return;
}
    for (let i = 0; i <= cursosYParalelosActivosPorJuego.length; i++) {
        const estudiantes = await Persona.aggregate([
            {
                '$match': {
                    'Curso': cursosYParalelosActivosPorJuego[i].Curso,
                    'Paralelo': cursosYParalelosActivosPorJuego[i].Paralelo,
                    'TipoUsuario': 'ESTUDIANTE'
                }
            }
        ]);
        for (let j = 0; i <= estudiantes.length; j++) {
            await crearJuegoVocabularioIndividualAsignar({ estudiante: estudiantes[j], rompecabeza: rompecabeza })
        }
    }
  } catch (error) {
    console.log(error)
  }
}


const AsiganarNuevaRompecabezaOracion = async (rompecabeza: any) => {
    // buscar cursos activos -> extrar curso y paralelos
    // buscar estudiantes por curso y paralelos para asignar este nuevo rompecabeza por cada uno que esta en estos cursos y paralelos
    try {
        const cursosYParalelosActivosPorJuego = await HabilitarJuego.aggregate([
            {
                '$match': {
                    'Juego': 'ORACION',
                }
            }
        ])
        if(cursosYParalelosActivosPorJuego.length === 0){
            return;
        }
        for (let i = 0; i <= cursosYParalelosActivosPorJuego.length; i++) {
            const estudiantes = await Persona.aggregate([
                {
                    '$match': {
                        'Curso': cursosYParalelosActivosPorJuego[i].Curso,
                        'Paralelo': cursosYParalelosActivosPorJuego[i].Paralelo,
                        'TipoUsuario': 'ESTUDIANTE'
                    }
                }
            ]);
            for (let j = 0; i <= estudiantes.length; j++) {
                await crearJuegoOracionrioIndividualAsignar({ estudiante: estudiantes[j], rompecabeza: rompecabeza })
            }
        }
    } catch (error) {
        console.log(error)
    }
}