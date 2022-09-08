import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { signup, signin,profile,perfiles } from "../controller/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos} from '../controller/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala} from '../controller/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala } from '../controller/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala } from '../controller/auth.categoria';
const router : Router = Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.get('/verRegistrados',perfiles)
//rompecabeza
router.post('/rompecabezaAdmi',subirRom);
router.get('/rompecabezaAdmi/buscarU',mostrarRom);
router.delete('/rompecabezaAdmi/borrar',borrarRom);
router.get('/rompecabezaAdmi/mostrartodo',mostrarRomTodos);
//vocabulario
router.post('/vocabularioAdmi',subirVocabulario);
router.get('/VocabularioAdmi/mostrartodo',mostrarVocaTodos);
router.get('/VocabularioAdmi/buscarU',mostrarVocaPala);
router.delete('/vocabularioAdmi/borrar',borrarVocabulario);
//Oracion
router.post('/OracionAdmi',subirOracion);
router.delete('/OracionAdmi/borrar',borrarOracion);
router.get('/OracionAdmi/mostrartodo',mostrarOracTodos);
router.get('/OracionAdmi/buscarU',mostrarOracPala);
//categoria
router.post('/Categoria',crearCategorias);
router.delete('/Categoria/borrar',borrarCategoria);
router.get('/Categoria/mostrartodo',mostrarCateTodos);
router.get('/Categoria/buscarU',mostrarCatePala);
//Equipo

//test de llamadas

//revisar los get y post, ver cual seria mejor o cuando usar cada uno


export default router;


