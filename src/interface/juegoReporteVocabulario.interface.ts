export interface OutputJuegoVocabulario {
    Juego:       string;
    Cursos:      CursoElement[];
    data:        Datum[];
    fechaInicio: string;
    fechaFin:    string;
    Curso:string;
    Paralelo:string;
    Docente: string
}

export interface CursoElement {
    Curso:    string;
    Paralelo: string;
}


export interface Datum {
    _id:        ID;
    documentos: Documento[];
}

export interface ID {
    Nombre:         string;
    Identificacion: string;
    Curso:          string;
    Paralelo:       string;
    tipo:           string;
    Docente:        string;
}


export interface Documento {
    _id:          string;
    Estudiante:   Estudiante;
    Rompecabeza:  Rompecabeza;
    Avance:       Avance[];
    Terminado:    boolean;
    Activo:       boolean;
    createdAt:    string;
    updatedAt:    string;
    Docente:      string;
    updatedAtDay: string;
}

export interface Avance {
    PalabraAEvaluar:      string;
    PalabraASeleccionada: string;
    Resultado:            Resultado;
    Terminado:            boolean;
}

export enum Resultado {
    Correcto = "CORRECTO",
    Incorrecto = "INCORRECTO",
    NoContesto = "NO CONTESTO",
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
    createdAt:  string;
    updatedAt:  string;
    Juego:      string;
}
