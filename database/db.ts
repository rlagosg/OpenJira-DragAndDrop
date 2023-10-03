import mongoose from "mongoose";

/* 
 * 0 = disconected
 * 1 = conected
 * 2 = conecting
 * 3 = disconecting
 */

const mongoConection = {
    isContected: 0,

}

export const connect = async () => {
   
    if( mongoConection.isContected === 0){
        console.log('Estamos desnectados');
        return;
    }

    if( mongoose.connections.length > 0){
        mongoConection.isContected = mongoose.connections[0].readyState;

        if( mongoConection.isContected === 1){
            console.log('Usando conexion anterior');
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConection.isContected = 1
    console.log('Conectado a MongoDB:', process.env.MONGO_URL);
    
    
}

export const disconnect = async () => {

    if( process.env.NODE_ENV === 'development') return;

    if(mongoConection.isContected === 0) return;
    
    await mongoose.disconnect();
    mongoConection.isContected = 0;
    console.log('Desconectado de MongoDB');
    
}