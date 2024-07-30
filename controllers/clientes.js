import clientes from "../models/clientes.js";
import Plan from "../models/planes.js"

import nodemailer from "nodemailer";

const httpClientes = {
  getClientes1: async (req, res) => {
    const Cliente = await clientes.find();
    res.json({ Cliente });
  },

  getClientes: async (req, res) => {
    const { busqueda } = req.query;
    const Cliente = await clientes.find({
      $or: [
        { email: new RegExp(busqueda, "i") },
        { nombre: new RegExp(busqueda, "i") },
        { documento: new RegExp(busqueda, "i") },
        { direccion: new RegExp(busqueda, "i") },
        { telefono: new RegExp(busqueda, "i") },
      ],
    });
    console.log(Cliente);

    res.json({ Cliente });
  },

  getClientesID: async (req, res) => {
    const { id } = req.params;
    const Cliente = await clientes.findById(id);
    console.log(Cliente);
    res.json({ Cliente });
  },

  getClientesActivos: async (req, res) => {
    try { 
      
      const clientesActivos = await clientes.find({estado: 1}); 

      res.json({ clientesActivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los clientes inactivos" });
    }
  }, 

  getClientesInactivos: async (req, res) => {
    try { 
      
      const clientesInactivos = await clientes.find({estado: 0}); 

      res.json({ clientesInactivos }); 
    } catch (error) {  
      console.error(error);
      res.status(500).json({ error: "Error al buscar los clientes inactivos" });
    }
  },

  
  getClientesPorPlan: async (req, res) => {
    try {
      const { plan: nombrePlan } = req.params;
      
      
      const planExistente = await Plan.findOne({ descripcion: nombrePlan });
  
      
      if (!planExistente) {
        return res.status(404).json({ error: "El plan especificado no existe.", clientesPorPlan: [] });
      }
  
      
      const clientesPorPlan = await clientes.find({ idPlan: planExistente._id });
  
    
      return res.json({ clientesPorPlan });
      
    } catch (error) {
      console.error(error);
     
      return res.status(500).json({ error: "Error al buscar los clientes por plan" });
    }
  },
  




  getClientesPorMesCumpleanios: async (req, res) => {     
    try {
      const { mes } = req.params;

      
      const numeroMes = parseInt(mes);

      
      const clientesCumpleaniosMes = await clientes.find({
        $expr: { $eq: [{ $month: "$fechaNacimiento" }, numeroMes] }
      });

      res.json({ clientesCumpleaniosMes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar los clientes por mes de cumpleaños" });
    }
  },

  postClientes: async (req, res) => {
    try {
      const {
        nombre, 
        documento,
        direccion,
        telefono,
        email,
        idPlan,
        foto,
        objetivo,
        observaciones,
        fechaVencimiento,
        fechaNacimiento,
       
      } = req.body;
      const plan = await Plan.findById(idPlan);
      if(!plan){
        return res.status(400).json({ error: "El plan especificado no existe." });
      }
      const Cliente = new clientes({
        nombre,
        documento,
        direccion,
        telefono,
        email,
        idPlan, 
        foto,
        objetivo,
        observaciones,
        fechaVencimiento,
        fechaNacimiento,
        plan: plan.descripcion
      });
      await Cliente.save();
      res.json({ Cliente });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear el registro" });
    }
  },


postSeguimiento: async (req, res) => {

  const calcularIMC = (peso, estatura) => {
    const alturaMetros = estatura / 100; // Convertir estatura de cm a metros
    return peso / (alturaMetros * alturaMetros); // Calcular IMC según la fórmula
  
};
  
  const { id } = req.params;

  
  console.log("ID del cliente:", req.params.id);
  try {
      const { fecha, peso,  tBrazo, tPierna, tCintura, estatura } = req.body;

      const IMC = calcularIMC(peso, estatura)
     
      const seguimiento = {
          fecha,
          peso,
          IMC,
          tBrazo,
          tPierna,
          tCintura,
          estatura,
      };
      
      console.log(seguimiento);
      
      const clienteActualizado = await clientes.findByIdAndUpdate(
          id,
          { $addToSet: { seguimiento: seguimiento } }, 
          { new: true }
      );
console.log(clienteActualizado)
   
      if (!clienteActualizado) {
          return res.status(404).json({ error: "Cliente no encontrado" });
      }

     
      res.json({ seguimiento });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
  }
},

  putClientes: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, ...resto } = req.body;

      const clienteActualizado = await clientes.findByIdAndUpdate(id, { nombre, ...resto }, { new: true });

      res.json({ Cliente: clienteActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el cliente" });
    }
  },
  putClientesActivar: async (req, res) => {
    
      try {
        const { id } = req.params;
        
        
        const clienteActivado = await clientes.findByIdAndUpdate(
          id,
          { estado: 1 },
          { new: true }
        );
  
        res.json({ Cliente: clienteActivado });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar el cliente" });
      
    }
  },
  putClientesDesactivar: async (req, res) => {
    
    try {
      const { id } = req.params;
      
      
      const clienteDesactivado = await clientes.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      res.json({ Cliente: clienteDesactivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar el cliente" });
    
  }
},
  putListar: async (req, res) => {
    const { id } = req.params;
    const { _id, estado, createAt, ...resto } = req.body;
    console.log(resto);

    const Cliente = await clientes.findByIdAndUpdate(id, nombre, resto, {
      new: true,
    });
    res.json({ Cliente });
  },
  putSeguimiento: async (req, res) => {
    const { id } = req.params;
    const { _id, createAt, ...resto } = req.body;
    console.log(resto);

    const Cliente = await clientes.findByIdAndUpdate(id, createAt, resto, {
      new: true,
    });
    res.json({ Cliente });
  },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tu_correo@gmail.com",
    pass: "tu_contraseña",
  },
});

const enviarAlerta = async (ingreso) => {
  try {
    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: "destinatario@example.com",
      subject: "Alerta: Ingreso vencido",
      text: `El ingreso de ${ingreso.nombre} venció el ${ingreso.fechaVencimiento}.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico de alerta enviado con éxito.");
  } catch (error) {
    console.error("Error al enviar el correo electrónico de alerta:", error);
  }
};



export default httpClientes;

