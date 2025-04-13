require('colors')
const readline = require('readline-sync')
const inquirer = require('inquirer')

let precio = 0
let tituloBuscar = 0
let menu = 0
let agregarLibro = 0
let titulo = 0
let autor = 0
let anio = 0
const catalogo = []

function agregar(agregarLibro) {
    titulo = readline.question('Ingrese el nombre del titulo: '.blue)
    autor = readline.question('Ingrese el nombre del autor: '.blue)
    do {
        precio = Number(readline.question('Ingrese el precio: '.blue))
        if (precio <= 0 || isNaN(precio)) {
            console.log(`No se pueden ingresar negativos, cero o texto`.red)
        }
    } while (precio <= 0 || isNaN(precio))
    anio = readline.question('Ingrese la fecha de publicacion (ejemplo: 1986): '.blue)
    agregarLibro = { Titulo: titulo, Autor: autor, Precio: Number(precio), Publicado: Number(anio) }
    console.clear()
    console.log(`Su libro fue agregado satisfactoriamente`.green)
    console.log(`==============================================================================`.gray)
    catalogo.push(agregarLibro)
    return catalogo
}


function mostrar(catalogo) {
    if (catalogo.length > 0) {
        catalogo.forEach(element => {
            console.log('Título: '.blue + element.Titulo + ',' + 'Autor: '.blue + element.Autor + ',' + 'Precio: '.blue + 'Q' + element.Precio + ',' + 'Publicado:'.blue + element.Publicado)
        })
    } else {
        console.log(`No hay libros ingresados`.red)
    }
    console.log(`==============================================================================`.gray)
}

function find(catalogo) {
    tituloBuscar = readline.question(`Ingrese el nombre del titulo que desea buscar: `.green)
    let busqueda = catalogo.find(libro => libro.Titulo === tituloBuscar)
    if (busqueda) {
        console.log('Título: '.blue + busqueda.Titulo + ', ' +
                    'Autor: '.blue + busqueda.Autor + ', ' +
                    'Precio: '.blue + 'Q' + busqueda.Precio + ', ' +
                    'Publicado: '.blue + busqueda.Publicado)
    } else {
        console.log(`Libro no encontrado`.red)
    }
    console.log(`==============================================================================`.gray)
}

function eliminar(catalogo) {
    tituloBuscar = readline.question(`Ingrese el nombre del titulo que desea Eliminar: `.green)
    console.clear()
    let index = catalogo.findIndex(libro => libro.Titulo === tituloBuscar)
    if (index >= 0) {
        catalogo.splice(index, 1)
        console.log(`El libro ha sido eliminado`.red)
    } else {
        console.log(`El libro no fue encontrado`.red)
    }
    console.log(`==============================================================================`.gray)
    return catalogo
}



function estadisticas(catalogo) {
    let prome = 0
    let cantidad = catalogo.length
    if (cantidad > 0) {
        console.log(`Cantidad total de libros: ${cantidad}`.green)
        for (let i = 0; i < cantidad; i++) {
            prome += catalogo[i].Precio
        }
        prome /= cantidad
        const libroCaro = catalogo.reduce((mas, libro) => {
            return libro.Precio > mas.Precio ? libro : mas;
        })
        console.log(`El precio promedio de los libros es: ${prome.toFixed(2)}`.green)
        console.log('El libro más caro es: ' + libroCaro.Titulo.green + ' con un precio de: ' + libroCaro.Precio.toFixed(2).green)
    } else {
        console.log(`No hay libros ingresados en la base de datos`.red)
    }

}

