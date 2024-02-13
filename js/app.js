/*VARIABLES.*/

const inputMascota = document.querySelector('#mascota'),
      inputPropietario = document.querySelector('#propietario'),
      inputTelefono = document.querySelector('#telefono'),
      inputFecha = document.querySelector('#fecha'),
      inputHora = document.querySelector('#hora'),
      inputSintomas = document.querySelector('#sintomas'),

//Variables de UI.
fomrulario = document.querySelector('#nueva-cita'),
contenedorCitas = document.querySelector('#citas');


//CLASES

class Citas {
  constructor(){
    this.citas = [];
  };

  agregarCita(cita){
    this.citas = [...this.citas, cita];
  };

  eliminarCita(id){
    this.citas = this.citas.filter( cita => cita.id !== id)
  }
}

const administrarCitas =new Citas();

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
  imprimirCitas({citas}){
    this.limpiarHTML();
    citas.forEach(cita => {
      const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
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
      <span class="font-weight-bolder">Hora:</span> ${telefono}
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

      //Crear el div con la informacion.
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);

      //Mostrarlo en el DOM.
      contenedorCitas.appendChild(divCita);

    });
  };

  limpiarHTML(){
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    };
  };
};

const ui = new UI();

//Objeto con info de la cita.
const citasObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};



/*FUNCIONES.*/
//Registro de eventos.
eventListeners();
function eventListeners() {
  inputMascota.addEventListener('input', datosCita);
  inputPropietario.addEventListener('input', datosCita);
  inputTelefono.addEventListener('input', datosCita);
  inputFecha.addEventListener('input', datosCita);
  inputHora.addEventListener('input', datosCita);
  inputSintomas.addEventListener('input', datosCita);
  fomrulario.addEventListener('submit', nuevaCita);

};

//Lectura los datos y los agregar a citaObj.
function datosCita(e) {
  citasObj[e.target.name] = e.target.value;

};

function nuevaCita(e) {
  e.preventDefault();

  //Estraer la informacion del objeto global de citas.
  const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

  //Validamos el formulario.
  if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los campos son obligatorios.', 'error');
    return;
  };

  // Generar un id.
  citasObj.id = Date.now();

  //Creando cita (Copia que no altera el objeto global).
  administrarCitas.agregarCita({...citasObj});

  //Reiniciar objeto principal
  reiniciarObjeto();
  //Reiniciar formulario.
  fomrulario.reset();
  
  //Imprimir las citas en el DOM.
  ui.imprimirCitas(administrarCitas);
};

function reiniciarObjeto() {
  citasObj.mascota = '';
  citasObj.propietario = '';
  citasObj.telefono = '';
  citasObj.fecha = '';
  citasObj.hora = '';
  citasObj.sintomas = '';
};

function eliminarCita(id) {
  //Eliminar la cita.
  administrarCitas.eliminarCita(id);
  //Mostrar alerta.
  ui.imprimirAlerta('La cita se elimino correctamente.');
  //Refrescar las citas.
  ui.imprimirCitas(administrarCitas);
};