import dotenv from 'dotenv';
dotenv.config();
import './Conection';
import app from './App'


 


app.listen(app.get('port'),()=>{
    console.log(app.get('port'));
}) 