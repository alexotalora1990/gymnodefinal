import usuarios from "../models/usuarios.js";
import Sede from "../models/sedes.js";
import bcryptjs from "bcryptjs"; 

import { generarJWT } from "../middlewares/validar-jwt.js";
const httpUsuarios = {
  getUsuarios: async (req, res) => {
    const Usuario = await usuarios.find();
    res.json({ Usuario });
  },
  getUsuarios1: async (req, res) => {
    const { busqueda } = req.query;
    const Usuario = await usuarios.find({
      $or: [
        { nombre: new RegExp(busqueda, "i") },
        { cc: new RegExp(busqueda, "i") },
        { password: new RegExp(busqueda, "i") },
      ],
    });
    console.log(Usuario);
    res.json({ Usuario });
  },
  getUsuariosId: async (req, res) => {
    const { id } = req.params;
    const Usuario = await usuarios.findById(id);
    console.log(Usuario);
    res.json({ Usuario });
  },
  getUsuariosActivos: async (req, res) => {
    try { 
      
      const UsuariosActivos = await usuarios.find({estado: 1}); 

      res.json({ UsuariosActivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los clientes activos" });
    }
  },

  getUsuariosInactivos: async (req, res) => {
    try { 
      
      const UsuariosInactivos = await usuarios.find({estado: 0}); 

      res.json({ UsuariosInactivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los usuarios inactivos" });
    }
  },
  postCrearUsuario: async (req, res) => {
    const { nombre, cc, password, roll, idsede, email, telefono } = req.body;
    
    // Buscar la sede utilizando el ID
    const sede = await Sede.findById(idsede);

    if (!sede) {
        return res.status(400).json({ error: "La sede especificada no existe." });
    }

    const Usuario = new usuarios({ nombre, cc, password, roll, idsede, email, telefono, sede: sede.nombre });
    const salt = bcryptjs.genSaltSync(5);
    Usuario.password = bcryptjs.hashSync(password, salt);
    await Usuario.save();
    res.json({ Usuario });
},
  // postCrearUsuario: async (req, res) => {
  //   const { nombre, cc, password, roll,idsede, email,telefono,sede } = req.body;
  //   const Usuario = new usuarios({ nombre, cc, password, roll,idsede, email,telefono,sede });
  //   const salt = bcryptjs.genSaltSync(5);
  //   Usuario.password = bcryptjs.hashSync(password, salt);
  //   await Usuario.save();
  //   res.json({
  //     Usuario,
  //   });
  // },
  putUsuarios: async (req, res) => {
    const { id } = req.params;
    const { _id, nombre, createAt, ...resto } = req.body;
    console.log(resto);
    const Usuario = await usuarios.findByIdAndUpdate(id, nombre, resto, {
      new: true,
    });
    res.json({ Usuario });
  },
  putUsuariosActivar: async (req, res) => {
    try {
      const { id } = req.params;

      const usuarioActivo = await usuarios.findByIdAndUpdate(
        id, 
        { estado: 1 }, 
        { new: true });
     
        
         res.json({  usuarioActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar la maquina" });
    }
  },
  putUsuariosDesactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioInactivo = await usuarios.findByIdAndUpdate(id, { estado:0 }, { new: true });
     
      res.json({ usuarioInactivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar la maquina" });
    }
  },

    putListar: async (req, res) => {
    const { id } = req.params;
    const { _id, estado, createAt, ...resto } = req.body;
    console.log(resto);
    const Usuario = await usuarios.findByIdAndUpdate(id, nombre, resto, {
      new: true,
    });
    res.json({ Usuario });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usuarios.findOne({email });
      if (!user) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      if (user.estado === 0) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      const token = await generarJWT(user._id);
      res.json({
        usuario: user,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
};
export default httpUsuarios;