import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { SoloEstudiantes,signup, signin,profile,perfilesNoActivos,borrarPerfiles,editarUserConArchivo,test,perfilesTotales, MostrarMaestrosConSusEstudiantesPorCursos, perfilesActivosEstudiantes, perfilesActivosMaestros, activarPersonas, desabilitarPersonas, getBase, EditarsinArchivoUsuario, ActualizarContraseña, BuscarPorCursoYParalelo, signupsinfoto } from "../controller/Administrador/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos,EditarRompecabeza, EditarRompecabezaSinArchivo, DesibilitarRompecabeza, HabilitarRompecabeza} from '../controller/Administrador/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala, editarVocabulario, testvi, DesibilitarVocabulario, HabilitarVocabulario, editarVocabularioSinArchivos, pruebaparam} from '../controller/Administrador/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala,editarOracion, DesibilitarOracion, HabilitarOracion, editarOracionSinArchivo, ActivarJuegoConEstudianteOracion } from '../controller/Administrador/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala,EditarCategoria, DesibilitarCategoriaVocabulario, HabilitarCategoriaVocabulario } from '../controller/Administrador/auth.categoria';
import {CrearEquipo, CrearEquipoAuto,MostrarEquipo,EliminarEquipo, editarEquipo, DesibilitarEquipo, HabilitarEquipo, editarEquipoSinImagen}    from '../controller/Administrador/auth.equipo';
import {ArmandoPartida} from '../controller/Juego/auth.vocabularioPartida'
import { /*partidaVocabularioInicial,*/testas,/*partidaEstudiante*/ prueba, llamadaPartidaVocabulario, UpdateTerminadoVocabulario2, UpdateTerminadoVocabulario3, UpdateTerminadoVocabulario4, UpdateTerminadoVocabulario5, UpdateTerminadoVocabulario6, UpdateTerminadoVocabulario7, UpdateTerminadoVocabularioFinal, CrearJuegoVocabularioIndividual, UpdateTerminadoVocabulario  } from '../controller/auth.TestDeLlamada';
import { CrearEvento, PEvento } from '../controller/Administrador/auth.multiJugador';
import { armandoJuegosOracionesPorPiezas, llamadaPartidaOracion, UpdateTerminadoOracion, UpdateTerminadoOracion2, UpdateTerminadoOracion3, UpdateTerminadoOracion4, UpdateTerminadoOracion5, UpdateTerminadoOracion6, UpdateTerminadoOracion7, UpdateTerminadoOracionFinal } from '../controller/Juego/OracionPartidas';
import { borrarCategoriaOracion, crearCategoriasOraciones, DesibilitarCategoriaOraciones, EditarCategoriaOracion, HabilitarCategoriaOraciones } from '../controller/Administrador/CategoriaOracionesController';
import { actualizarJuego1, actualizarJuego2, actualizarJuego3, actualizarJuego4, actualizarJuego5, actualizarJuegoTerminado, DevuelveLaPosicionDentroDelArray, LlamadaDeJuegosBasesPorAsignar, UneIntegrantesConJuegos } from '../controller/Multijugador/Fase1';
import {  activarJuegoVocabularioPorGrupo } from '../controller/Administrador/auth.JuegoVoca';
import { ReporteMultiJugador, ReporteOracion, ReporteVocabulario } from '../controller/Administrador/reportes';

