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
}
export interface IIntegrantesPorGrupos{
    equipo0:IEquipoInterno[];
    equipo1?:IEquipoInterno[];
    equipo2?:IEquipoInterno[];
    equipo3?:IEquipoInterno[];
    equipo4?:IEquipoInterno[];
    equipo5?:IEquipoInterno[];
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
    Terminado:Boolean;
}


export interface IAvanceInter{
    PalabraCorrecta: String,
    PalabraSeleccionada:String,
    Resultado:String,
    Terminado: false
}

