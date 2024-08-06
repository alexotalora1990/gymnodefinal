import proveedores from "../models/proveedores.js";
import nodemailer from "nodemailer";


const httpProveedores ={
        getProveedor1: async (req, res) => {
          const Proveedor = await proveedores.find();
          res.json({ Proveedor });
        },
      
        getProveedor: async (req, res) => {
          const { busqueda } = req.query;
          const Proveedor = await proveedores.find({
            $or: [
              { email: new RegExp(busqueda, "i") },
              { nombre: new RegExp(busqueda, "i") },
              { documento: new RegExp(busqueda, "i") },
              { direccion: new RegExp(busqueda, "i") },
              { telefono: new RegExp(busqueda, "i") },
            ],
          })
          console.log(Proveedor);
      
          res.json({ Proveedor });
        },
      
        getProveedorID: async (req, res) => {
          const { id } = req.params;
          const Proveedor = await proveedores.findById(id);
          console.log(Proveedor);
          res.json({ Proveedor });
        },
      
        getProveedoresActivos: async (req, res) => {
          try {
      
            const ProveedoresActivos = await proveedores.find({ estado: 1 });
      
            res.json({ ProveedoresActivos });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar los Proveedores inactivos" });
          }
        },
      
        getProveedoresInactivos: async (req, res) => {
          try {
      
            const ProveedoresInactivos = await proveedores.find({ estado: 0 });
      
            res.json({ ProveedoresInactivos });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar los Proveedores inactivos" });
          }
        },
      
        getProveedoresPorMesCumpleanios: async (req, res) => {     
     
          try {
            const { mes } = req.params;
      
            const numeroMes = parseInt(mes);
      
            const ProveedoresCumpleaniosMes = await proveedores.find({
              $expr: { $eq: [{ $month: "$fechaNacimiento" }, numeroMes] }
            });
      
            res.json({ ProveedoresCumpleaniosMes });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar los Proveedores por mes de cumpleaños" });
          }
        },
      
        postProveedores: async (req, res) => {
          try {
            const {
              nombre,
              documento,
              direccion,
              telefono,
              email,
              fechaNacimiento,
      
            } = req.body;
           
            const Proveedor = new proveedores({
              nombre,
              documento,
              direccion,
              telefono,
              email,
              fechaNacimiento
            });
            await Proveedor.save();
            res.json({ Proveedor });
          } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el registro" });
          }
        },
           
        putProveedores: async (req, res) => {
          try {
            const { id } = req.params;
            const { nombre, ...resto } = req.body;
      
            const proveedorActualizado = await proveedores.findByIdAndUpdate(id, { nombre, ...resto }, { new: true });
      
            res.json({ Proveedor: proveedorActualizado });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al actualizar el Proveedor" });
          }
        },
      
        putProveedoresActivar: async (req, res) => {
      
          try {
            const { id } = req.params;
      
      
            const proveedorActivado = await proveedores.findByIdAndUpdate(
              id,
              { estado: 1 },
              { new: true }
            );
      
            res.json({ Proveedor: proveedorActivado });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al activar el Proveedor" });
      
          }
        },
        putProveedoresDesactivar: async (req, res) => {
      
          try {
            const { id } = req.params;
      
      
            const proveedorDesactivado = await proveedores.findByIdAndUpdate(
              id,
              { estado: 0 },
              { new: true }
            );
      
            res.json({ Proveedor: proveedorDesactivado });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al desactivar el Proveedor" });
      
          }
        },
        putListar: async (req, res) => {
          const { id } = req.params;
          const { _id, estado, createAt, ...resto } = req.body;
          console.log(resto);
      
          const Proveedor = await proveedores.findByIdAndUpdate(id, nombre, resto, {
            new: true,
          });
          res.json({ Proveedor });
        },
        
        
      };
      
      
      
      
      
      
      
      



export default httpProveedores





