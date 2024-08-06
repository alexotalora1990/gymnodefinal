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
      const { fechaInicio, fechaFin } = req.params;
      const inicio = new Date(fechaInicio);
      inicio.setHours(0, 0, 0, 0);
      const fin = new Date(fechaFin);
      fin.setHours(23, 59, 59, 999);

      const ventasEntreFechas = await ventas.aggregate([
        {
          $match: {
            createAt: { $gte: inicio, $lt: fin }
          }
        },
        {
          $group: {
            _id: null,
            totalVentas: { $sum: "$total" },
            ventas: { $push: "$$ROOT" }
          }
        }
      ]);

      res.json({ ventasEntreFechas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar las ventas entre las fechas proporcionadas" });
    }
  },
  getVentasPorDia: async (req, res) => {
    try {
      const { dia } = req.params;
      const fecha = new Date(dia);

      const ventasPorDia = await ventas.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $dayOfMonth: "$createAt" }, { $dayOfMonth: fecha }] }
          }
        },
        {
          $group: {
            _id: null,
            totalVentas: { $sum: "$total" },
            ventas: { $push: "$$ROOT" }
          }
        }
      ]);

      res.json({ ventasPorDia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar las ventas por día" });
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
 