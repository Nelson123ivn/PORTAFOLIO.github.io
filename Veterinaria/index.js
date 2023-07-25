let data = [
  {
    nombre: "Gatico",
    tipo: "Peces",
    propietario: "Felipe",
    telefono: "1234567890",
    fecha: "2023-12-25",
    hora: "03:55",
    sintomas:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et totam, adipisci nostrum at facilis repellendus nisi distinctio quasi dolorum obcaecati nemo eius! Sequi, unde sint itaque architecto officiis quia nulla!",
  },
];

let cerrada = [
  {
    nombre: "xd",
    tipo: "Aves",
    propietario: "Felipe",
    telefono: "1234567890",
    fecha: "2023-12-25",
    hora: "03:55",
    sintomas:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et totam, adipisci nostrum at facilis repellendus nisi distinctio quasi dolorum obcaecati nemo eius! Sequi, unde sint itaque architecto officiis quia nulla!",
  },
];

let anulada = [
  {
    nombre: "sdafsd",
    tipo: "Anfibios",
    propietario: "Felipe",
    telefono: "1234567890",
    fecha: "2023-12-25",
    hora: "03:55",
    sintomas:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et totam, adipisci nostrum at facilis repellendus nisi distinctio quasi dolorum obcaecati nemo eius! Sequi, unde sint itaque architecto officiis quia nulla!",
  },
];

let array = data;

const imagenes = {
  mamiferos: "./imagenes/mamiferos.jpg",
  aves: "./imagenes/aves.jpg",
  anfibios: "./imagenes/anfibios.jpg",
  reptiles: "./imagenes/reptiles.png",
  peces: "./imagenes/peces.png",
};

document.addEventListener("DOMContentLoaded", () => {
  pintar(data);
  filtros();
});

const filtros = () => {
  let etiquetaAbi = document.createElement("label");
  let abierta = document.createElement("input");
  let etiquetaCer = document.createElement("label");
  let cerrada = document.createElement("input");
  let etiquetaAnu = document.createElement("label");
  let anulada = document.createElement("input");

  abierta.setAttribute("id", "abierta");
  abierta.setAttribute("type", "radio");
  abierta.setAttribute("name", "filtro");
  cerrada.setAttribute("id", "cerrada");
  cerrada.setAttribute("type", "radio");
  cerrada.setAttribute("name", "filtro");
  anulada.setAttribute("id", "anulada");
  anulada.setAttribute("type", "radio");
  anulada.setAttribute("name", "filtro");

  etiquetaAbi.appendChild(abierta);
  etiquetaAbi.innerHTML += ` Abiertas`;
  etiquetaCer.appendChild(cerrada);
  etiquetaCer.innerHTML += ` Cerradas`;
  etiquetaAnu.appendChild(anulada);
  etiquetaAnu.innerHTML += ` Anuladas`;
  document.getElementById("contenedorfiltros").appendChild(etiquetaAbi);
  document.getElementById("contenedorfiltros").appendChild(etiquetaCer);
  document.getElementById("contenedorfiltros").appendChild(etiquetaAnu);
  document.getElementById("abierta").checked = true;
  const inpustfiltros = document
    .getElementById("contenedorfiltros")
    .getElementsByTagName("input");
  const arr = Array.from(inpustfiltros);

  arr.forEach((e) => {
    e.addEventListener("change", () => {
      mostrarTarjetas(e.id);
    });
  });
};

const mostrarTarjetas = (id) => {
  document.getElementById("contenedor").innerHTML = "";
  if (id == "abierta") {
    pintar(data);
    array = data;
  } else if (id == "cerrada") {
    pintar(cerrada);
    array = cerrada;
  } else if (id == "anulada") {
    pintar(anulada);
    array = anulada;
  }
};

const limpiar = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("propietario").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("sintomas").value = "";
};

