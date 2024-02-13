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
    }, 3000);
  }
}

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


};