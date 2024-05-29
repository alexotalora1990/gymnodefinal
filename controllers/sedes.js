
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
      const sede = await Sede.findById(id);
      if (!sede) {
        return res.status(404).json({ message: "Sede no encontrada" });
      }
      res.json({ sede });
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
      res.status(201).json({ nuevaSede });
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

  putSedeActivar: async (req, res) => {
    try {
      const { id } = req.params;
      
      
      const sedeActivado = await Sede.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );

      res.json({ Sede: sedeActivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar la sede" });
    
  }
},

  putinactivarSede: async (req, res) => {
    
    try {
      const { id } = req.params;
      
      
      const sedeDesactivado = await Sede.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );

      res.json({ Sede: sedeDesactivado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al desactivar la sede" });
    
  }
},
};

export default httpSede;
