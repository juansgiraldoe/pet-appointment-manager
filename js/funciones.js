import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import { inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from "./selectores.js"

const administrarCitas =new Citas();
const ui = new UI();

let dataBase;
let editando;

//Objeto con info de la cita.
const citasObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

//Lectura los datos y los agregar a citaObj.
export function datosCita(e) {
  citasObj[e.target.name] = e.target.value;

};

export function nuevaCita(e) {
  e.preventDefault();

  //Estraer la informacion del objeto global de citas.
  const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;
  
  //Validamos el formulario.
  if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los campos son obligatorios.', 'error');
    return;
  };
  
  if (editando) {
    ui.imprimirAlerta('Se edito correctamente.');
    //Pasar el objeto de la cita a edicion.
    administrarCitas.editarCita({...citasObj});
    formulario.querySelector('button[type="submit"]').textContent = 'Crear cita.';
    editando = false;
  } else {
    // Generar un id.
    citasObj.id = Date.now();
    
    //Creando cita (Copia que no altera el objeto global).
    administrarCitas.agregarCita({...citasObj});

    //Insertar registro en IndexDB.
    const transaction = dataBase.transaction(['citas'], 'readwrite');

    //Habilitar el objectStore.
    const objectStore = transaction.objectStore('citas');
    
    //Insertar en la base de datos.
    objectStore.add(citasObj);
    
    transaction.oncomplete = () => {
      console.log('Cita agregada a indexdb.');
      //Mensaje de notificación.
      ui.imprimirAlerta('Se agrego correctamente.');
    }
  }
  
  
  //Reiniciar objeto principal
  reiniciarObjeto();
  //Reiniciar formulario.
  formulario.reset();
  
  //Imprimir las citas en el DOM.
  ui.imprimirCitas(administrarCitas);
};

export function reiniciarObjeto() {
  citasObj.mascota = '';
  citasObj.propietario = '';
  citasObj.telefono = '';
  citasObj.fecha = '';
  citasObj.hora = '';
  citasObj.sintomas = '';
};

export function eliminarCita(id) {
  //Eliminar la cita.
  administrarCitas.eliminarCita(id);
  //Mostrar alerta.
  ui.imprimirAlerta('La cita se elimino correctamente.');
  //Refrescar las citas.
  ui.imprimirCitas(administrarCitas);
};

//Carga los datos y modo edición.
export function cargarEdicion(cita) {
  const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
  
  //Llenar los inputs.
  inputMascota.value = mascota;
  inputPropietario.value = propietario;
  inputTelefono.value = telefono;
  inputFecha.value = fecha;
  inputHora.value = hora;
  inputSintomas.value = sintomas;

  //Llenar el objeto principal.
  citasObj.mascota = mascota;
  citasObj.propietario = propietario;
  citasObj.telefono = telefono;
  citasObj.fecha = fecha;
  citasObj.hora = hora;
  citasObj.sintomas = sintomas;
  citasObj.id = id;

  //Cambiar el texto del boton.
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios.';
  editando = true;
};

export function crearDB() {
  //Creamos la base de datos V1.0
  const crearDataBase = window.indexedDB.open('citas', 1);

  //Error.
  crearDataBase.onerror = function () {
    console.log('Hubo un error.');
  };

  //Bien.
  crearDataBase.onsuccess = function () {
    console.log('BD creada.');
    dataBase = crearDataBase.result;
  };

  //Definir esquema.
  crearDataBase.onupgradeneeded = function (e) {
    const db = e.target.result;
    const objectStore = db.createObjectStore('citas', {
      keyPath: 'id',
      autoIncrement: true,
    });
    objectStore.createIndex('mascota', 'mascota', {unique: false});
    objectStore.createIndex('propietario', 'propietario', {unique: false});
    objectStore.createIndex('telefono', 'telefono', {unique: false});
    objectStore.createIndex('fecha', 'fecha', {unique: false});
    objectStore.createIndex('hora', 'hora', {unique: false});
    objectStore.createIndex('sintomas', 'sintomas', {unique: true});
    objectStore.createIndex('id', 'id', {unique: true});

    console.log('Base de datos creada y lista.');
  };
};