import Mantenimiento from "../models/mantenimiento.js";

const httpMantenimiento = {
  getMantenimientos: async (req, res) => {
    try {
      const mantenimientos = await Mantenimiento.find();
      res.json({ mantenimientos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los mantenimientos" });
    }
  },

  getMantenimientoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const mantenimiento = await Mantenimiento.findById(id);
      if (!mantenimiento) {
        return res.status(404).json({ message: "Mantenimiento no encontrado" });
      }
      res.json({ mantenimiento });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el mantenimiento" });
    }
  },

  
   postcrearMantenimiento: async (req, res) => {
    try {
      const { _id, idmaquina, responsable, descripcion, valor} = req.body;
      const nuevoMantenimiento = new Mantenimiento({ _id, idmaquina, responsable, descripcion, valor});
      await nuevoMantenimiento.save();
      res.status(201).json({ nuevoMantenimiento });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear el mantenimiento" });
    }
  },

  putactualizarMantenimiento: async (req, res) => {
    try {
      const { id } = req.params;
      const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(id, req.body, { new: true });
      if (!mantenimientoActualizado) {
        return res.status(404).json({ message: "Mantenimiento no encontrado" });
      }
      res.json({ mantenimientoActualizado });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el mantenimiento" });
    }
  },

 
};

export default httpMantenimiento;
