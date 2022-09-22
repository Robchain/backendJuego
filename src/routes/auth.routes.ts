import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { signup, signin,profile,perfiles,borrarPerfiles,editarUser,test } from "../controller/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos,EditarRompecabeza} from '../controller/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala, editarVocabulario} from '../controller/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala,editarOracion } from '../controller/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala,EditarCategoria } from '../controller/auth.categoria';
import {CrearEquipo, CrearEquipoAuto,MostrarEquipo,EliminarEquipo, editarEquipo}    from '../controller/auth.equipo';
const router : Router = Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.get('/verRegistrados',perfiles)
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
//test de llamadas

//revisar los get y post, ver cual seria mejor o cuando usar cada uno


export default router;


