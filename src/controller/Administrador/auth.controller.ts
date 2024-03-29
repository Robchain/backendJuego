import { Request, Response } from 'express'
import Persona, { IPersona } from '../../models/Administrador/Persona';
import jwt from 'jsonwebtoken';
import { responseformualrio } from '../../lib';
import { cambiarCursoYParaleloDeLosJuegosCreadosVocabulario, crearJuegoVocabulario, crearJuegoVocabularioConCursoYParalelo } from './auth.JuegoVoca';
import HabilitarJuego from '../../models/Administrador/HabilitarJuego';
import { cambiarCursoYParaleloDeLosJuegosCreadosOracion, crearJuegoOraciones, crearJuegoOracionesConCursoYParalelo } from './auth.oracion';

//funcion del token 
function createToken(persona: IPersona) {
    return jwt.sign({ id: persona.id, Email: persona.Email }, process.env.TOKKEN_SCRET || 'tokendidactico', {
        expiresIn: '1d'
    });
}
export const getBase = (req:Request, res:Response)=>{
res.json("BIENVENIDO BLIPBLAP SERVICIO")
}
// para registrar usuario
export const signup = async (req: Request, res: Response) => {

    try {
        // guardando un nuevo usuario
        const persona: IPersona = new Persona({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Email: req.body.Email,
            Usuario: req.body.Usuario,
            FotoPerfil: req.body.FotoPerfil,
            Password: req.body.Password,
            TipoUsuario: req.body.TipoUsuario,
            Identificacion: req.body.Identificacion,
            Curso: req.body.Curso,
            Paralelo: req.body.Paralelo,
            Estado: "ACTIVO"
        })
        const personaSave = await persona.save();
        if(personaSave.TipoUsuario==="ESTUDIANTE"){
            const cursohabilitado = await HabilitarJuego.aggregate([
                {
                  '$match': {
                    'Curso': personaSave.Curso, 
                    'Paralelo': personaSave.Paralelo
                  }
                }, {
                  '$group': {
                    '_id': '$Juego', 
                    'documentos': {
                      '$push': '$$ROOT'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'TipoJuego': '$_id', 
                    'Documentos': '$documentos'
                  }
                }
              ]);
            if(cursohabilitado.some(obj=> obj.TipoJuego === "VOCABULARIO")){
                await   crearJuegoVocabulario(personaSave)
            }
            if(cursohabilitado.some(obj=> obj.TipoJuego === "ORACION")){
                await   crearJuegoOraciones(personaSave)
            }
           
        }
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Creado.Creado, "type": "success" });

    } catch (e: any) {
        res.json({ "titulo": "Error", "respuesta": `el dato: ${Object.keys(e.keyPattern)} ya existe`, "type": "error" })
        /*res.json(Object.keys(e.keyPattern))  */
    }

};
export const signupsinfoto = async (req: Request, res: Response) => {

    try {
        // guardando un nuevo usuario
        const persona: IPersona = new Persona({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Email: req.body.Email,
            Usuario: req.body.Usuario,
            FotoPerfil: "",
            Password: req.body.Password,
            TipoUsuario: req.body.TipoUsuario,
            Identificacion: req.body.Identificacion,
            Curso: req.body.Curso,
            Paralelo: req.body.Paralelo,
            Estado: "ACTIVO"
        })
        const personaSave = await persona.save();
        if(personaSave.TipoUsuario==="ESTUDIANTE"){
            const cursohabilitado = await HabilitarJuego.aggregate([
                {
                  '$match': {
                    'Curso': personaSave.Curso, 
                    'Paralelo': personaSave.Paralelo
                  }
                }, {
                  '$group': {
                    '_id': '$Juego', 
                    'documentos': {
                      '$push': '$$ROOT'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'TipoJuego': '$_id', 
                    'Documentos': '$documentos'
                  }
                }
              ]);
            if(cursohabilitado.some(obj=> obj.TipoJuego === "VOCABULARIO")){
                await   crearJuegoVocabulario(personaSave)
            }
            if(cursohabilitado.some(obj=> obj.TipoJuego === "ORACION")){
                await   crearJuegoOraciones(personaSave)
            }
           
        }
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Creado.Creado, "type": "success" });

    } catch (e: any) {
        res.json({ "titulo": "Error", "respuesta": `el dato: ${Object.keys(e.keyPattern)} ya existe`, "type": "error" })
        /*res.json(Object.keys(e.keyPattern))  */
    }

};
//para el login
export const signin = async (req: Request, res: Response) => {
    if (!req.body.Password || !req.body.Email) return res.status(400).json({ 'respuesta': 'falta correo y contraseña' })

    const persona = await Persona.findOne({ "Email": req.body.Email })

    if (!persona) return res.json({ 'respuesta': 'Correo o contraseña incorrecta' });
    const isMatch: boolean = await persona.compararPassword(req.body.Password)
    if (!isMatch) return res.json({ 'respuesta': "Contraseña incorrecta" });//res.status(400).json('Contraseña incorrecta');
    //crea el token
    //if(isMatch)  return res.header('t', createToken(persona)).json({});//lo envia 
    //if(isMatch)  return res.json({'token':createToken(persona)});//forma insegura de enviar el token
    if (isMatch) return res.json(persona);
}
// datos del usuario
export const profile = async (req: Request, res: Response) => {
    const user = await Persona.findById(req.body.personaId, { password: 0 });
    if (!user) return res.status(400).json('no User Found');
    res.json(user);
}
export const BuscarPorCursoYParalelo =async (req:Request, res:Response) => {
    try {
            const user = await Persona.find({Curso:req.body.Curso, Paralelo:req.body.Paralelo, TipoUsuario:"ESTUDIANTE"}, {password:0});
            if(user.length === 0){
                res.json([{value:"NO HAY ESTUDIANTES",label:"NO HAY ESTUDIANTES"}]);
            }else{
            let respuesta = user.map((item) => ({
            value: item.Identificacion,
            label: `${item.Nombre} ${item.Apellido}`
          }));
            res.json(respuesta);
        }    
    } catch (error) {
    res.status(500).json([{value:"NO HAY INFORMACION",label:"NO HAY INFORMACION"}]);
    }
}

