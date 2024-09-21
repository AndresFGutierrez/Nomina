let listaNombresGastos = [];
let listaDescripcionGastos = [];
let listaValoresGastos = [];
let posicionModificando = -1; // Variable para almacenar la posición del gasto que se está editando

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;

    // Verifica si estamos modificando un gasto existente
    if (posicionModificando === -1) {
        // Si no estamos modificando, añadimos un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaDescripcionGastos.push(descripcionGasto);
        listaValoresGastos.push(parseFloat(valorGasto));
    } else {
        // Si estamos modificando, actualizamos el gasto existente
        listaNombresGastos[posicionModificando] = nombreGasto;
        listaDescripcionGastos[posicionModificando] = descripcionGasto;
        listaValoresGastos[posicionModificando] = parseFloat(valorGasto);

        // Reseteamos la variable para indicar que ya no estamos modificando
        posicionModificando = -1;
    }

    if (valorGasto > 150) {
        alert("Gasto mayor a 150$ dólares");
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos')
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionGastos[posicion];

        htmlLista += `<li>${elemento} - Descripcion: ${descripcionGasto} - USD ${valorGasto.toFixed(2)} 
        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        </li>`;

        totalGastos += valorGasto;
    });

    totalElementos.innerHTML = totalGastos.toFixed(2);
    listaElementos.innerHTML = htmlLista;
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    posicionModificando = -1; // Reseteamos la posición cuando limpiamos los campos
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);

    actualizarListaGastos();
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion]
    document.getElementById('valorGasto').value = listaValoresGastos[posicion]
    document.getElementById('descripcionGasto').value = listaDescripcionGastos[posicion]

    posicionModificando = posicion; // Guardamos la posición del gasto que estamos modificando
}