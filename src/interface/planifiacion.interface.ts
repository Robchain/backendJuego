




export interface OutputPlanificacion {
    data:     Datum[];
    docentes: string[];
    total:    number;
    fechaInicio: string,
    fechaFin:    string,
    Curso:       string, 
    Paralelo:    string,
}

export interface Datum {
    _id:        ID;
    documentos: Documento[];
}

export interface ID {
    curso:       string;
    paralelo:    string;
    TipoDeJuego: string;
}

export interface Documento {
    _id:                  string;
    NombreDeEquipos:      NumeroDeGrupos[];
    NumeroDeGrupos:       NumeroDeGrupos;
    NumeroDeIntegrantes:  NumeroDeGrupos;
    IntegrantesPorGrupos: IntegrantesPorGrupos;
    TipoDeJuego:          string;
    Curso:                string;
    Paralelo:             string;
    Fecha:                string[];
    Estado:               string;
    createdAt:            string;
    updatedAt:            string;
    Docente:              string;
    createdAtDay:         string;
}



export interface IntegrantesPorGrupos {
    "Equipo 1":  NumeroDeGrupos[];
    "Equipo 2"?: NumeroDeGrupos[];
    "Equipo 3"?: NumeroDeGrupos[];
    "Equipo 0"?: NumeroDeGrupos[];
}

export interface NumeroDeGrupos {
    value: string;
    label: string;
}
