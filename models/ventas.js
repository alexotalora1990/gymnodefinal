import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  idcliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  idproducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  idsede: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sede",
    required: true,
  },
  valorUnidad: { type: Number, default: 1 },
  cantidad: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Venta", ventaSchema);
