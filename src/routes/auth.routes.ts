import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { signup, signin,profile } from "../controller/auth.controller";
import {subirRom,borrarRom,mostrarRom} from '../controller/auth.rompecabeza';
import {subirVocabulario,borrarVocabulario} from '../controller/auth.vocabulario';
import { subirOracion,borrarOracion } from '../controller/auth.oracion';
const router : Router = Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/profile',profile);
router.post('/rompecabezaAdmi',validarToken,subirRom);
router.post('/rompecabezaAdmi/mostrar',mostrarRom);
router.post('/rompecabezaAdmi/borrar',borrarRom);
router.post('/vocabularioAdmi',subirVocabulario);
router.post('/vocabularioAdmi/borrar',borrarVocabulario);
router.post('/oracionAdmi',subirOracion);
router.post('/oracionAdmi/borrar',borrarOracion);




export default router;


