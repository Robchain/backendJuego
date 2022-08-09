import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authrouter from './routes/auth.routes';

const app =express();

app.set('port', 3002);//puerto
//middleware se corren durante las peticiones
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());// para que acepte archivos json y entienda archivos json

//routes  
app.use('/api/auth',authrouter);




export default app;

