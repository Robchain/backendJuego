import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { SoloEstudiantes,signup, signin,profile,perfilesActivos,perfilesNoActivos,borrarPerfiles,editarUser,test,perfilesTotales, MostrarMaestrosConSusEstudiantesPorCursos } from "../controller/Administrador/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos,EditarRompecabeza} from '../controller/Administrador/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala, editarVocabulario, testvi} from '../controller/Administrador/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala,editarOracion } from '../controller/Administrador/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala,EditarCategoria } from '../controller/Administrador/auth.categoria';
import {CrearEquipo, CrearEquipoAuto,MostrarEquipo,EliminarEquipo, editarEquipo}    from '../controller/Administrador/auth.equipo';
import {ArmandoPartida} from '../controller/Juego/auth.vocabularioPartida'
import { /*partidaVocabularioInicial,*/ RecibirJson, testas,/*partidaEstudiante*/ prueba, llamadaPartidaVocabulario, UpdateTerminadoVocabulario1, UpdateTerminadoVocabulario2, UpdateTerminadoVocabulario3, UpdateTerminadoVocabulario4, UpdateTerminadoVocabulario5, UpdateTerminadoVocabulario6, UpdateTerminadoVocabulario7, UpdateTerminadoVocabularioFinal  } from '../controller/auth.TestDeLlamada';
import { CrearEvento, PEvento } from '../controller/Administrador/auth.multiJugador';
import { armandoJuegosOracionesPorPiezas, llamadaPartidaOracion, UpdateTerminadoOracion1, UpdateTerminadoOracion2, UpdateTerminadoOracion3, UpdateTerminadoOracion4, UpdateTerminadoOracion5, UpdateTerminadoOracion6, UpdateTerminadoOracion7, UpdateTerminadoOracionFinal } from '../controller/Juego/OracionPartidas';
import { borrarCategoriaOracion, crearCategoriasOraciones, EditarCategoriaOracion } from '../controller/Administrador/CategoriaOracionesController';
import { actualizarJuego1, actualizarJuego2, actualizarJuego3, actualizarJuego4, actualizarJuego5, actualizarJuegoTerminado, DevuelveLaPosicionDentroDelArray, LlamadaDeJuegosBasesPorAsignar, UneIntegrantesConJuegos } from '../controller/Multijugador/Fase1';

