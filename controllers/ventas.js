import ventas from "../models/ventas.js";
import productos from "../models/productos.js";
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

  getlistarVentasEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const ventasEntreFechas = await ventas.find({
        createAt: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
      });
      res.json({ ventasEntreFechas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar las ventas entre las fechas especificadas" });
    }
  },

  getVentasPorFecha: async (req, res) => {
    try {
      const { fecha } = req.query;
      console.log(fecha);

      if (!fecha) {
        return res.status(400).json({ error: "Se requiere una fecha en el parámetro de consulta" });
        
      }
    

    //   const inicio = new Date(fecha);
    //   const fin = new Date(fecha);
    //   fin.setDate(fin.getDate() + 1);

    //   console.log("Rango de fechas:", inicio, fin);

    //   const ventasPorFecha = await ventas.find({
    //     createAt: { $gte: inicio, $lt: fin }
    //   });

    //   console.log("Ventas encontradas:", ventasPorFecha);

    //   const totalVentas = ventasPorFecha.reduce((total, venta) => total + venta.total, 0);

    //   res.json({ ventasPorFecha, totalVentas });
    } catch (error) { 
      console.error("Error al buscar las ventas por fecha:", error);
      res.status(500).json({ error: "Error al buscar las ventas por fecha" });
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
 