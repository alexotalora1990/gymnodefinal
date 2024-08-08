import mongoose from "mongoose";
const compraSchema=new mongoose.Schema({
    idproveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor",
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
})

export default mongoose.model("Compra",compraSchema)