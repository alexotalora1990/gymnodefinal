import ingresos from "../models/ingresos.js";

const httpIngresos = {
  getIngresos: async (req, res) => {
    const Ingreso = await ingresos.find().populate('idsede').populate('idcliente')
    res.json({ Ingreso });
  },
 
  getIngresosID: async (req, res) => {
    const { id } = req.params;
    const Cliente = await Cliente.findById(id);
    console.log(Cliente); 
    res.json({ Cliente }); 
  },
 
  postIngresos: async (req, res) => {
    try {
      const { idcliente, idsede } = req.body;
      const Ingreso = new ingresos({ idcliente, idsede });
      await Ingreso.save();
      res.json({ Ingreso }); 
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear el registro" });
    }
  },
  
  putIngresos: async (req, res) => {
    try{
    const { id } = req.params;
    const { _id,  ...resto } = req.body;
    console.log(resto);

    const ingresoActualizado = await ingresos.findByIdAndUpdate(id,  resto, {
      new: true,
    });
    res.json({ Ingreso:ingresoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }  
},

  putListar: async (req, res) => {
    const { id } = req.params;
    const { _id, createAt, ...resto } = req.body;
    console.log(resto);

    const Ingreso = await ingresos.findByIdAndUpdate(id,  resto, {
      new: true,
    });
    res.json({ Ingreso });
  },
  
};

export default httpIngresos;