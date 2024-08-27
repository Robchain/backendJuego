export interface DocumentosColabo {
    _id:              string;
    IdDeLaAsignacion: string;
    Equipo:           Equipo;
    Integrantes:      Integrante[];
    Curso:            string;
    Paralelo:         string;
    TipoDeJuego:      string;
    Avance:           Avance[];
    FechaDeInicio:    string;
    FechaDeFin:       string;
    Medalla:          string;
    Estado:           string;
    createdAt:        string;
    updatedAt:        string;
    updatedAtDay:     string;
}

export interface Avance {
    AvanceIndividual: AvanceIndividual[];
}

export interface AvanceIndividual {
    PalabraAEvaluar:      string;
    PalabraASeleccionada: string;
    Resultado:            string;
    Terminado:            boolean;
    OracionCorrecta?:     string;
}

export interface Equipo {
    _id:    string;
    Nombre: string;
    Imagen: string;
    Estado: string;
}

export interface Integrante {
    value:     string;
    label:     string;
    Terminado: boolean;
}