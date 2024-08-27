export interface OutputTodosJugador {
    nombre:   string;
    cedula: string;
    salida:   Salida[];
}

export interface Salida {
    updatedAtDay: string;
    data:         SalidaDatum[];
}

export interface SalidaDatum {
    FechaDeFin?:    string;
    FechaDeInicio?: string;
    Avance:        Avance;
    Equipo?:        Equipo | null;
    createdAt?:     string;
    updatedAtDay:   string;
    updatedAt?:     string;
    tipo:          string;
    motivo?:        string;
    data?:          DatumDatum[];
}

export interface Avance {
    Correcto:   string[];
    Incorrecto: Incorrecto[];
    NoContesto: string[];
}

export interface Incorrecto {
    PalabraAEvaluar:      string;
    PalabraASeleccionada: string;
}

export interface Equipo {
    _id:    string;
    Nombre: string;
    Imagen: string;
    Estado: string;
}


export interface DatumDatum {
    Estudiante:  Estudiante;
    Rompecabeza: Rompecabeza;
    Avance:      Avance;
    Terminado:   boolean;
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
