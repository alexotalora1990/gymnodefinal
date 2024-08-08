import compras from "../models/compras.js";
import productos from "../models/productos.js";
import Pago from "../models/pagos.js";
const httpCompras ={
  
    getCompras: async (req, res) => {
        const Compra = await compras.find().populate('idproducto').populate('idsede').populate('idproducto');;
        res.json({ Compra });
      },
     
      getComprasId: async (req, res) => {
        const { id } = req.params;
        const Compra = await compras.findById(id);
        console.log(Compra);
        res.json({ Compra });
      },
    
      getComprasEntreFechas: async (req, res) => {
        try {
          const { fechaInicio, fechaFin } = req.params;
          const inicio = new Date(fechaInicio);
          inicio.setHours(0, 0, 0, 0);
          const fin = new Date(fechaFin);
          fin.setHours(23, 59, 59, 999);
    
          const comprasEntreFechas = await comprasompras.aggregate([
            {
              $match: {
                createAt: { $gte: inicio, $lt: fin }
              }
            },
            {
              $group: {
                _id: null,
                totalCompras: { $sum: "$total" },
                compras: { $push: "$$ROOT" }
              }
            }
          ]);
    
          res.json({ comprasEntreFechas });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al buscar las Compras entre las fechas proporcionadas" });
        }
      },
      getComprasPorDia: async (req, res) => {
        try {
          const { dia } = req.params;
          const fecha = new Date(dia);
    
          const comprasPorDia = await compras.aggregate([
            {
              $match: {
                $expr: { $eq: [{ $dayOfMonth: "$createAt" }, { $dayOfMonth: fecha }] }
              }
            },
            {
              $group: {
                _id: null,
                totalCompras: { $sum: "$total" },
                compras: { $push: "$$ROOT" }
              }
            }
          ]);
    
          res.json({ cachesomprasPorDia });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al buscar las Compras por día" });
        }
      },
         
      postCompras: async (req, res) => {
        try {
          const { idproducto, idproveedor, idsede, cantidad } = req.body;
         
          const producto = await productos.findById(idproducto);
          if (!producto) {  
            return res.status(404).json({ error: "El producto no existe" });
          }      
          const valorUnidad = producto.valor;
          const total = valorUnidad * cantidad;      
          if (producto.cantidad < cantidad) {
            return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
          }      
          const Compra = new compras({
            idproducto,idproveedor,idsede,valorUnidad,cantidad,total,                            
            });     
    
                 await Compra.save();
         
          producto.cantidad -= cantidad;
          await producto.save();
    
          res.json({ Compra });
        } catch (error) { 
          console.log(error);
          res.status(400).json({ error: "No se pudo crear el registro" });
        }
      },
      putactualizarCompras: async (req, res) => {
        try {
          const { id } = req.params;
          const { cantidad, ...resto } = req.body;
    
          const compraExistente = await compras.findById(id);
          if (!compraExistente) {
            return res.status(404).json({ message: "Compra no encontrada" });
          }
    
          const producto = await productos.findById(compraExistente.idproducto);
          if (!producto) {
            return res.status(404).json({ error: "El producto no existe" });
          } 
    
          if (cantidad) {
            const diferenciaCantidad = cantidad - compraExistente.cantidad; 
            if (producto.cantidad < diferenciaCantidad) {
              return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
            }
            producto.cantidad -= diferenciaCantidad;
            await producto.save();
    
            resto.total = cantidad * compraExistente.valorUnidad;
          }
    
          const compraActualiza = await compras.findByIdAndUpdate(id, { cantidad, ...resto }, { new: true });
          res.json({ compraActualiza });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo actualizar la Compra" });
        }
      },
     
      putListar: async (req, res) => {
        const { id } = req.params;
        const { _id, createAt, estado, ...resto } = req.body;
        console.log(resto);
    
        const Compra = await compras.findByIdAndUpdate(id, resto, {
          new: true,
        }); 
        res.json({ Compra });
      },
}

export default httpCompras