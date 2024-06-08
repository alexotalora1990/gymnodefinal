import Plan from "../models/planes.js";

const httpPlan = {
  getPlan: async (req, res) => {
    try {
      const plan = await Plan.find();
      res.json({ plan });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los planes" });
    }
  },

  getPlanPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const plan = await Plan.findById(id);
      if (!plan) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.json({ plan});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el plan" });
    }
  },

  getPlanesActivos: async (req, res) => {
    try {
      const planActivo = await Plan.find({ estado: 1});
      res.json({ planActivo });
         } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los planes activos" });
    }
  },

  getPlanesInactivos: async (req, res) => {
    try {
      const planInactivo = await Plan.find({ estado: 0 });
      res.json({ planInactivo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los planes inactivos" });
    }
  },

  postcrearPlan: async (req, res) => {
    try {
      const { descripcion, valor, estado, dias} = req.body;
      const nuevoPlan = new Plan({ descripcion, valor, estado,dias});
      await nuevoPlan.save();
      res.status(201).json({ nuevoPlan});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Plan no creado" });
    }
  },

  putactualizarPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const planActualizo = await Plan.findByIdAndUpdate(id, req.body, { new: true });
      if (!planActualizo) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.json({ planActualizo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el plan" });
    }
  },

  putactivarPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const planActivo = await Plan.findByIdAndUpdate(id, { estado: 1}, { new: true });
      if (!planActivo) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.json({ planActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar el plan" });
    }
  },

  putinactivarPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const planInactivar= await Plan.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!planInactivar) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.json({ planInactivar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar el plan" });
    }
  }
};

export default httpPlan; 
