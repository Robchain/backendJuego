"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Persona_1 = __importDefault(require("../models/Persona"));
// debe de ser unido al frontend
const crearusuario = function Crear() {
    return __awaiter(this, void 0, void 0, function* () {
        const persona = new Persona_1.default({
            IdPersona: 1,
            Nombre: "Robert",
            Apellido: "Roman",
            Identificacion: "0912345678",
            Email: "testo@corre.com",
            FotoPerfil: "url",
            FechaRegistro: "8/2/2022",
            FechaModificado: "8/2/2022",
            Estado: true
        });
        yield persona.save();
    });
};
exports.default = crearusuario;
