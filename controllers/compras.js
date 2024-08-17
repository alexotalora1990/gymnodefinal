import compras from "../models/compras.js";
import productos from "../models/productos.js";

const httpCompras = {
  // Obtener todas las compras
  getCompras: async (req, res) => {
    const Compra = await compras.find().populate('idproducto').populate('idsede').populate('idproveedor');
    res.json({ Compra });
  },

  // Obtener una compra por ID
  getComprasId: async (req, res) => {
    const { id } = req.params;
    const Compra = await compras.findById(id);
    res.json({ Compra });
  },

  // Crear una nueva compra
  postCompras: async (req, res) => {
    try {
      const { idproducto, idproveedor, idsede, cantidad, valorUnidad } = req.body;

      
      // Verificar si el producto existe
      const producto = await productos.findById(idproducto); 
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      }

      const total =  parseFloat(valorUnidad) * parseInt(cantidad); 

      // Crear la compra
      const Compra = new compras({
        idproducto,
        idproveedor,
        idsede,
        valorUnidad,
        cantidad,
        total,
      });

      // Guardar la compra en la base de datos
      await Compra.save();

      // Actualizar la cantidad del producto
      producto.cantidad += cantidad;  // Incrementar la cantidad del producto
      await producto.save();

      res.json({ Compra });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear la compra" });
    }
  },

  // Actualizar una compra existente
  putactualizarCompras: async (req, res) => {
    try {
      const { id } = req.params;
      const { cantidad, ...resto } = req.body;

      // Encontrar la compra existente
      const compraExistente = await compras.findById(id);
      if (!compraExistente) {
        return res.status(404).json({ message: "Compra no encontrada" });
      }

      // Encontrar el producto relacionado
      const producto = await productos.findById(compraExistente.idproducto);
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      }

      if (cantidad) {
        // Calcular la diferencia en la cantidad
        const diferenciaCantidad = cantidad - compraExistente.cantidad;

        // Actualizar la cantidad del producto según la diferencia
        producto.cantidad += diferenciaCantidad;
        await producto.save();

        resto.total = cantidad * compraExistente.valorUnidad;
      }

      // Actualizar la compra con la nueva cantidad y otros datos
      const compraActualiza = await compras.findByIdAndUpdate(id, { cantidad, ...resto }, { new: true });
      res.json({ compraActualiza });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar la compra" });
    }
  },




  
};

export default httpCompras;
