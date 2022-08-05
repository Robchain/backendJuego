import Persona from '../models/Persona';
// debe de ser unido al frontend
const crearusuario = async function Crear(){
    const persona = new Persona({
        IdPersona: 1,
        Nombre: "Robert",
        Apellido: "Roman",
        Identificacion: "0912345678",
        Email: "testo@corre.com",
        FotoPerfil: "url", 
        FechaRegistro: "8/2/2022",
        FechaModificado: "8/2/2022",
        Estado: true
    })
    await persona.save();
}

export default crearusuario;
