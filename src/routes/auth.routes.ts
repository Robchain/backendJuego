import {Router} from 'express';
import {validarToken}   from '../lib/verifyToken';
import { signup, signin,profile } from "../controller/auth.controller";
const router : Router = Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/MenuJuego',validarToken,profile);



export default router;


