import usuarios from "../models/usuarios.js";
import Sede from "../models/sedes.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import sendEmail from './sendEmail.js';

import { generarJWT } from "../middlewares/validar-jwt.js";


const httpUsuarios = {
  getUsuarios: async (req, res) => {
    const Usuario = await usuarios.find().populate('idsede');
    res.json({ Usuario });
  },

  getUsuarios1: async (req, res) => {
    const { busqueda } = req.query;

    let Usuario;
    if (busqueda) {
      Usuario = await usuarios.find({
        nombre: new RegExp(busqueda, "i")
      }).sort({ nombre: 1 }); // Ordena los resultados por nombre de manera ascendente
    } else {
      Usuario = await usuarios.find().sort({ nombre: 1 }); // Lista todos los usuarios y los ordena por nombre
    }
    
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
    const { nombre,  password, roll, idsede, email, telefono } = req.body;
    const sede = await Sede.findById(idsede);

    if (!sede) {
      return res.status(400).json({ error: "La sede especificada no existe." });
    }

    const Usuario = new usuarios({ nombre,  password, roll, idsede, email, telefono, sede: sede.nombre });
    const salt = bcryptjs.genSaltSync(5);
    Usuario.password = bcryptjs.hashSync(password, salt);
    await Usuario.save();
    res.json({ Usuario });
  },
  putUsuarios: async (req, res) => {
    const { id } = req.params;
    const { _id,  createAt, ...resto } = req.body; 
    console.log(resto);
    const Usuario = await usuarios.findByIdAndUpdate(id, { $set: resto }, { new: true });
    res.json({ Usuario });
  },
  putUsuariosActivar: async (req, res) => {
    try {  
      const { id } = req.params; 
      const usuarioActivo = await usuarios.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      res.json({ usuarioActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar el usuario" }); 
    }
  },
  putUsuariosDesactivar: async (req, res) => { 
    try {   
      const { id } = req.params;
      const usuarioInactivo = await usuarios.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      res.json({ usuarioInactivo });
    } catch (error) {   
      console.log(error);
      res.status(400).json({ error: "No se pudo desactivar el usuario" });
    }
  },
  putListar: async (req, res) => {
    const { id } = req.params;
    const { _id, estado, createAt, ...resto } = req.body;
    console.log(resto);
    const Usuario = await usuarios.findByIdAndUpdate(id, { $set: resto }, { new: true });
    res.json({ Usuario });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usuarios.findOne({ email });
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
  solicitarRecuperacion: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await usuarios.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
      const token = jwt.sign({ id: user._id }, process.env.CLAVE_SECRETA_CORREO, { expiresIn: '1h' });
      const link = `${process.env.FRONTEND_URL}resetPassword?token=${token}`;
      const payload = { link };
      console.log("antesde enviarlo "+payload.link);

      await sendEmail(email, 'Recuperación de contraseña', payload, './templates/emailReset.html');
      res.json({ msg: 'Correo de recuperación enviado' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al solicitar la recuperación de contraseña' });
    }
  },

  actualizarContraseña: async (req, res) => {
    const { token, nuevaContraseña } = req.body;
    try {
      const { id } = jwt.verify(token, process.env.CLAVE_SECRETA_CORREO);
      const salt = bcryptjs.genSaltSync(5);
      const contraseñaHasheada = bcryptjs.hashSync(nuevaContraseña, salt);
      const usuarioActualizado = await usuarios.findByIdAndUpdate(id, { password: contraseñaHasheada }, { new: true });
      if (!usuarioActualizado) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
      res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al actualizar la contraseña' });
    }
  },
};

export default httpUsuarios; 
