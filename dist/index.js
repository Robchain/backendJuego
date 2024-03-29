"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./Conection");
const App_1 = __importDefault(require("./App"));
App_1.default.listen(App_1.default.get('port'), () => {
    console.log(App_1.default.get('port'));
});
