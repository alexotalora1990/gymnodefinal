import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
 
  descripcion:{type:String,required:true,},
  valor: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
  estado:{type:Number,default:1},
  dias: { type: Number,required:true, }
});

export default mongoose.model("Plan", planSchema);