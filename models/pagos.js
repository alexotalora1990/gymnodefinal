import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  idcliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  idplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  valor: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
  estado:{type:Number,default:1},
});

export default mongoose.model("Pago", pagoSchema);