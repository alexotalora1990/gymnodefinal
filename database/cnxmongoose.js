// import mongoose from "mongoose";
// const dbConexion = async ()=>{
//     try {
//         await mongoose.connect(process.env.CNX_MONGO);
//         console.log("Conexion bd establecida");
        
//     } catch (error) {
//         console.log("Error al conectar la base de datos");
        
//     }
// } 

// export default dbConexion

import mongoose from 'mongoose';

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.CNX_MONGO);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
  }
};

export default dbConexion;
