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
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu2 = exports.menu = void 0;
const lecturaTeclado_1 = require("./lecturaTeclado");
const menu = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Crear pedido');
    console.log('2.- Guardar pedido');
    console.log('3.- Calcular precio');
    console.log('4.- Borrar pedido');
    console.log('5.- Listar pedidos');
    console.log('6.- Calcular numero de paquetes');
    console.log('7.- Calcular precio y los paquetes de todos los pedidos');
    console.log('8.- Modificar pedido');
    console.log('0.- salir');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('Opción:'));
    return n;
});
exports.menu = menu;
const menu2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n2;
    console.log('\n');
    console.log('1.- Modificar sabor');
    console.log('2.- Modificar tipo');
    console.log('3.- Modificar cantidad');
    console.log('4.- Modificar estado de la entrega');
    console.log('0.- salir');
    n2 = parseInt(yield lecturaTeclado_1.leerTeclado('Opción:'));
    return n2;
});
exports.menu2 = menu2;
