
export interface IModeloPartida {
    Juego1:    Juego;
    Juego2:    Juego;
    Juego3:    Juego;
    Juego4:    Juego;
    Juego5:    Juego;
    Juego6?:    Juego;
    Juego7?:    Juego;
    Terminado: boolean;
}

export interface Juego {
    PalabraCorrecta:     string;
    PalabraSeleccionada: string;
    Resultado:           string;
    Terminado:           boolean;
}
