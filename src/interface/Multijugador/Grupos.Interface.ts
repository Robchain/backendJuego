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
export interface IIntegrantes{
    label:string;
    value:string;
    Terminado:boolean;
}
export interface IIntegrantesPorGrupos{
    [key: string]: IEquipoInterno[] | undefined;
  "Equipo 0"?: IEquipoInterno[];
  "Equipo 1"?: IEquipoInterno[];
  "Equipo 2"?: IEquipoInterno[];
  "Equipo 3"?: IEquipoInterno[];
  "Equipo 4"?: IEquipoInterno[];
  "Equipo 5"?: IEquipoInterno[];
  "Equipo 6"?: IEquipoInterno[];
  "Equipo 7"?: IEquipoInterno[];
  "Equipo 8"?: IEquipoInterno[];
}

export interface IEquipoInterno{
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
export interface IAvenceArriba{
    Juego1:IAvanceInter;
    Juego2:IAvanceInter;
    Juego3:IAvanceInter;
    Juego4:IAvanceInter;
    Juego5:IAvanceInter;
}


export interface IAvanceInter{
    PalabraCorrecta: String,
    PalabraSeleccionada:String,
    Resultado:String,
    Terminado: false
}

