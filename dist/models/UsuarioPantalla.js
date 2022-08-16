"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioPantallaSchema = new mongoose_1.Schema({
    Usuario: {
        type: String
    },
    Pantalla: {
        type: String
    },
    Estado: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
});
