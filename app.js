import express from "express";
import "dotenv/config";
import dbConexion from "./database/cnxmongoose.js";
import cron from "node-cron";
import cliente from "./routes/clientes.js";
import ingresos from "./routes/ingresos.js";
import mantenimientos from "./routes/mantenimiento.js";
import maquinas from "./routes/maquinas.js";
import pagos from "./routes/pagos.js";
import planes from "./routes/planes.js";
import productos from "./routes/productos.js";
import sedes from "./routes/sedes.js";
import ventas from "./routes/ventas.js";
import usuarios from "./routes/usuarios.js";



const app = express();
app.use(express.json());
app.use("/api/clientes", cliente);
app.use("/api/ingresos", ingresos);
app.use("/api/mantenimientos", mantenimientos);
app.use("/api/maquinas",  maquinas);
app.use("/api/pagos", pagos);
app.use("/api/planes", planes);
app.use("/api/productos", productos);
app.use("/api/sedes",  sedes);
app.use("/api/ventas", ventas);
app.use("/api/usuarios", usuarios);

// cron.schedule("*/30 * * * * *", async () => {
//   try {
//     const ingresosVencidos = await cliente.findOne({
//       fechaVencimiento: { $lt: new Date() },
//     });

//     ingresosVencidos.forEach((ingreso) => {
//       enviarAlerta(ingreso);
//     });

//     console.log("Tarea cron ejecutada con éxito.");
//   } catch (error) {
//     console.error("Error al ejecutar la tarea cron:", error);
//   }
// });



app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  dbConexion();
});
