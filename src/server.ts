import { menu, menu2 } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Helado, Helados, hHelado } from './model/helados'
import { db } from './database/database'


const main = async () => {
    let n: number
    let query: any
    let helados: Helado = new Helado(0,"","",0, false)
    await setBD(false)
    do {
        n = await menu()
        switch(n){
            case 1://crear pedido 
                let id:number, sabor:string, tipo:string, cantidad: number
                id = parseInt(await leerTeclado('Introduzca el identificador del pedido'))
                sabor = await leerTeclado('Introduzca el sabor del helado')
                tipo = await leerTeclado('Introduzca el tipo de helado(polos, conos o tarrinas)')
                cantidad = parseInt(await leerTeclado('Introduzca la cantidad de heldado que queire(cajas)'))
                helados = new Helado(id, sabor, tipo, cantidad, false)
            break
            case 2: //guardar pedido en la bd
                await db.conectarBD()
                const docSchema ={
                    _idPedido: helados.id,
                    _sabor: helados.sabor,
                    _tipo: helados.tipo,
                    _cantidad: helados.cantidad,
                    _recibido: helados.recibido
                }
                const Schema = new Helados(docSchema)
                await Schema.save()
                .then((doc) => console.log('Documento salvado correctamente' + doc))
                .catch((err:any)=>console.log(err))
                await db.desconectarBD()
            break
            case 3://calcular precio
                await db.conectarBD()
                let calcularP = parseInt(await leerTeclado('Introduzca el identificador del pedido para calcular el precio'))
                await Helados.findOne({_idPedido: calcularP})
                try{
                    console.log(`El precio del pedido es ${helados.pPrecio()}€`)
                }catch(err){
                    console.log(`No hay pedidos creados, por favor cree un pedido`)
                }
            break
            case 4://borrar pedido
                await db.conectarBD()
               const borrar = parseInt(await leerTeclado('Introduzca el identificador del pedido que quiere eliminar'))
                await Helados.findOneAndDelete(
                    { 
                        _idPedido: borrar
                    },
                    (err:any, doc) => {
                        if(err){
                            console.log(err)
                        }else{
                            if(doc == null) console.log(`Documento no encontrado`)
                            else console.log(`Documento borrado correctamente` + doc)
                        }
                    })
                await db.desconectarBD()
            break
            case 5://listar pedidos
            await db.conectarBD()
            await Helados.find({},
                (err:any, doc) => {
                    if(err){
                        console.log(err)
                    }else{
                        if(doc == null) console.log(`No hay documentos`)
                        else console.log(doc)
                    }
                })
            await db.desconectarBD()
            break
            case 6://calcular numero de paquete
            let paquetes = parseInt(await leerTeclado('Introduzca el identificador del pedido para calcular el numero de paquetes'))
            await db.conectarBD()
            await Helados.findOne({_idPedido: paquetes})
            try{
                 console.log(`El numero de paquetes es: ${helados.nPaquetes()}`)
            }catch(err){
                   console.log(`No hay pedidos creados, por favor cree un pedido`)
            }
            await db.desconectarBD()
            break
            case 7://Calcular el precio y los paquetes de todos los pedidos
            await db.conectarBD()
            query = await Helados.find({})
            for (const hHelado of query){
                const clase = new Helado(hHelado._idPedido, hHelado._sabor, hHelado._tipo, hHelado._cantidad, hHelado._estado)
                console.log(`El precio del pedido ${hHelado._idPedido}, es ${clase.pPrecio()}€ y lleva ${clase.nPaquetes()} paquetes`)
            }
            await db.desconectarBD()
            break
            case 8:
                let p= await leerTeclado('Introduzca el id del pedido que desea modificar')
                await db.conectarBD()
                let helado1: any = await Helados.findOne({_idPedido:p})
                let helado: any = new Helado(helado1._idPedido, helado1._sabor, helado1._tipo, helado1._cantidad, helado1._estado)
                let n2: number
                do {
                    n2 = await menu2()
                    switch(n2){
                        case 1://modificar sabor
                        let sabor = await leerTeclado('Introduce el nuevo sabor del helado')
                        helado.sabor = sabor
                        console.log(helado.sabor)
                        await db.conectarBD()
                        await Helados.findOneAndUpdate(
                            {_idPedido: helado.id},
                            { 
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            },
                            {
                                runValidators: true
                            })
                        .then(() => console.log('Modificado Correctamente') )
                        .catch( (err) => console.log('Error: '+err))
                        await db.desconectarBD()
                        break
                        case 2://modificar tipo
                        let tipo = await leerTeclado('Introduce el nuevo sabor del helado')
                        helado.tipo = tipo
                        await db.conectarBD()
                        await Helados.findOneAndUpdate(
                            {_idPedido: helado.id},
                            { 
                                _idPedido: helado.id,
                                _sabor: helado.sabor,
                                _tipo: helado.tipo,
                                _cantidad: helado.cantidad,
                                _recibido: helado.recibido
                            },
                            {
                                runValidators: true
                            })
                        .then(() => console.log('Modificado Correctamente') )
                        .catch( (err) => console.log('Error: '+err))
                        await db.desconectarBD()
                        break
                        case 3://modificar cantidad
                        let cantidad = parseInt(await leerTeclado('Introduce el nuevo sabor del helado'))
                        helado.cantidad = cantidad
                        await db.conectarBD()
                            await Helados.findOneAndUpdate(
                                {_idPedido: helado.id},
                                { 
                                    _idPedido: helado.id,
                                    _sabor: helado.sabor,
                                    _tipo: helado.tipo,
                                    _cantidad: helado.cantidad,
                                    _recibido: helado.recibido
                                },
                                {
                                    runValidators: true
                                })
                        .then(() => console.log('Modificado Correctamente') )
                        .catch( (err) => console.log('Error: '+err))
                        await db.desconectarBD()
                        break
                        case 4://modificar estado de entrega
                        helado.recibido = true
                        await db.conectarBD()
                            await Helados.findOneAndUpdate(
                                {_idPedido: helado.id},
                                { 
                                    _idPedido: helado.id,
                                    _sabor: helado.sabor,
                                    _tipo: helado.tipo,
                                    _cantidad: helado.cantidad,
                                    _recibido: helado.recibido
                                },
                                {
                                    runValidators: true
                                })
                        .then(() => console.log('Modificado Correctamente, pedido entregado') )
                        .catch( (err) => console.log('Error: '+err))
                        await db.desconectarBD()
                        break
                        case 0:
                            console.log('\nSaliendo')
                        break
                        default:
                            console.log("Opción incorrecta")
                        break
                    }

                }while (n2!=0)
            break
            case 0:
                console.log('\nSaliendo')
            break
            default:
                console.log("Opción incorrecta")
            break
        }
    } while(n!=0)
}



const setBD = async (local: boolean) => {
    
    const bdLocal = 'proyecto'

    const conexionLocal = `mongodb://locadlhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'proyecto'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas = 
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.rpbhr.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()