"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pantallaSchema = new mongoose_1.Schema({
    url: {
        type: String
    },
    estado: {
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = (0, mongoose_1.model)('pantalla', pantallaSchema);
