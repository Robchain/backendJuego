

export interface IEquipoMult {
    _id:string;
    Nombre:string;
    ImagenDelEquipo:string;   
}


export interface IJugadorIndi{
    _id:string;
    Nombre:string;
}

export interface INombreDeEquipos{
    label:string;
    value:string;
}
export interface INumeroDeGrupos{
    label:string;
    value:string;
}
export interface INumeroDeIntegrantes{
    label:string;
    value:string;
}
export interface IIntegrantesPorGrupos{
    equipo0:IEquipo[];
    equipo1?:IEquipo[];
    equipo2?:IEquipo[];
    equipo3?:IEquipo[];
    equipo4?:IEquipo[];
    equipo5?:IEquipo[];
}

export interface IEquipo{
    label:string,
    value:string,
}

export interface IFechas{
    DateGameM:Date[]
}



export  interface IPartidaMulti{
    Juego1:object;
    Juego2:object;
    Juego3:object;
    Juego4:object;
    Juego5:object;
}



