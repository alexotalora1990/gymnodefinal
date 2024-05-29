import productos from "../models/productos.js";
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

  getProductosActivos: async (req, res) => {
    try { 
      
      const productosActivos = await productos.find({estado: 1}); 

      res.json({ productosActivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los productos activos" });
    }
  },

  getProductosInactivos: async (req, res) => {
    try { 
      
      const productosInactivos = await productos.find({estado: 0}); 

      res.json({ productosInactivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los productos inactivos" });
    }
  },

  postcrearProducto: async (req, res) => {
    try {
      const { _id, nombre, valor, cantidad} = req.body;
      
      const nuevoProducto = new Producto({ _id, nombre, valor, cantidad});
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

  putActivarProducto: async (req, res) => {
    try {
      const { id } = req.params;
 
      const productoActivo = await productos.findByIdAndUpdate(
        id, 
        { estado: 1 }, 
        { new: true });
     
        
         res.json({  productoActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar el producto" });
    }
  },
  putDesactivarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoInactivo = await productos.findByIdAndUpdate(id, { estado:0 }, { new: true });
     
      res.json({ productoInactivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo desactivar el producto" });
    }
  }  
};

export default httpProducto;