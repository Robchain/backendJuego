import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { SoloEstudiantes,signup, signin,profile,perfilesActivos,perfilesNoActivos,borrarPerfiles,editarUser,test,perfilesTotales } from "../controller/Administrador/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos,EditarRompecabeza} from '../controller/Administrador/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala, editarVocabulario, testvi} from '../controller/Administrador/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala,editarOracion } from '../controller/Administrador/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala,EditarCategoria } from '../controller/Administrador/auth.categoria';
import {CrearEquipo, CrearEquipoAuto,MostrarEquipo,EliminarEquipo, editarEquipo}    from '../controller/Administrador/auth.equipo';
import {ArmandoPartida} from '../controller/Juego/auth.vocabularioPartida'
import { /*partidaVocabularioInicial,*/ RecibirJson, testas,partidaEstudiante } from '../controller/auth.TestDeLlamada';
import { CrearEvento, PEvento } from '../controller/Administrador/auth.multiJugador';
const router : Router = Router();
router.post('/signup' ,signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.get('/Ver-Registrados-Activos', validarToken,perfilesActivos)
router.get('/perfilesNoActivos',perfilesNoActivos)
router.get('/perfilesTotales',perfilesTotales)
router.delete('/BorrarUsario', borrarPerfiles)
router.post('/EditarUsuario',test)
//rompecabeza
router.post('/rompecabezaAdmi',subirRom);
router.get('/rompecabezaAdmi/buscarU',mostrarRom);
router.delete('/rompecabezaAdmi/borrar',borrarRom);
router.get('/rompecabezaAdmi/mostrartodo',mostrarRomTodos);
router.post('/rompecabeza/Editar',EditarRompecabeza);
//vocabulario
router.post('/vocabularioAdmi',subirVocabulario);
router.get('/VocabularioAdmi/mostrartodo',mostrarVocaTodos);
router.get('/VocabularioAdmi/buscarU',mostrarVocaPala);
router.delete('/vocabularioAdmi/borrar',borrarVocabulario);
router.post('/vocabulario/Editar',editarVocabulario)
//Oracion
router.post('/OracionAdmi',subirOracion);
router.delete('/OracionAdmi/borrar',borrarOracion);
router.get('/OracionAdmi/mostrartodo',mostrarOracTodos);
router.get('/OracionAdmi/buscarU',mostrarOracPala);
router.post('/OracionAdmi/Editar',editarOracion);
//categoria
router.post('/Categoria',crearCategorias);
router.delete('/Categoria/borrar',borrarCategoria);
router.get('/Categoria/mostrartodo',mostrarCateTodos);
router.get('/Categoria/buscarU',mostrarCatePala);
router.post('/Categoria/Editar',EditarCategoria)
//Equipo
router.get('/Equipo/automatico', CrearEquipoAuto);
router.get('/Equipo/mostrartodo',MostrarEquipo);
router.post('/Equipo', CrearEquipo)
router.delete('/Equipo/Eliminar',EliminarEquipo)
router.post('/Equipo/editar',editarEquipo)
//MultiJugador
router.post('/MultiJugador', CrearEvento)
router.get('/MultiJugador/Presentacion', PEvento)
//armar partidas
router.get('/partidaVocabularioInicial',testas)
//test de llamadas
router.get('/CallMatch',ArmandoPartida )
router.get('/testa',testvi)
router.get('/Listado-Estudiante', SoloEstudiantes)
router.get('/RecibidoPrueba',RecibirJson)
router.get('/partidaEstudiante',partidaEstudiante);
//revisar los get y post, ver cual seria   mejor o cuando usar cada uno

export default router;


