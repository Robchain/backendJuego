import './Conection';
import app from './App'
import dotenv from 'dotenv';
dotenv.config();

 


app.listen(app.get('port'),()=>{
    console.log(app.get('port'));
}) 