const router : Router = Router();
router.post('/signup' ,signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.get('/Ver-Registrados-Activos',perfilesActivos)
router.get('/perfilesNoActivos',perfilesNoActivos)
router.get('/perfilesTotales',perfilesTotales)
router.delete('/BorrarUsario', borrarPerfiles)
router.post('/EditarUsuario',test)
router.post('/MostrarEstudianteConSusEstudiantes', MostrarMaestrosConSusEstudiantesPorCursos),
//rompecabeza
router.post('/rompecabezaAdmi',subirRom);
router.get('/rompecabezaAdmi/buscarU',mostrarRom);
router.post('/rompecabezaAdmi/borrar',borrarRom);
router.get('/rompecabezaAdmi/mostrartodo',mostrarRomTodos);
router.post('/rompecabeza/Editar',EditarRompecabeza);
//vocabulario
router.post('/vocabularioAdmi',subirVocabulario);
router.get('/VocabularioAdmi/mostrartodo',mostrarVocaTodos);
router.get('/VocabularioAdmi/buscarU',mostrarVocaPala);
router.post('/vocabularioAdmi/borrar',borrarVocabulario);
router.post('/vocabulario/Editar',editarVocabulario)
//Oracion
router.post('/OracionAdmi',subirOracion);
router.post('/OracionAdmi/borrar',borrarOracion);
router.get('/OracionAdmi/mostrartodo',mostrarOracTodos);
router.get('/OracionAdmi/buscarU',mostrarOracPala);
router.post('/OracionAdmi/Editar',editarOracion);
//categoria
router.post('/Categoria',crearCategorias);
router.post('/Categoria/borrar',borrarCategoria);
router.get('/Categoria/mostrartodo',mostrarCateTodos);
router.get('/Categoria/buscarU',mostrarCatePala);
router.post('/Categoria/Editar',EditarCategoria)
//categoria de oraciones *CREAR EL RESTO DEL CRUD*
router.get("/Categoria/Mostartodos/Oracion", crearCategoriasOraciones);
router.post("/Categoria/Borrar/OracionCategoria", borrarCategoriaOracion);
router.post("/Categoria/Editar/OracionCategoria",EditarCategoriaOracion)
//Equipo
router.get('/Equipo/automatico', CrearEquipoAuto);
router.get('/Equipo/mostrartodo',MostrarEquipo);
router.post('/Equipo', CrearEquipo)
router.post('/Equipo/Eliminar',EliminarEquipo)
router.post('/Equipo/editar',editarEquipo)
//MultiJugador
router.post('/MultiJugador', CrearEvento)
router.get('/MultiJugador/Presentacion', PEvento)
//armar partidas
router.get('/partidaVocabularioInicial',testas)
//Juego Vocabulario
router.post("/llamadaPartidaVocabulario",  llamadaPartidaVocabulario)
router.post("/UpdateTerminadoVocabulario1", UpdateTerminadoVocabulario1)
router.post("/UpdateTerminadoVocabulario2", UpdateTerminadoVocabulario2);
router.post("/UpdateTerminadoVocabulario3", UpdateTerminadoVocabulario3);
router.post("/UpdateTerminadoVocabulario4", UpdateTerminadoVocabulario4);
router.post("/UpdateTerminadoVocabulario5", UpdateTerminadoVocabulario5);
router.post("/UpdateTerminadoVocabulario6", UpdateTerminadoVocabulario6);
router.post("/UpdateTerminadoVocabulario7", UpdateTerminadoVocabulario7);
router.post("/UpdateTerminadoVocabularioFinal",UpdateTerminadoVocabularioFinal);
//Juego Oracion
router.get("/uniendoPartida",armandoJuegosOracionesPorPiezas);
router.post("/llamadaPartidaOracion",llamadaPartidaOracion);
router.post("/UpdateTerminadoOracion1", UpdateTerminadoOracion1)
router.post("/UpdateTerminadoOracion2", UpdateTerminadoOracion2);
router.post("/UpdateTerminadoOracion3", UpdateTerminadoOracion3);
router.post("/UpdateTerminadoOracion4", UpdateTerminadoOracion4);
router.post("/UpdateTerminadoOracion5", UpdateTerminadoOracion5);
router.post("/UpdateTerminadoOracion6", UpdateTerminadoOracion6);
router.post("/UpdateTerminadoOracion7", UpdateTerminadoOracion7);
router.post("/UpdateTerminadoOracionFinal",UpdateTerminadoOracionFinal);
//test de llamadas
router.get('/CallMatch',ArmandoPartida)
router.get('/testa',testvi)
router.get('/Listado-Estudiante', SoloEstudiantes)
router.get('/RecibidoPrueba',RecibirJson)
/*router.get('/partidaEstudiante',partidaEstudiante);*/
router.get('/prueba',prueba);
/* Mutlijugador */
router.post('/LlamadainicalDelJugagor',DevuelveLaPosicionDentroDelArray)
router.post('/LlamadaDeJuegosBasesPorAsignar', LlamadaDeJuegosBasesPorAsignar);
router.post('/UneIntegrantesConJuegos',UneIntegrantesConJuegos)
router.post('/actualizarJuegoUno', actualizarJuego1)
router.post('/actualizarJuegoDos',actualizarJuego2)
router.post('/actualizarJuegoTres',actualizarJuego3)
router.post('/actualizarJuegoCuatro',actualizarJuego4)
router.post('/actualizarJuegoCinco',actualizarJuego5)
router.post('/actualizarJuegoTerminadoMulti', actualizarJuegoTerminado);
//revisar los get y post, ver cual seria   mejor o cuando usar cada uno

export default router;


