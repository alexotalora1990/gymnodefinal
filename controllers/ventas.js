import ventas from "../models/ventas.js";
import productos from "../models/productos.js";
const httpVenta = {
  getVentas: async (req, res) => {
    const Venta = await ventas.find().populate('idcliente').populate('idsede').populate('idproducto');;
    res.json({ Venta });
  },

  // getVentas: async (req, res) => {
  //   const { busqueda } = req.query;
  //   const Venta = await ventas
  //     .find({
  //       $or: [
  //         { createAt: new RegExp(busqueda, "i") },
  //         { numfact: new RegExp(busqueda, "i") },
  //         { fecha: new RegExp(busqueda, "i") },
          
  //       ],
  //     })
  //     .populate('idcliente').populate('idsede').populate('idproducto');
  //   console.log(Venta);

  //   res.json({ Venta });
  // },

  getVentasId: async (req, res) => {
    const { id } = req.params;
    const Venta = await ventas.findById(id);
    console.log(Venta);
    res.json({ Venta });
  },

  getlistarVentasEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const ventasEntreFechas = await Venta.find({
        createAt: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
      });
  
      res.json({ ventasEntreFechas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar las ventas entre las fechas especificadas" });
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
      const ventaActualiza = await ventas.findByIdAndUpdate(id, req.body, { new: true });
      if (!ventaActualiza) {
        return res.status(404).json({ message: "Sede no encontrada" });
      }
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
 