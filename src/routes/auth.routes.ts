import {Router} from 'express';
import { signup, signin,profile } from "../controller/auth.controller";
const router : Router = Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/profile',profile);



export default router;


