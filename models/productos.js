import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  descripcion:{type:String,required:true},
  valor: { type: Number, default: 1 },
  cantidad: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Producto", productoSchema);