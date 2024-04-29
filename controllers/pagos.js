import Pago from "../models/pagos.js";

const httpPago = {
  getPago: async (req, res) => {
    try {
      const pago = await Pago.find();
      res.json({ pago });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los pagos" });
    }
  },

  getPagoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const pago = await Pago.findById(id);
      if (!pago) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }
      res.json({ pago});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el pago" });
    }
  },

  getPagosActivos: async (req, res) => {
    try {
      const pagoActivo = await Pago.find({ estado: 1 });
      res.json({ pagoActivo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los pagos activos" });
    }
  },

  getPagosInactivos: async (req, res) => {
    try {
      const pagoInactivo = await Pago.find({ estado: 0 });
      res.json({ pagoInactivo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los pagos inactivos" });
    }
  },

  postcrearPago: async (req, res) => {
    try {
      const { _id, idcliente, idplan, valor, estado} = req.body;      
      const nuevoPago = new Pago( { _id, idcliente, idplan, valor, estado});
      await nuevoPago.save();
      res.status(201).json({ nuevoPago});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Pago no generado" });
    }
  },

  putactualizarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoActualizo = await Pago.findByIdAndUpdate(id, req.body, { new: true });
      if (!pagoActualizo) {
        return res.status(404).json({ message: "Pago no encontrada" });
      }
      res.json({ pagoActualizo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el pago" });
    }
  },

  putactivarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoActivo = await Pago.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      if (!pagoActivo) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }
      res.json({ Pago: pagoActivo });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar el pago" });
    }
  },

  putinactivarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const pagoInactivar= await Pago.findByIdAndUpdate(id, { estado:0 }, { new: true });
      if (!pagoInactivar) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }
      res.json({Pago: pagoInactivar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar el pago" });
    }
  }
};

export default httpPago;
