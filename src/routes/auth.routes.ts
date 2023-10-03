import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { SoloEstudiantes,signup, signin,profile,perfilesNoActivos,borrarPerfiles,editarUserConArchivo,test,perfilesTotales, MostrarMaestrosConSusEstudiantesPorCursos, perfilesActivosEstudiantes, perfilesActivosMaestros, activarPersonas, desabilitarPersonas, getBase, EditarsinArchivoUsuario, ActualizarContraseña, BuscarPorCursoYParalelo, signupsinfoto } from "../controller/Administrador/auth.controller";
import {subirRom,borrarRom,mostrarRom,mostrarRomTodos,EditarRompecabeza, EditarRompecabezaSinArchivo, DesibilitarRompecabeza, HabilitarRompecabeza} from '../controller/Administrador/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario,mostrarVocaTodos,mostrarVocaPala, editarVocabulario, DesibilitarVocabulario, HabilitarVocabulario, editarVocabularioSinArchivos, JuegosActivos} from '../controller/Administrador/auth.vocabulario';
import { subirOracion,borrarOracion,mostrarOracTodos,mostrarOracPala,editarOracion, DesibilitarOracion, HabilitarOracion, editarOracionSinArchivo, ActivarJuegoConEstudianteOracion, ImagenQuienCrear, ImagenQuienMostrar, ImagenQuienEliminar, ImagenQuienDesibilitar, ImagenQuienHabilitar, JuegosActivosOracion, editarQuienSinImagen, editarQuien } from '../controller/Administrador/auth.oracion';
import { crearCategorias,borrarCategoria,mostrarCateTodos,mostrarCatePala,EditarCategoria, DesibilitarCategoriaVocabulario, HabilitarCategoriaVocabulario } from '../controller/Administrador/auth.categoria';
import {CrearEquipo, CrearEquipoAuto,MostrarEquipo,EliminarEquipo, editarEquipo, DesibilitarEquipo, HabilitarEquipo, editarEquipoSinImagen}    from '../controller/Administrador/auth.equipo';
import {ArmandoPartida} from '../controller/Juego/auth.vocabularioPartida'
import { /*partidaVocabularioInicial,*/testas,/*partidaEstudiante*/ prueba, llamadaPartidaVocabulario,  CrearJuegoVocabularioIndividual, UpdateTerminadoVocabulario  } from '../controller/auth.TestDeLlamada';
import { BuscarPorCursoYParaleloMultijugador, CreaJuegoMultijuador, CrearEvento, PEvento } from '../controller/Administrador/auth.multiJugador';
import { armandoJuegosOracionesPorPiezas, llamadaPartidaOracion, UpdateTerminadoOracion } from '../controller/Juego/OracionPartidas';
import { borrarCategoriaOracion, crearCategoriasOraciones, DesibilitarCategoriaOraciones, EditarCategoriaOracion, HabilitarCategoriaOraciones } from '../controller/Administrador/CategoriaOracionesController';
import { ActivarCoolaborativo, ActualizarCoolaborativo, actualizarJuegoTerminado, DesactivarCoolaborativo, DevuelveLaPosicionDentroDelArray, historialJuego, LlamadaDeJuegosBasesPorAsignar, UneIntegrantesConJuegos } from '../controller/Multijugador/Fase1';
import {  activarJuegoVocabularioPorGrupo } from '../controller/Administrador/auth.JuegoVoca';
import { reporteGeneralPorCurso, reporteGeneralPorEstudiante, reporteGeneralPorJuego } from '../controller/Administrador/reportes';
import { CrearCurso, DesibilitarCurso, HabilitarCurso, MostrarCurso, EditarCurso, CrearParalelo, MostrarParalelo, DesibilitarParalelo, HabilitarParalelo, EditarParalelo } from '../controller/Administrador/auth.CursoParalelo';
import { DesibilitarHabilitarJuego, HabilitarHabilitarJuego, MostrarHabilitarJuego } from '../controller/Administrador/auth.HabilitarJuego';

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
//HabilitarJuegos
router.get("/MostrarHabilitarJuego",MostrarHabilitarJuego);
router.post("/DesibilitarHabilitarJuego",DesibilitarHabilitarJuego);
router.post("/HabilitarHabilitarJuego",HabilitarHabilitarJuego);


//Curso
router.post('/CrearCurso', CrearCurso);
router.get('/MostrarCurso', MostrarCurso);
router.post('/DesibilitarCurso', DesibilitarCurso);
router.post('/HabilitarCurso', HabilitarCurso);
router.post('/EditarCurso', EditarCurso);
//Paralelo
router.post('/CrearParalelo', CrearParalelo);
router.get('/MostrarParalelo', MostrarParalelo);
router.post('/DesibilitarParalelo', DesibilitarParalelo);
router.post('/HabilitarParalelo', HabilitarParalelo);
router.post('/EditarParalelo', EditarParalelo);
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
router.post("/vocabulario/activarJuegoPorCursoParalelo",activarJuegoVocabularioPorGrupo)//listo ya esta actualizado
router.get("/vocabulario/JuegosActivos",JuegosActivos) 
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
router.get("/OracionAdmi/JuegosActivosOracion",JuegosActivosOracion); 
//quien
router.post("/OracionAdmi/ImagenQuienCrear",ImagenQuienCrear)
router.get("/OracionAdmi/ImagenQuienMostrar",ImagenQuienMostrar)
router.post("/OracionAdmi/ImagenQuienEliminar",ImagenQuienEliminar)
router.post("/OracionAdmi/ImagenQuienDesibilitar",ImagenQuienDesibilitar)
router.post("/OracionAdmi/ImagenQuienHabilitar",ImagenQuienHabilitar)
router.post("/OracionAdmi/editarQuien",editarQuien); 
router.post("/OracionAdmi/editarQuienSinImagen",editarQuienSinImagen); 
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
router.post('/MultiJugador/BuscarPorCurso',BuscarPorCursoYParaleloMultijugador);
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
router.get('/Listado-Estudiante', SoloEstudiantes)
/*router.get('/partidaEstudiante',partidaEstudiante);*/
router.get('/prueba',prueba);
/* Mutlijugador */
router.post('/LlamadainicalDelJugagor',DevuelveLaPosicionDentroDelArray); 
router.post('/LlamadaDeJuegosBasesPorAsignar', LlamadaDeJuegosBasesPorAsignar);
router.post('/UneIntegrantesConJuegos',UneIntegrantesConJuegos)
router.get('/CreaJuegoMulti/:id',CreaJuegoMultijuador);
router.post('/actualizarJuegoTerminadoMulti', actualizarJuegoTerminado);
router.post('/historialJuego', historialJuego);
router.post('/DesactivarCoolaborativo', DesactivarCoolaborativo);
router.post('/ActivarCoolaborativo',ActivarCoolaborativo);
router.post('/ActualizarCoolaborativo', ActualizarCoolaborativo)
//revisar los get y post, ver cual seria   mejor o cuando usar cada uno

//Reportes
//individual
router.post('/Reporte/Jugador',reporteGeneralPorEstudiante);
//por curso
router.post('/Reporte/Cursos',reporteGeneralPorCurso);
//por juego
router.post('/Reporte/Juego',reporteGeneralPorJuego);
//por todos los juegos


export default router;


