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
};

//Lectura los datos y los agregar a citaObj.
function datosCita(e) {
  citasObj[e.target.name] = e.target.value;
  console.log(citasObj);
};
