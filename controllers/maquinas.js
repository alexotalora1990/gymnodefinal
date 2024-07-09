import Maquina from "../models/maquinas.js";

const httpMaquina = {
  getMaquina: async (req, res) => {
    try {
      const maquina = await Maquina.find().populate('idSede');
      res.json({ maquina });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las maquinas" });
    }
  },

  getMaquinaPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const maquina = await Maquina.findById(id);
      if (!maquina) {
        return res.status(404).json({ message: "Maquina no encontrado" });
      }
      res.json({ maquina});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener la maquina" });
    }
  },

  getMaquinasActivas: async (req, res) => {
    try {
      const maquinasActivas = await Maquina.find({ estado: 1 });
      res.json({ maquinasActivas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las maquinas activos" });
    }
  },

  getMaquinasInactivas: async (req, res) => {
    try {
      const maquinasInactivas = await Maquina.find({ estado: 0 });
      res.json({ maquinasInactivas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las maquinas inactivos" });
    }
  },

  postcrearMaquina: async (req, res) => {
    try {
      const { _id, idSede,  descripcion, fechaUltimoMant,estado} = req.body;   
      const nuevaMaquina = new Maquina( {_id, idSede,  descripcion, fechaUltimoMant,estado});
      await nuevaMaquina.save();
      res.status(201).json({ nuevaMaquina});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear la maquina" });
    }
  },

  putactualizarMaquina: async (req, res) => {
    try {
      const { id } = req.params;
      const maquinaActualiza = await Maquina.findByIdAndUpdate(id, req.body, { new: true });
      if (!maquinaActualiza) {
        return res.status(404).json({ message: "Maquina no encontrada" });
      }
      res.json({ maquinaActualiza });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar la maquina" });
    }
  },

  putactivarMaquina: async (req, res) => {
    try {
      const { id } = req.params;

      const maquinaActiva = await Maquina.findByIdAndUpdate(
        id, 
        { estado: 1 }, 
        { new: true });
     
        
         res.json({ maquinaActiva });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar la maquina" });
    }
  },

  putinactivarMaquina: async (req, res) => {
    try {
      const { id } = req.params;
      const maquinaInactiva = await Maquina.findByIdAndUpdate(id, { estado:0 }, { new: true });
     
      res.json({ maquinaInactiva });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar la maquina" });
    }
  }
};

export default httpMaquina;
