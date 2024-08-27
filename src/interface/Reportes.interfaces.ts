export interface Salidavocabylario {
    _id:        ID;
    documentos: Documentos;
}

export interface ID {
    createdAtDay:   Date;
    Identificacion: string;
}

export interface Documentos {
    Estudiante:  Estudiante;
    Rompecabeza: Rompecabeza;
    Avance:      Avance[];
    Terminado:   boolean;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface Avance {
    Correcto:   string[];
    Incorrecto: Incorrecto[];
}

export interface Incorrecto {
    PalabraAEvaluar:      string;
    PalabraASeleccionada: string;
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