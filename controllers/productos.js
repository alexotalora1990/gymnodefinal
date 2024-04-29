import Producto from "../models/productos.js";

const httpProducto = {
  getProducto: async (req, res) => {
    try {
      const producto = await Producto.find();
      res.json({ producto });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  },

  getProductoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findById(id);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ producto});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  },

 

  postcrearProducto: async (req, res) => {
    try {
      const { _id,descripcion, valor, cantidad} = req.body;
      
      const nuevoProducto = new Producto({ _id,descripcion, valor, cantidad});
      await nuevoProducto.save();
      res.status(201).json({ nuevoProducto});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Producto no creado" });
    }
  },

  putactualizarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoActualizo = await Producto.findByIdAndUpdate(id, req.body, { new: true });
      if (!productoActualizo) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ productoActualizo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el producto" });
    }
  },

  putactivarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoActivo = await Producto.findByIdAndUpdate(id, { activo: true }, { new: true });
      if (!productoActivo) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ productoActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar el producto" });
    }
  },

  putinactivarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoInactivar= await Producto.findByIdAndUpdate(id, { activo: false }, { new: true });
      if (!planInactivar) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ productoInactivar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar el producto" });
    }
  }
};

export default httpProducto;