

import express from 'express';
import 'dotenv/config';
import dbConexion from './database/cnxmongoose.js';
import cron from 'node-cron';
import cors from 'cors';
import Usuarios from './models/usuarios.js';
import Productos from './models/productos.js';
import nodemailer from 'nodemailer';

import clientes from './routes/clientes.js';
import ingresos from './routes/ingresos.js';
import mantenimientos from './routes/mantenimiento.js';
import maquinas from './routes/maquinas.js'; 
import pagos from './routes/pagos.js';
import planes from './routes/planes.js';
import productos from './routes/productos.js'
import sedes from './routes/sedes.js';
import ventas from './routes/ventas.js';
import usuarios from './routes/usuarios.js';
import compras from './routes/compras.js';
import proveedor from "./routes/proveedor.js"
import Cliente from './models/clientes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/clientes', clientes);
app.use('/api/ingresos', ingresos);
app.use('/api/mantenimientos', mantenimientos);
app.use('/api/maquinas', maquinas);
app.use('/api/pagos', pagos);
app.use('/api/planes', planes);
app.use('/api/productos', productos);
app.use('/api/sedes', sedes);
app.use('/api/ventas', ventas);
app.use('/api/usuarios', usuarios);
app.use('/api/compras', compras);
app.use("/api/proveedor", proveedor)

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  dbConexion();


  
  cron.schedule('0 0 * * *', async () => {
    try {
      const hoy = new Date();
      const clientesActualizados = await Cliente.updateMany(
        { fechaVencimiento: { $lt: hoy }, estado: 1 },
        { $set: { estado: 0 } }
      );
      console.log(`Clientes actualizados: ${clientesActualizados.nModified}`);
    } catch (error) {
      console.error('Error al actualizar los clientes:', error);
    }
  });
  console.log('Tarea cron programada para ejecutarse a medianoche');
});



// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

cron.schedule('0 0 * * *', async () => {
  try {
    const hoy = new Date();

    
    const admin = await Usuarios.findOne({ roll: 'admin', estado: 1 });
    if (!admin) {
      console.error('No se encontró un administrador activo.');
      return;
    }

    
    const productosProximosAVencer = await Productos.find({
      vencimiento: {
        $gte: hoy,
        $lte: new Date(hoy.getTime() + (Productos.diasAlerta * 24 * 60 * 60 * 1000))
      }
    });

    if (productosProximosAVencer.length > 0) {
      const mensaje = productosProximosAVencer.map(prod => (
        `El producto ${prod.nombre} está próximo a vencer el ${prod.vencimiento.toLocaleDateString()}`
      )).join('\n');

     
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: 'Alerta de productos próximos a vencer',
        text: mensaje
      };

      // Enviar Correo
      await transporter.sendMail(mailOptions);
      console.log('Correo de alerta enviado al administrador.');
    }
  } catch (error) {
    console.error('Error al enviar alertas de vencimiento de productos:', error);
  }
});