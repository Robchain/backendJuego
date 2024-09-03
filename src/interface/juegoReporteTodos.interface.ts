export interface OutputJuegoJuego {
    juego:            string;
    fechaInicio:      string;
    fechaFin:         string;
    Curso:            string;
    Paralelo:         string;
    dataVocabulario:  Data;
    dataOracion:      Data;
    dataColaborativo: DataColaborativo;
}



export interface DataColaborativo {
    data:     DataColaborativoDatum[];
    docentes: string[];
}

export interface DataColaborativoDatum {
    curso:      string;
    paralelo:   string;
    nameCounts: NameCount[];
}

export interface NameCount {
    nombre: string;
    count:  number;
}



export interface Data {
    Cursos: Curso[];
    data:   DataOracionDatum[];
}

export interface Curso {
    Curso:    string;
    Paralelo: string;
}

export interface DataOracionDatum {
    _id:        IDClass;
    documentos: Documento[];
}

export interface IDClass {
    Nombre:         string;
    Identificacion: string;
    Curso:          string;
    Paralelo:       string;
    tipo:           Tipo;
    Docente:        string;
}



export enum Tipo {
    Vocabulario = "vocabulario",
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
    Resultado:            string;
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
    createdAt:  string;
    updatedAt:  string;
    Juego:      string;
}
