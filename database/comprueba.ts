import { Entry } from "@/models";
import mongoose from "mongoose";


// Configura la conexión a la base de datos con opciones vacías
mongoose.connect('mongodb://localhost/entriesdb', {});

// Función para verificar la conexión a la base de datos
export const checkDatabaseConnection = () => {
  const connectionState = mongoose.connection.readyState;

  switch (connectionState) {
    case 0:
      console.log('No hay conexión a la base de datos.');
      break;
    case 1:
      console.log('Conexión exitosa a la base de datos.');
      break;
    case 2:
      console.log('Conectando a la base de datos...');
      break;
    case 3:
      console.log('Desconectando de la base de datos...');
      break;
    default:
      console.log('Estado de conexión desconocido.');
      break;
  }
};

// Llamamos a la función para verificar la conexión después de configurarla
mongoose.connection.once('open', () => {
  checkDatabaseConnection();
});


// Función para borrar todos los documentos de la colección 'Entry'
export const deleteAllEntries = async () => {
    try {
      await Entry.deleteMany({});
      console.log('Todos los documentos de la colección "Entry" han sido eliminados.');
    } catch (error) {
      console.error('Error al borrar documentos:', error);
    }
  };
  
  