export interface Inportcolaborativo {
    FechaDeFin:    string;
    FechaDeInicio: string;
    Avance:        Avance;
    Equipo:        Equipo | null;
    createdAt:     string;
    updatedAtDay:  string;
    updatedAt:     string;
    tipo:          string;
    motivo:        string;
    nombre:        string;
    cedula:        string;
}

export interface Avance {
    Correcto:   string[];
    Incorrecto: Incorrecto[];
    NoContesto: any[];
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

export enum Cedula {
    The09889Ma1A = "09889ma1a",
}

export enum Motivo {
    Empty = "",
    NoEligieronUnEquipo = "no eligieron un equipo",
    NoJugo = "no jugo",
}

export enum Nombre {
    Martin1A = "MARTIN 1A",
}

export enum Tipo {
    Colaborativo = "colaborativo",
}