function ordenLibros(catalogo) {
    do {
        tituloBuscar = readline.question(`Seleccione como desea ordenar los libros
        1. Precio (ascendente) 
        2. Precio (descendente) 
        3. Publicacion
        4. Salir
        
        Digite la opcion seleccionada: `.blue)
        console.clear()
        switch (tituloBuscar) {
            case '1':
                if (catalogo.length > 0) {
                    catalogo.sort((a, b) => a.Precio - b.Precio)
                    catalogo.forEach(element => {
                        console.log('Título: '.blue + element.Titulo + ',' + 'Autor: '.blue + element.Autor + ',' + 'Precio: '.blue + 'Q' + element.Precio + ',' + 'Publicado:'.blue + element.Publicado)
                    })
                } else {
                    console.log(`No hay registros que ordenar`.red)
                }
                console.log(`==============================================================================`.gray)
                break
            case '2':
                if (catalogo.length > 0) {
                    catalogo.sort((a, b) => b.Precio - a.Precio)
                    catalogo.forEach(element => {
                        console.log('Título: '.blue + element.Titulo + ',' + 'Autor: '.blue + element.Autor + ',' + 'Precio: '.blue + 'Q' + element.Precio + ',' + 'Publicado:'.blue + element.Publicado)
                    })
                } else {
                    console.log(`No hay registros que ordenar`.red)
                }
                console.log(`==============================================================================`.gray)
                break
            case '3':
                if (catalogo.length > 0) {
                    catalogo.sort((a, b) => a.Publicado - b.Publicado)
                    catalogo.forEach(element => {
                        console.log('Título: '.blue + element.Titulo + ',' + 'Autor: '.blue + element.Autor + ',' + 'Precio: '.blue + 'Q' + element.Precio + ',' + 'Publicado:'.blue + element.Publicado)
                    })
                } else {
                    console.log(`No hay registros que ordenar`.red)
                }
                console.log(`==============================================================================`.gray)
                break
            case '4':
                break
            default:
                console.log(`La opcion que ingreso es incorrecta, seleccione una opcion`.red)
                console.log(`==============================================================================`.gray)
                break
        }
    } while (tituloBuscar != '4')
}


function editarLibro(catalogo) {
    tituloBuscar = readline.question(`Ingrese el nombre del titulo que desea modificar: `.blue)
    let busqueda = catalogo.find(libro => libro.Titulo === tituloBuscar)
    if (busqueda) {
        console.log('Título: '.blue + busqueda.Titulo + ', ' +
                    'Autor: '.blue + busqueda.Autor + ', ' +
                    'Precio: '.blue + 'Q' + busqueda.Precio + ', ' +
                    'Publicado: '.blue + busqueda.Publicado)
        console.log(`El libro que se desea editar fue encontrado`.yellow)    
        console.log(`==============================================================================`.gray)    
        titulo = readline.question('Ingrese el nombre del titulo nuevo: '.gray)
        autor = readline.question('Ingrese el nombre del autor nuevo: '.gray)
        do {
            precio = Number(readline.question('Ingrese el precio nuevo: '.gray))
            if (precio <= 0 || isNaN(precio)) {
                console.log(`No se pueden ingresar negativos, cero o texto`.red)
            }
        } while (precio <= 0 || isNaN(precio))
        anio = readline.question('Ingrese la fecha de publicacion nueva (ejemplo: 1986): '.gray)
        let inicial = catalogo.indexOf(tituloBuscar)
        agregarLibro = { Titulo: titulo, Autor: autor, Precio: Number(precio), Publicado: Number(anio) }
        catalogo.splice(catalogo[inicial], 1, agregarLibro)
        console.clear()
        console.log(`El libro ha sido editado exitosamente`.green)
    } else {
        console.log(`No hay registros del libro que desea editar`.red)
    }
    console.log(`==============================================================================`.gray)
}

do {

    menu = readline.question(`

Bienvenido al Menu de Libreria "El Rincon del Saber"
Selecciona una de las opciones que deseas procesar

1. Agregar libro
2. Mostrar catalogo
3. Buscar libro por titulo
4. Eliminar libro
5. Ver estadisticas
6. Ordenar libros
7. Editar libro
8. Salir

Digite la opcion seleccionada: `.yellow)
    console.clear()

    switch (menu) {
        case '1':
            agregar()
            break

        case '2':
            mostrar(catalogo)
            break
        case '3':
            find(catalogo)
            break
        case '4':
            eliminar(catalogo)
            break
        case '5':
            estadisticas(catalogo)
            break
        case '6':
            ordenLibros(catalogo)
            break
        case '7':
            editarLibro(catalogo)
            break
        case '8':
            console.log(`Gracias por utilizar nuestra aplicacion`.green)
            console.log(`==============================================================================`.gray)
            break
        default:
            console.log(`La opcion que ingreso es incorrecta, seleccione una del menu`.red)
            break


    }



} while (menu != '8')


