import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({

  nombre:{type:String,required:true},
  valor: { type: Number, default: 1 },
  cantidad: { type: Number, default: 0 },
  vencimiento:{type:Date, required: true},
  diasAlerta:{type:Number, required:true},
  createAt: { type: Date, default: Date.now },
  estado:{type:Number,default:1}
});

export default mongoose.model("Producto", productoSchema);