import Pago from "../models/pagos.js";
import Plan from "../models/planes.js"

const httpPago = {
  getPago: async (req, res) => {
    try {
      const pago = await Pago.find().populate('idcliente').populate('idplan');
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
      res.json({ pago });
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


  getTotalPagos: async (req, res) => {
    try {
      // Consultar la base de datos para obtener el total de pagos
      const totalPagos = await Pago.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$valor' } // Sumar el valor de todos los pagos
          }
        }
      ]);
      // Si no hay ningún pago registrado, devolver un total de 0
      const total = totalPagos.length > 0 ? totalPagos[0].total : 0;

      // Devolver el total de pagos en formato JSON
      res.json({ total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el total de pagos' });
    }
  },





  postcrearPago: async (req, res) => {
    try {
      const {
        idcliente,
        idplan,
        fechaVencimiento,
        valor,
        estado
      }
        = req.body;
      const plan = await Plan.findById(idplan);
      if (!plan) {
        return res.status(400).json({ error: "El plan especificado no existe." });
      }
      const nuevoPago = new Pago({
        idcliente,
        idplan,
        fechaVencimiento,
        valor: plan.valor,
        estado
      });
      await nuevoPago.save();
      res.status(201).json({ nuevoPago });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Pago no generado" });
    }
  },


  putactualizarPago: async (req, res) => {
    try {
      const { id } = req.params;
      const { idplan, ...resto } = req.body;

      // Buscar el pago existente
      let pagoActual = await Pago.findById(id);
      if (!pagoActual) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }

      // Si se actualiza el plan, buscar el nuevo plan y actualizar el valor
      if (idplan) {
        const nuevoPlan = await Plan.findById(idplan);
        if (!nuevoPlan) {
          return res.status(400).json({ error: "El nuevo plan especificado no existe." });
        }
        resto.valor = nuevoPlan.valor;  // Actualizar el valor del pago con el valor del nuevo plan
      }

      // Actualizar el pago con los nuevos datos
      pagoActual = await Pago.findByIdAndUpdate(id, { idplan, ...resto }, { new: true });
      res.json({ pagoActual });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el pago" });
    }
  },

  // putactualizarPago: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const pagoActualizo = await Pago.findByIdAndUpdate(id, req.body, { new: true });
  //     if (!pagoActualizo) {
  //       return res.status(404).json({ message: "Pago no encontrada" });
  //     }
  //     res.json({ pagoActualizo });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ error: "No se pudo actualizar el pago" });
  //   }
  // },

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
      const pagoInactivar = await Pago.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!pagoInactivar) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }
      res.json({ Pago: pagoInactivar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo inactivar el pago" });
    }
  }
};

export default httpPago;