function pintar(arr) {
  let fragment = document.createDocumentFragment();
  arr.forEach((d, i) => {
    let contenedor = document.createElement("div");
    let foto = document.createElement("img");
    let nombre = document.createElement("p");
    let tipo = document.createElement("p");
    let propietario = document.createElement("p");
    let telefono = document.createElement("p");
    let fecha = document.createElement("p");
    let hora = document.createElement("p");
    let sintomas = document.createElement("p");
    let btEditar = document.createElement("button");
    let select = document.createElement("select");
    let opcionabierta = document.createElement("option")
    let opcioncerrada = document.createElement("option")
    let opcionanulada = document.createElement("option")

    contenedor.setAttribute("class", "citas");
    nombre.textContent = "Nombre:  " + d.nombre;
    tipo.textContent = "Tipo:  " + d.tipo;
    propietario.textContent = "Propietario:  " + d.propietario;
    telefono.textContent = "Telefono:  " + d.telefono;
    fecha.textContent = "Fecha: " + d.fecha;
    hora.textContent = "Hora:  " + d.hora;
    sintomas.textContent = "Sintomas:  " + d.sintomas;
    btEditar.textContent = "Editar";
    btEditar.setAttribute("data-bs-toggle", "modal");
    btEditar.setAttribute("data-bs-target", "#exampleModal");
    btEditar.addEventListener("click", () => {
      editar(d);
    });
    select.addEventListener("change", () => {
      eliminar(d,i);
    });
    opcionabierta.value="abierta"
    opcionabierta.textContent="Abrir"
    opcioncerrada.value="cerrada"
    opcioncerrada.textContent="Cerrar"
    opcionanulada.value="anulada"
    opcionanulada.textContent="Anular"

    foto.src = imagenes[d.tipo.toLowerCase()];

    contenedor.appendChild(foto);

    contenedor.appendChild(nombre);
    contenedor.appendChild(tipo);
    contenedor.appendChild(propietario);
    contenedor.appendChild(telefono);
    contenedor.appendChild(fecha);
    contenedor.appendChild(hora);
    contenedor.appendChild(sintomas);
    contenedor.appendChild(btEditar);
    if (array == data) {
      select.appendChild(opcionabierta);
      select.appendChild(opcioncerrada);
      select.appendChild(opcionanulada);
    } else if (array == cerrada) {
      select.appendChild(opcioncerrada);
      select.appendChild(opcionabierta);
      select.appendChild(opcionanulada);
    } else if (array == anulada) {
      select.appendChild(opcionanulada);
      select.appendChild(opcionabierta);
      select.appendChild(opcioncerrada);
    }
    contenedor.appendChild(select)

    fragment.appendChild(contenedor);
  });
  document.getElementById("contenedor").appendChild(fragment);
}

let bd = 0;
let c = 0;
let id = 0;

function guardar() {
  if (true) {
    if (bd == 1) {
      array.forEach((e, i) => {
        if (e.id === id) {
          e.nombre = document.getElementById("nombre").value;
          e.propietario = document.getElementById("propietario").value;
          e.telefono = document.getElementById("telefono").value;
          e.tipo = document.getElementById("tipo").value;
          e.fecha = document.getElementById("fecha").value;
          e.hora = document.getElementById("hora").value;
          e.sintomas = document.getElementById("sintomas").value;
        }
      });
    } else {
      data.push({
        id: c + 1,
        nombre: document.getElementById("nombre").value,
        propietario: document.getElementById("propietario").value,
        telefono: document.getElementById("telefono").value,
        tipo: document.getElementById("tipo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        sintomas: document.getElementById("sintomas").value,
      });
    }
    document.getElementById("contenedor").innerHTML = "";
    pintar(array);
    limpiar();
  }
}

function editar(r) {
  bd = 1;
  console.log(r);
  id = r.id;
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("propietario").value = r.propietario;
  document.getElementById("telefono").value = r.telefono;
  document.getElementById("tipo").value = r.tipo.toLowerCase();
  document.getElementById("fecha").value = r.fecha;
  document.getElementById("hora").value = r.hora;
  document.getElementById("sintomas").value = r.sintomas;
}

function crear() {
  limpiar();
  bd = 0;
  document.getElementById("id").value = data[data.length - 1].id + 1;
}

function eliminar(d, i) {
  let evento = event.target.value

  if(evento == "abierta"){
    data.push(d)
    array.splice(i, 1);
  }else if(evento=="cerrada"){
    cerrada.push(d)
    array.splice(i, 1);
  }else if(evento=="anulada"){
    anulada.push(d)
    array.splice(i, 1);
  }


  document.getElementById("contenedor").innerHTML = "";
  pintar(array);

}

function cambiarImagen(select, img) {}
