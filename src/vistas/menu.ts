import {leerTeclado} from './lecturaTeclado'


export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear pedido')
    console.log('2.- Guardar pedido')
    console.log('3.- Calcular precio')
    console.log('4.- Borrar pedido')
    console.log('5.- Listar pedidos')
    console.log('6.- Calcular numero de paquetes')
    console.log('7.- Calcular precio y los paquetes de todos los pedidos')
    console.log('8.- Modificar pedido')
    console.log('0.- salir')
    n = parseInt(await leerTeclado('Opción:'))
    return n
}

export const menu2 = async () => {
    let n2: number
    console.log('\n')
    console.log('1.- Modificar sabor')
    console.log('2.- Modificar tipo')
    console.log('3.- Modificar cantidad')
    console.log('4.- Modificar estado de la entrega')
    console.log('0.- salir')
    n2 = parseInt(await leerTeclado('Opción:'))
    return n2
}