export const perfilesActivosEstudiantes = async (req: Request, res: Response) => {
    try {
        const users = await Persona.aggregate([
            {
              '$match': {
                'TipoUsuario': 'ESTUDIANTE'
              }
            }, {
              '$sort': {
                'Curso': 1, 
                'Paralelo': 1
              }
            }
          ]);
        //{ TipoUsuario: "ESTUDIANTE"}, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 }
        res.json(users);
    } catch (error) {
        res.json([]);
    }
}
export const perfilesActivosMaestros = async (req: Request, res: Response) => {
    try {
        const users = await Persona.find({ TipoUsuario: "DOCENTE"}, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}

//perfiles no activos
export const perfilesNoActivos = async (req: Request, res: Response) => {
    try {
        const users = await Persona.find({}, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}
export const perfilesTotales = async (req: Request, res: Response) => {
    try {
        const users = await Persona.find({}, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}
export const borrarPerfiles = async (req: Request, res: Response) => {
    try {
        const usersd = await Persona.deleteMany({ Identificacion: req.body.Identificacion })
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Borrar.BorrarItem, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Borrar.NoBorrarItem, "type": "error" });
    }
}
export const editarUserConArchivo = async (req: Request, res: Response) => {
    try {
        const {Curso, Paralelo, Nombre, Apellido, Email, Usuario, FotoPerfil, TipoUsuario, Identificacion } = req.body;
        const Data = await Persona.findByIdAndUpdate({
            _id: req.body._id
        }, {
            $set: {
                Nombre: Nombre,
                Apellido: Apellido,
                Email: Email,
                Usuario: Usuario,
                FotoPerfil: FotoPerfil,
                TipoUsuario: TipoUsuario,
                Identificacion: Identificacion,
                Curso: Curso,
                Paralelo: Paralelo,
            }
        })
        if(Data?.TipoUsuario==="ESTUDIANTE"){
            if(Data?.Curso !== Curso || Data?.Paralelo !== Paralelo){
              await cambiarCursoYParaleloDeLosJuegosCreadosVocabulario({_id:Data._id, Curso:Curso, Paralelo:Paralelo})
          await cambiarCursoYParaleloDeLosJuegosCreadosOracion({_id:Data._id, Curso:Curso, Paralelo:Paralelo})
                const cursohabilitado = await HabilitarJuego.aggregate([
                    {
                      '$match': {
                        'Curso': Curso, 
                        'Paralelo': Paralelo
                      }
                    }, {
                      '$group': {
                        '_id': '$Juego', 
                        'documentos': {
                          '$push': '$$ROOT'
                        }
                      }
                    }, {
                      '$project': {
                        '_id': 0, 
                        'TipoJuego': '$_id', 
                        'Documentos': '$documentos'
                      }
                    }
                  ]);

                  if(cursohabilitado.length>0){  
                if(cursohabilitado.some(obj=> obj.TipoJuego === "VOCABULARIO")){
                    await   crearJuegoVocabularioConCursoYParalelo(Data, Curso, Paralelo)
                }
                if(cursohabilitado.some(obj=> obj.TipoJuego === "ORACION")){
                    await   crearJuegoOracionesConCursoYParalelo(Data, Curso, Paralelo)
                }
                  }
            }
        }

        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Editadar.editadoExito, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Editadar.editadoFracaso, "type": "error" })
    }
}

export const EditarsinArchivoUsuario = async (req: Request, res: Response) => {
    try {
        const {Nombre, Apellido, Email, Identificacion, Usuario, TipoUsuario, Curso, Paralelo} = req.body;
        const Data = await Persona.findByIdAndUpdate({
            _id: req.body._id
        }, {
            $set: {
                Nombre: Nombre,
                Apellido: Apellido,
                Email: Email,
                Identificacion: Identificacion,
                Usuario: Usuario,
                TipoUsuario: TipoUsuario,
                Curso: Curso,
                Paralelo: Paralelo,
            }
        })
      
        if(Data?.TipoUsuario==="ESTUDIANTE"){
        if(Data?.Curso !== Curso || Data?.Paralelo !== Paralelo){
          await cambiarCursoYParaleloDeLosJuegosCreadosVocabulario({_id:Data._id, Curso:Curso, Paralelo:Paralelo})
          await cambiarCursoYParaleloDeLosJuegosCreadosOracion({_id:Data._id, Curso:Curso, Paralelo:Paralelo})
            const cursohabilitado = await HabilitarJuego.aggregate([
                {
                  '$match': {
                    'Curso': Curso, 
                    'Paralelo': Paralelo
                  }
                }, {
                  '$group': {
                    '_id': '$Juego', 
                    'documentos': {
                      '$push': '$$ROOT'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'TipoJuego': '$_id', 
                    'Documentos': '$documentos'
                  }
                }
              ]);
              if(cursohabilitado.length>0){
            if(cursohabilitado.some(obj=> obj.TipoJuego === "VOCABULARIO")){
                await   crearJuegoVocabularioConCursoYParalelo(Data, Curso, Paralelo)
            }
            if(cursohabilitado.some(obj=> obj.TipoJuego === "ORACION")){
                await   crearJuegoOracionesConCursoYParalelo(Data, Curso, Paralelo)

            }
              }
        }
    }

        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Editadar.editadoExito, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Editadar.editadoFracaso, "type": "error" })
    }
}


export const desabilitarPersonas = async (req: Request, res: Response) => {
    try {
        const Data = await Persona.findByIdAndUpdate({
            _id: req.body._id
        }, {$set: {
                Estado:"INACTIVO"
            }})
            res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Desactivar.Desactivar, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Desactivar.NoDesactivar, "type": "error" })
    }
}
export const activarPersonas = async (req: Request, res: Response) => {
    try {
        const Data = await Persona.findByIdAndUpdate({
            _id: req.body._id
        }, {$set: {
                Estado:"ACTIVO"
            }})
            res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Activar.Activar, "type": "success" })
    } catch (error) {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Activar.NoActivar, "type": "error" })
    }
}
export const test = async (req: Request, res: Response) => {

    const Data = await Persona.findById(req.body._id)
    if (Data) {
        Data.Nombre = req.body.Nombre
        Data.Apellido = req.body.Apellido
        Data.Email = req.body.Email,
            Data.Usuario = req.body.Usuario,
            Data.FotoPerfil = req.body.FotoPerfil,
            Data.Password = req.body.Password,
            Data.TipoUsuario = req.body.TipoUsuario,
            Data.Identificacion = req.body.Identificacion,
            Data.Estado = req.body.Estado
        Data.save()
        res.json({ "titulo": "Excelente", "respuesta": responseformualrio.Editadar.editadoExito, "type": "success" })
    } else {
        res.json({ "titulo": "Error", "respuesta": responseformualrio.Editadar.editadoFracaso, "type": "error" })
    }

}
export const ActualizarContraseña = async (req: Request, res: Response) => {

    const Data = await Persona.findById(req.body._id)
    if (Data) {
            Data.Password = req.body.Password,
        Data.save()
        res.json({ "titulo": "Excelente", "respuesta": 'Contraseña actualizada con éxito', "type": "success" })
    } else {
        res.json({ "titulo": "Error", "respuesta": `No se pudo actualizar contraseña`, "type": "error" })
    }

}


export const SoloEstudiantes = async (req: Request, res: Response) => {
    try {
        const users = await Persona.find({ TipoUsuario: "ESTUDIANTE" }, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 });
        res.json(users);
    } catch (error) {
        res.json(error)
    }
}


export const MostrarMaestrosConSusEstudiantesPorCursos = async (req: Request, res: Response) => {

    try {
        const data = await Persona.find({
            TipoUsuario: "ESTUDIANTE",
            Curso: {
                $elemMatch: {
                    label: req.body.Curso.label,
                    value: req.body.Curso.value
                }
            },
            Paralelo: {
                $elemMatch: {
                    label: req.body.Paralelo.label,
                    value: req.body.Paralelo.value
                }
            }
        }, { 'createdAt': 0, 'updatedAt': 0, 'Password': 0 })
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}