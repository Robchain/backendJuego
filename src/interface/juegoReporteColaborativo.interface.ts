export interface OutputJuegoColaborativo {
    Juego:       string;
    data:        Datum[];
    docentes:    string[];
    fechaInicio: string;
    fechaFin:    string;
    Curso:       string;
    Paralelo:    string;
}

export interface Datum {
    curso:      string;
    paralelo:   string;
    nameCounts: NameCount[];
}

export interface NameCount {
    nombre: string;
    count:  number;
}