const tabla = document.getElementById("tabla");
const modalNombre = document.getElementById("inpNombre");
const modalPass = document.getElementById("inpPass");
const modalBT = document.getElementById("exampleModal");
let usuarioElegido = -1;

const mockApiURL = "https://62a7b8c6bedc4ca6d7cce28d.mockapi.io/users";

/* getUsuarios
Recupera la lista de todos los usuarios
*/

let listado = [];

getUsers().then((res) => {
  listado = res;
  pintarUsuarios();
}); //MacroTareas

function mostrar() {
  console.log(listado);
}

/* Get de todos los users */
async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();
  return data;
}

function pintarUsuarios() {
  console.log("inicio");
  listado.forEach((fila) => {
    console.log("ejecuto");
    let rowNueva = document.createElement("div");
    let nombre = document.createElement("div");
    let pass = document.createElement("div");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    rowNueva.classList.add("row");
    nombre.classList.add("col-3");
    pass.classList.add("col-3");
    btnEdit.className = "col-3 btn btn-success";
    btnDelete.className = "col-3 btn btn-danger";

    nombre.innerHTML = fila.name;
    pass.innerHTML = fila.pass;
    btnEdit.innerHTML = "Mas";
    btnDelete.innerHTML = "Eliminar";

    btnEdit.setAttribute("data-bs-toggle", "modal");
    btnEdit.setAttribute("data-bs-target", "#exampleModal");

    btnEdit.addEventListener("click", () => {
      console.log(getUserById(fila.id));
    });
    btnDelete.addEventListener("click", () => {
      deleteUser(fila.id);
    });

    rowNueva.append(nombre);
    rowNueva.append(pass);
    rowNueva.append(btnEdit);
    rowNueva.append(btnDelete);

    tabla.append(rowNueva);
  });
  console.log("fin");
}

async function getUserById(id) {
  let resultado = await fetch(`${mockApiURL}/${id}`);
  let data = await resultado.json();
  usuarioElegido = data.id;
  modalNombre.value = data.name;
  modalPass.value = data.pass;
}

async function editUser() {
  // Elimina  usuario por id
  if (modalNombre.value.length > 0 && modalPass.value.length > 0) {
    let update = {
      name: modalNombre.value,
      pass: modalPass.value,
    };
    updateData = JSON.stringify(update);
    console.log(usuarioElegido)
    let resultado = await fetch(`${mockApiURL}/${usuarioElegido}`, {
        method: "PUT",
        body:updateData,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          }      
    });
    let data = await resultado.json();
    modalNombre.value = '';
    modalPass.value = '';
    usuarioElegido = -1;
    modalBT.hide();
    return data;
  } else {
    alert("Rellene los datos obligatorios");
  }
}

async function deleteUser(id) {
  // Elimina  usuario por id
  let resultado = await fetch(`${mockApiURL}/${id}`, { method: "DELETE" });
  let data = await resultado.json();
  return data;
}
