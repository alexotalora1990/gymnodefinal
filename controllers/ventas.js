import ventas from "../models/ventas.js";
import productos from "../models/productos.js";
import Pago from "../models/pagos.js";
const httpVenta = {
  getVentas: async (req, res) => {
    const Venta = await ventas.find().populate('idcliente').populate('idsede').populate('idproducto');;
    res.json({ Venta });
  },
 
 

  getVentasId: async (req, res) => {
    const { id } = req.params;
    const Venta = await ventas.findById(id);
    console.log(Venta);
    res.json({ Venta });
  },

  getVentasEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;

      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: "Se requieren fechas de inicio y fin" });
      } 

      const startDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Fechas inválidas" });
      }

      // Ajustar la hora del endDate para incluir todo el día
      endDate.setUTCHours(23, 59, 59, 999);

      const ventasEntreFechas = await ventas.find({
        createAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate('idcliente')
      .populate('idsede')
      .populate('idproducto')
      .exec(); // Añadir exec() para ejecutar la consulta

      res.json({ ventas: ventasEntreFechas });
    } catch (error) {
      console.error("Error al obtener las ventas entre fechas:", error);
      res.status(500).json({ error: "Error al obtener las ventas entre fechas" });
    }
  },
  getVentasPorDia: async (req, res) => {
    try {
      const { fecha } = req.query;
      if (!fecha) {
        return res.status(400).json({ error: "Se requiere una fecha en el formato YYYY-MM-DD" });
      }
  
      const startDate = new Date(fecha);
      const endDate = new Date(fecha);
      endDate.setUTCHours(23, 59, 59, 999); // Ajustar la hora para incluir todo el día
  
      const ventasDia = await ventas.find({
        createAt: { $gte: startDate, $lt: endDate }
      })
      .populate('idcliente')
      .populate('idsede')
      .populate('idproducto');
  
      const totalVentas = ventasDia.reduce((acc, venta) => acc + venta.total, 0);
  
      res.json({ ventas: ventasDia, totalVentas });
    } catch (error) {
      console.error('Error en la consulta de ventas:', error); 
      res.status(500).json({ error: "No se pudieron obtener las ventas" });
    }
  },
     
  postVentas: async (req, res) => {
    try {
      const { idproducto, idcliente, idsede, cantidad } = req.body;
     
      const producto = await productos.findById(idproducto);
      if (!producto) {  
        return res.status(404).json({ error: "El producto no existe" });
      }      
      const valorUnidad = producto.valor;
      const total = valorUnidad * cantidad;      
      if (producto.cantidad < cantidad) {
        return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
      }      
      const Venta = new ventas({
        idproducto,idcliente,idsede,valorUnidad,cantidad,total,                            
        });     

             await Venta.save();
     
      producto.cantidad -= cantidad;
      await producto.save();

      res.json({ Venta });
    } catch (error) { 
      console.log(error);
      res.status(400).json({ error: "No se pudo crear el registro" });
    }
  },
  putactualizarVentas: async (req, res) => {
    try {
      const { id } = req.params;
      const { cantidad, ...resto } = req.body;

      const ventaExistente = await ventas.findById(id);
      if (!ventaExistente) {
        return res.status(404).json({ message: "Venta no encontrada" });
      }

      const producto = await productos.findById(ventaExistente.idproducto);
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      } 

      if (cantidad) {
        const diferenciaCantidad = cantidad - ventaExistente.cantidad; 
        if (producto.cantidad < diferenciaCantidad) {
          return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
        }
        producto.cantidad -= diferenciaCantidad;
        await producto.save();

        resto.total = cantidad * ventaExistente.valorUnidad;
      }

      const ventaActualiza = await ventas.findByIdAndUpdate(id, { cantidad, ...resto }, { new: true });
      res.json({ ventaActualiza });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar la venta" });
    }
  },
 
  putListar: async (req, res) => {
    const { id } = req.params;
    const { _id, createAt, estado, ...resto } = req.body;
    console.log(resto);

    const Venta = await ventas.findByIdAndUpdate(id, resto, {
      new: true,
    }); 
    res.json({ Venta });
  },
};

export default httpVenta;
 