const router : Router = Router();
router.get("/",getBase)
router.post('/signup' ,signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.get('/Ver-Registrados-Activos',perfilesActivosEstudiantes)
router.post('/signupsinfoto',signupsinfoto);
router.post("/Perfiles/BuscarPorCursoYParalelo", BuscarPorCursoYParalelo)
router.get('/perfilesNoActivos',perfilesNoActivos)
router.post("/Perfiles/EditarconImagen",editarUserConArchivo)
router.post("/Perfiles/EditarSinImagen",EditarsinArchivoUsuario)
router.post("/Perfiles/desabilitar",desabilitarPersonas)
router.post("/Perfiles/ActualizarContrasenia",ActualizarContraseña)
router.post("/Perfiles/habilitar",activarPersonas)
router.get('/perfilesTotales',perfilesTotales)
router.delete('/BorrarUsario', borrarPerfiles)
router.post('/EditarUsuario',test)
router.get("/perfilesActivosMaestros",perfilesActivosMaestros)
router.post('/MostrarEstudianteConSusEstudiantes', MostrarMaestrosConSusEstudiantesPorCursos),
//rompecabeza
router.post('/rompecabezaAdmi',subirRom);
router.get('/rompecabezaAdmi/buscarU',mostrarRom);
router.post('/rompecabezaAdmi/borrar',borrarRom);
router.get('/rompecabezaAdmi/mostrartodo',mostrarRomTodos);
router.post('/rompecabeza/Desabilitar',DesibilitarRompecabeza);
router.post('/rompecabeza/habilitar',HabilitarRompecabeza);
router.post('/rompecabeza/Editar',EditarRompecabeza);
router.post("/rompecabeza/EditarSinArchivo",EditarRompecabezaSinArchivo)
//vocabulario
router.post('/vocabularioAdmi',subirVocabulario);
router.get('/VocabularioAdmi/mostrartodo',mostrarVocaTodos);
router.get('/VocabularioAdmi/buscarU',mostrarVocaPala);
router.post('/vocabularioAdmi/borrar',borrarVocabulario);
router.post('/vocabulario/Editar',editarVocabulario)
router.post('/vacabulario/EditarSinArchivo', editarVocabularioSinArchivos);
router.post("/vocabulario/Desabilitar",DesibilitarVocabulario);
router.post("/vocabulario/Habilitar",HabilitarVocabulario);
router.post("/vocabulario/activarJuegoPorCursoParalelo",activarJuegoVocabularioPorGrupo) //listo ya esta actualizado
//Oracion
router.post('/OracionAdmi',subirOracion);
router.post('/OracionAdmi/borrar',borrarOracion);
router.get('/OracionAdmi/mostrartodo',mostrarOracTodos);
router.post("/OracionAdmi/ActivarJuegoPorCursoParalelo",ActivarJuegoConEstudianteOracion); // ya esta actualizado
router.get('/OracionAdmi/buscarU',mostrarOracPala);
router.post('/OracionAdmi/Editar',editarOracion);
router.post('/OracionAdmi/Desabilitar',DesibilitarOracion);
router.post('/OracionAdmi/Habilitar',HabilitarOracion)
router.post("/OracionAdmi/EditarSinImagenes",editarOracionSinArchivo)
//categoria
router.post('/Categoria',crearCategorias);
router.post('/Categoria/borrar',borrarCategoria);
router.get('/Categoria/mostrartodo',mostrarCateTodos);
router.get('/Categoria/buscarU',mostrarCatePala);
router.post('/Categoria/Editar',EditarCategoria)
router.post("/Categoria/desabilitarCategoriaVocabulario",DesibilitarCategoriaVocabulario);
router.post("/Categoria/habilitarCategoriaVocabulrio",HabilitarCategoriaVocabulario);
router.post('/Categoria/DesabilitarCategoriaOracion',DesibilitarCategoriaOraciones)
router.post('/Categoria/HabilitarCategoriaOracion',HabilitarCategoriaOraciones)
//categoria de oraciones *CREAR EL RESTO DEL CRUD*
router.get("/Categoria/Mostartodos/Oracion", crearCategoriasOraciones);
router.post("/Categoria/Borrar/OracionCategoria", borrarCategoriaOracion);
router.post("/Categoria/Editar/OracionCategoria",EditarCategoriaOracion)
//Equipo
router.get('/Equipo/automatico', CrearEquipoAuto);
router.get('/Equipo/mostrartodo',MostrarEquipo);
router.post('/Equipo/Crear', CrearEquipo);
router.post('/Equipo/Eliminar',EliminarEquipo);
router.post('/Equipo/editar',editarEquipo);
router.post("/Equipo/Desibilitar", DesibilitarEquipo);
router.post("/Equipo/Habiltar",HabilitarEquipo);
router.post("/Equipo/editarSinImagen",editarEquipoSinImagen);
//MultiJugador
router.post('/MultiJugador', CrearEvento)
router.get('/MultiJugador/Presentacion', PEvento)
//armar partidas
router.get('/partidaVocabularioInicial',testas)
//Juego Vocabulario
router.get('/CrearJuegoVocabularioIndividual/:id',CrearJuegoVocabularioIndividual) //cada llamada trae un modelo diferente
router.post("/llamadaPartidaVocabulario",  llamadaPartidaVocabulario)
router.post("/UpdateTerminadoVocabulario", UpdateTerminadoVocabulario)//guardado final
//Juego Oracion
router.get("/armandoJuegosOracionesPorPiezas/:id",armandoJuegosOracionesPorPiezas); //cada llamada trae un modelo diferente
router.post("/llamadaPartidaOracion",llamadaPartidaOracion);
router.post("/UpdateTerminadoOracion", UpdateTerminadoOracion);//guardado final

//test de llamadas
router.get('/CallMatch',ArmandoPartida)
router.get('/testa',testvi)
router.get('/Listado-Estudiante', SoloEstudiantes)
router.get('/pruebacondata/:id', pruebaparam);
/*router.get('/partidaEstudiante',partidaEstudiante);*/
router.get('/prueba',prueba);
/* Mutlijugador */
router.post('/LlamadainicalDelJugagor',DevuelveLaPosicionDentroDelArray);
router.post('/LlamadaDeJuegosBasesPorAsignar', LlamadaDeJuegosBasesPorAsignar);
router.post('/UneIntegrantesConJuegos',UneIntegrantesConJuegos)
router.post('/actualizarJuegoUno', actualizarJuego1)
router.post('/actualizarJuegoDos',actualizarJuego2)
router.post('/actualizarJuegoTres',actualizarJuego3)
router.post('/actualizarJuegoCuatro',actualizarJuego4)
router.post('/actualizarJuegoCinco',actualizarJuego5)
router.post('/actualizarJuegoTerminadoMulti', actualizarJuegoTerminado);
//revisar los get y post, ver cual seria   mejor o cuando usar cada uno

//Reportes
router.post('/ReporteVocabulario',ReporteVocabulario );
router.post('/ReporteOracion', ReporteOracion);
router.post('/ReporteMultiJugador', ReporteMultiJugador);

export default router;


