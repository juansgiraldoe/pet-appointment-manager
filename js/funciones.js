import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import { inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from "./selectores.js"

const administrarCitas =new Citas();
const ui = new UI();

export let dataBase;
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
    //Pasar el objeto de la cita a edicion.
    administrarCitas.editarCita({...citasObj});
    //Editar en indexDB.
    const transaction = dataBase.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');
    objectStore.put(citasObj);

    transaction.oncomplete = function () {
      formulario.querySelector('button[type="submit"]').textContent = 'Crear cita.';
      ui.imprimirAlerta('Se edito correctamente.');
      editando = false;
    }
    transaction.onerror = function () {
      console.log('Hubo un error.');
    }
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
      //Mensaje de notificación.
      ui.imprimirAlerta('Se agrego correctamente.');
    }
  }
  
  
  //Reiniciar objeto principal
  reiniciarObjeto();
  //Reiniciar formulario.
  formulario.reset();
  
  //Imprimir las citas en el DOM.
  ui.imprimirCitas();
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
  const transaction = dataBase.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');
  objectStore.delete(id);
  transaction.oncomplete = ()=> {
    //Mostrar alerta.
    ui.imprimirAlerta('La cita se elimino correctamente.');
    //Refrescar las citas.
    ui.imprimirCitas();
  }
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
    dataBase = crearDataBase.result;
    //Mostrar citas al cargar pero indexDB este listo.
    ui.imprimirCitas();
  };

  //Definir esquema.
  crearDataBase.onupgradeneeded = function (e) {
    const db = e.target.result;
    const objectStore = db.createObjectStore('citas', {
      keyPath: 'id',
      autoIncrement: true,
    });
    //Definicion de columnas.
    objectStore.createIndex('mascota', 'mascota', {unique: false});
    objectStore.createIndex('propietario', 'propietario', {unique: false});
    objectStore.createIndex('telefono', 'telefono', {unique: false});
    objectStore.createIndex('fecha', 'fecha', {unique: false});
    objectStore.createIndex('hora', 'hora', {unique: false});
    objectStore.createIndex('sintomas', 'sintomas', {unique: true});
    objectStore.createIndex('id', 'id', {unique: true});
  };
};