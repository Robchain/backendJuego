import {Schema, Document, model} from "mongoose";
import { IModeloPartida } from "../../../interface/ModeloPartida";
import { IPersona } from "../../Administrador/Persona";
import { IPartidaVocabulario } from "../../Juego/Vocabulario/PartidaVocabulario";
export interface IJugadoresConVocabulario extends Document{
    Estudiante: IPersona,
    Partida:IPartidaVocabulario,
    Avance:IModeloPartida
}

const schemaJugadoresConVocabulario = new Schema({
    Estudiante:{
        type:Object,
        require:true,
    },
    Partida:{
        type:Object,
        require:true,
    },
    Avance:{
        type:Object,
        require:true,
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<IJugadoresConVocabulario>('jugadoresconvocabulario',schemaJugadoresConVocabulario);


