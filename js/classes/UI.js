import { eliminarCita,cargarEdicion, dataBase } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

class UI {
  //Imprimir mensaje en el DOM dependiendo de la validación.
  imprimirAlerta(mensaje, tipo){
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
    // Agregar clase dependiendo del error.
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    };
    divMensaje.textContent = mensaje;
    //Mostrar en el DOM.
    document.querySelector('#contenido'). insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    //Quitar del DOM despues de 3 seg.
    setTimeout(() => {
      divMensaje.remove();
    }, 2000);
  };
  
  //Destructuring desde los parametros del metodo.
  imprimirCitas(){
    this.limpiarHTML();
    const objectStore = dataBase.transaction('citas').objectStore('citas');
    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cursor.value;
        const divCita = document.createElement('DIV');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        const mascotaParrafo = document.createElement('H2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('P');
        propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario:</span> ${propietario}
        `;

        const telefonoParrafo = document.createElement('P');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono:</span> ${telefono}
        `;

        const fechaParrafo = document.createElement('P');
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha:</span> ${fecha}
        `;

        const horaParrafo = document.createElement('P');
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora:</span> ${hora}
        `;

        const sintomasParrafo = document.createElement('P');
        sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
        `;

        //Mostrando el boton para eliminar elemento.
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
        </svg>
        `;

        btnEliminar.onclick = () => eliminarCita(id);
        const btnEditar = document.createElement('BUTTON');
        btnEditar.classList.add('btn', 'btn-info', 'mr-2');
        btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>`;
        const cita = cursor.value;
        btnEditar.onclick = () => cargarEdicion(cita);


        //Crear el div con la informacion.
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEditar);
        divCita.appendChild(btnEliminar);

        //Mostrarlo en el DOM.
        contenedorCitas.appendChild(divCita);

        //Ve al siguiente elemento.
        cursor.continue();

      }
    }

  };

  limpiarHTML(){
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    };
  };
};

export default UI;