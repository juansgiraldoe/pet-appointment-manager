import { datosCita, nuevaCita, crearDB } from "../funciones.js";
import { inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora, inputSintomas, formulario } from "../selectores.js";

class App {
  constructor(){
    this.initApp();
  };
  initApp(){
    window.onload = ()=> {
      crearDB();
    }
  inputMascota.addEventListener('input', datosCita);
  inputPropietario.addEventListener('input', datosCita);
  inputTelefono.addEventListener('input', datosCita);
  inputFecha.addEventListener('input', datosCita);
  inputHora.addEventListener('input', datosCita);
  inputSintomas.addEventListener('input', datosCita);
  
  //Formulario para nuevas citas.
  formulario.addEventListener('submit', nuevaCita);
  };
};

export default App;