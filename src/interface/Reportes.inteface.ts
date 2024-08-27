export interface IReporteInterfaceEstudiante{
    Pregunta:string
    valorId:string
    FechaInicio:string
    FechaFin:string
    datosPer:datosPer
}

export interface datosPer{
  label:string,
  value:string
}


export interface IReporteInterfaceCursoParalelo{
   Paralelo:string,
    Pregunta:string
    Curso:string
    FechaInicio:string
    FechaFin:string
}


export interface IReporteInterfaceJuego{
    Pregunta:string
    FechaInicio:string
    FechaFin:string
    Curso:string,
    Paralelo:string
}


export interface IReporteNuevoCursoParalelo{
  Curso:string
 Paralelo:string,
 Juego:string,
 FechaInicio:string, 
  FechaFin:string,
}


export interface AvanceCoolaborativo {
  AvanceIndividual: AvanceIndividual[];
}


export interface AvanceIndividual {
  PalabraAEvaluar:      string;
  PalabraASeleccionada: string;
  Resultado:            string;
  Terminado:            boolean;
  OracionCorrecta?:     string;
}


export interface Documento {
  _id:          string;
  Estudiante:   Estudiante;
  Rompecabeza:  Rompecabeza;
  Avance:       Avance[];
  Terminado:    boolean;
  createdAt:    Date;
  updatedAt:    Date;
  updatedAtDay: Date;
}


export interface Avance {
  PalabraAEvaluar:      string;
  PalabraASeleccionada: string;
  Resultado:            string;
  OracionCorrecta?:      string;
  Terminado:            boolean;
}


export interface Estudiante {
  _id:            string;
  Nombre:         string;
  Usuario:        string;
  Identificacion: string;
  Curso:          string;
  Paralelo:       string;
}


export interface Rompecabeza {
  _id:        string;
  Nombre:     string;
  Pieza:      number;
  FileBlanco: string;
  FileColor:  string;
  Estado:     string;
  createdAt:  Date;
  updatedAt:  Date;
  Juego:      string;
}
