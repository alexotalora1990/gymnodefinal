
import Sede from "../models/sedes.js";

const httpSede = {
  getSede: async (req, res) => {
    try {
      const sede = await Sede.find();
      res.json({ sede });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las sedes" });
    }
  },

  getSedePorId: async (req, res) => {
    try {
      const { id } = req.params;
      const sede= await Sede.findById(id);
      if (!sede) {
        return res.status(404).json({ message: "Sede no encontrada" });
      }
      res.json({ sede});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener la sede" });
    }
  },

  getSedesActivas: async (req, res) => {
    try {
      const sedeActiva = await Sede.find({ estado: 1 });
      res.json({ sedeActiva });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las sedes activas" });
    }
  },

  getSedesInactivas: async (req, res) => {
    try {
      const sedeInactiva = await Sede.find({ estado: 0 });
      res.json({ sedeInactiva });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las sedes inactivas" });
    }
  },

  postcrearSede: async (req, res) => {
    try {
      const nuevaSede = new Sede(req.body);
      await nuevaSede.save();
      res.status(201).json({ nuevaSede});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Sede no creada" });
    }
  },

  putactualizarSede: async (req, res) => {
    try {
      const { id } = req.params;
      const sedeActualiza = await Sede.findByIdAndUpdate(id, req.body, { new: true });
      if (!sedeActualiza) {
        return res.status(404).json({ message: "Sede no encontrada" });
      }
      res.json({ sedeActualiza });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar la sede" });
    }
  },

  putactivarSede: async (req, res) => {
    try {
      const { id } = req.params;
      const sedeActiva = await Sede.findByIdAndUpdate(id, { activo: true }, { new: true });
      if (!sedeActiva) {
        return res.status(404).json({ message: "Sede no encontrada" });
      }
      res.json({ sedeActiva });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar la sede" });
    }
  },

  putinactivarSede: async (req, res) => {
    try {
      const { id } = req.params;
      const sedeInactivar= await Sede.findByIdAndUpdate(id, { activo: false }, { new: true });
      if (!sedeInactivar) {
        return res.status(404).json({ message: "sede no encontrada" });
      }
      res.json({ sedeInactivar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar la sede" });
    }
  }
};

export default httpSede;