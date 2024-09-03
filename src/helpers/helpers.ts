import { Datum } from "../interface/juegoReporteVocabulario.interface";

export const fechaEcuador = (fecha: string) => {
    const fechaUtc = new Date(fecha);
    const fechaLocal = new Date(fechaUtc.getTime() - fechaUtc.getTimezoneOffset() * 60000);
    
    // Asegúrate de que las opciones estén correctamente definidas con los tipos literales esperados
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      timeZone: 'America/Guayaquil' 
    };
  
    const fechaFormateada = fechaLocal.toLocaleDateString('es-EC', options);
    return fechaFormateada;
  }


  export function DocentesList(data:Datum[]) {
    const uniqueDocentes = Array.from(
      new Set(data.map(item => item._id.Docente))
    );
    return uniqueDocentes;
}  




export function DocentesList2(data: string[]) {
  const uniqueDocentes = Array.from(
    new Set(data.map(item => item))
  );
  return uniqueDocentes;
}  