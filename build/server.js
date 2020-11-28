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
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
const helados_1 = require("./model/helados");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let helados = new helados_1.Helado(0, "", "", 0, false);
    yield setBD(false);
    do {
        n = yield menu_1.menu();
        switch (n) {
            case 1: //crear pedido 
                let id, sabor, tipo, cantidad;
                id = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador del pedido'));
                sabor = yield lecturaTeclado_1.leerTeclado('Introduzca el sabor del helado');
                tipo = yield lecturaTeclado_1.leerTeclado('Introduzca el tipo de helado(polos, conos o tarrinas)');
                cantidad = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la cantidad de heldado que queire(cajas)'));
                helados = new helados_1.Helado(id, sabor, tipo, cantidad, false);
                break;
            case 2: //guardar pedido en la bd
                yield database_1.db.conectarBD();
                const docSchema = {
                    _idPedido: helados.id,
                    _sabor: helados.sabor,
                    _tipo: helados.tipo,
                    _cantidad: helados.cantidad,
                    _recibido: helados.recibido
                };
                const Schema = new helados_1.Helados(docSchema);
                yield Schema.save()
                    .then((doc) => console.log('Documento salvado correctamente' + doc))
                    .catch((err) => console.log(err));
                yield database_1.db.desconectarBD();
                break;
            case 3: //calcular precio
                yield database_1.db.conectarBD();
                let calcularP = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador del pedido para calcular el precio'));
                yield helados_1.Helados.findOne({ _idPedido: calcularP });
                try {
                    console.log(`El precio del pedido es ${helados.pPrecio()}€`);
                }
                catch (err) {
                    console.log(`No hay pedidos creados, por favor cree un pedido`);
                }
                break;
            case 4: //borrar pedido
                yield database_1.db.conectarBD();
                const borrar = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador del pedido que quiere eliminar'));
                yield helados_1.Helados.findOneAndDelete({
                    _idPedido: borrar
                }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (doc == null)
                            console.log(`Documento no encontrado`);
                        else
                            console.log(`Documento borrado correctamente` + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 5: //listar pedidos
                yield database_1.db.conectarBD();
                yield helados_1.Helados.find({}, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (doc == null)
                            console.log(`No hay documentos`);
                        else
                            console.log(doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 6: //calcular numero de paquete
                let paquetes = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador del pedido para calcular el numero de paquetes'));
                yield database_1.db.conectarBD();
                yield helados_1.Helados.findOne({ _idPedido: paquetes });
                try {
                    console.log(`El numero de paquetes es: ${helados.nPaquetes()}`);
                }
                catch (err) {
                    console.log(`No hay pedidos creados, por favor cree un pedido`);
                }
                yield database_1.db.desconectarBD();
                break;
            case 7: //Calcular el precio y los paquetes de todos los pedidos
                yield database_1.db.conectarBD();
                query = yield helados_1.Helados.find({});
                for (const hHelado of query) {
                    const clase = new helados_1.Helado(hHelado._idPedido, hHelado._sabor, hHelado._tipo, hHelado._cantidad, hHelado._estado);
                    console.log(`El precio del pedido ${hHelado._idPedido}, es ${clase.pPrecio()}€ y lleva ${clase.nPaquetes()} paquetes`);
                }
                yield database_1.db.desconectarBD();
                break;
            case 8:
                let p = yield lecturaTeclado_1.leerTeclado('Introduzca el id del pedido que desea modificar');
                yield database_1.db.conectarBD();
                let helado1 = yield helados_1.Helados.findOne({ _idPedido: p });
                let helado = new helados_1.Helado(helado1._idPedido, helado1._sabor, helado1._tipo, helado1._cantidad, helado1._estado);
                let n2;
                do {
                    n2 = yield menu_1.menu2();
                    switch (n2) {
                        case 1: //modificar sabor
                            let sabor = yield lecturaTeclado_1.leerTeclado('Introduce el nuevo sabor del helado');
                            helado.sabor = sabor;
                            console.log(helado.sabor);
                            yield database_1.db.conectarBD();
                            yield helados_1.Helados.findOneAndUpdate({ _idPedido: helado.id }, {
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Modificado Correctamente'))
                                .catch((err) => console.log('Error: ' + err));
                            yield database_1.db.desconectarBD();
                            break;
                        case 2: //modificar tipo
                            let tipo = yield lecturaTeclado_1.leerTeclado('Introduce el nuevo sabor del helado');
                            helado.tipo = tipo;
                            yield database_1.db.conectarBD();
                            yield helados_1.Helados.findOneAndUpdate({ _idPedido: helado.id }, {
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Modificado Correctamente'))
                                .catch((err) => console.log('Error: ' + err));
                            yield database_1.db.desconectarBD();
                            break;
                        case 3: //modificar cantidad
                            let cantidad = parseInt(yield lecturaTeclado_1.leerTeclado('Introduce el nuevo sabor del helado'));
                            helado.cantidad = cantidad;
                            yield database_1.db.conectarBD();
                            yield helados_1.Helados.findOneAndUpdate({ _idPedido: helado.id }, {
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Modificado Correctamente'))
                                .catch((err) => console.log('Error: ' + err));
                            yield database_1.db.desconectarBD();
                            break;
                        case 4: //modificar estado de entrega
                            helado.recibido = true;
                            yield database_1.db.conectarBD();
                            yield helados_1.Helados.findOneAndUpdate({ _idPedido: helado.id }, {
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Modificado Correctamente, pedido entregado'))
                                .catch((err) => console.log('Error: ' + err));
                            yield database_1.db.desconectarBD();
                            break;
                        case 0:
                            console.log('\nSaliendo');
                            break;
                        default:
                            console.log("Opción incorrecta");
                            break;
                    }
                } while (n2 != 0);
                break;
            case 0:
                console.log('\nSaliendo');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'proyecto';
    const conexionLocal = `mongodb://locadlhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'proyecto';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.rpbhr.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
