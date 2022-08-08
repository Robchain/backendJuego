"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
class Persona {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "IdPersona", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "Nombre", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "Apellido", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Persona.prototype, "Identificacion", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "Email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "FotoPerfil", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "FechaRegistro", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Persona.prototype, "FechaModificado", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Persona.prototype, "Estado", void 0);
const PersonaModel = (0, typegoose_1.getModelForClass)(Persona);
exports.default = PersonaModel;
