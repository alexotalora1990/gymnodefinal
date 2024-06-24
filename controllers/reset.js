import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendEmail from './sendEmail.js'; 
import Usuario from "../models/usuarios.js";

const httpReset = {
  envioEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json('El correo proporcionado no se encuentra registrado');
      }

      const token = jwt.sign(
        { id: usuario.email },
        process.env.CLAVE_SECRETA_CORREO,
        { expiresIn: '2h' }      
      );   
     
      // const link = `${process.env.FRONTEND_URL}/reset-password?reset=${token}`;


      const link =`http://localhost:5173/#/reset-password?reset=${token}`

      // const link = `https://gymapp-lgjb.onrender.com/#/reset-password?reset=${token}`;


      usuario.recuperacion = token;
      await usuario.save();

      const payload = { link };

      try {
        await sendEmail(usuario.email, "Solicitud de recuperación de contraseña", payload, 'templates/emailReset.html');
        return res.status(202).json({ msg: "Por favor consulte su correo electrónico" });
      } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al enviar el correo' });
      }
    } catch (error) {
      console.log('error 1', error);
      return res.status(500).json({ msg: 'Ha ocurrido un error en el servidor' });
    }
  },

  nuevaContrasena: async (req, res) => {
    const { nuevaContrasena } = req.body;
    const recuperacion = req.headers.reset;
    if (!recuperacion || !nuevaContrasena) {
      return res.status(404).json({ msg: "Campos requeridos o inválidos" });
    }
    try {
      const usuario = await Usuario.findOne({ recuperacion: recuperacion });
      if (!usuario) {
        return res.status(404).json({ msg: 'Token inválido' });
      }

      const jtoken = jwt.verify(recuperacion, process.env.CLAVE_SECRETA_CORREO);
      if (!jtoken) {
        return res.status(400).json({ msg: 'Token inválido' });
      }

      // Validar la nueva contraseña
      if (typeof nuevaContrasena !== 'string') {
        return res.status(400).json({ msg: 'La nueva contraseña no es válida' });
      }

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(nuevaContrasena, salt);
      usuario.password = hashedPassword;

      usuario.recuperacion = null;

      await usuario.save();

      return res.status(200).json({ msg: 'Contraseña actualizada con éxito' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: 'Token de restablecimiento expirado o inválido' });
    }
  }
};

export default httpReset; 
